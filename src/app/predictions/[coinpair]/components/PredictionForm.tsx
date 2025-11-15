import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePredictions } from "@/hooks/use-predictions";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

// Replace the uuid import with a native UUID generator function
function generateUUID(): string {
  // Use the browser's crypto API if available
  if (typeof window !== "undefined" && window.crypto) {
    return window.crypto.randomUUID();
  }

  // Fallback for older browsers or environments without crypto
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface PredictionFormProps {
  symbol: string;
  currentPrice: number;
  targetDate: string;
  onSuccess?: (isEditing?: boolean) => void;
  isEditing?: boolean; // Flag to indicate edit mode
  predictionId?: string; // ID of the prediction being edited
}

export function PredictionForm({
  symbol,
  currentPrice,
  targetDate,
  onSuccess,
  isEditing = false,
  predictionId,
}: PredictionFormProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditing); // Start loading if in edit mode
  const [error, setError] = useState<string | null>(null);
  const { addPrediction } = usePredictions();
  const [formData, setFormData] = useState({
    targetPrice: currentPrice,
    confidence: 50,
    highPrice: currentPrice * 1.05, // Default 5% higher
    lowPrice: currentPrice * 0.95, // Default 5% lower
  });
  const [originalFormData, setOriginalFormData] = useState<
    typeof formData | null
  >(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [valuesUnchanged, setValuesUnchanged] = useState(false);

  // Fetch existing prediction data if in edit mode
  useEffect(() => {
    const fetchExistingPrediction = async () => {
      if (!isEditing || !session?.user?.email) return;

      try {
        setIsLoading(true);

        // Fetch the user's prediction for this symbol
        const encodedEmail = encodeURIComponent(session.user.email);
        const response = await fetch(
          `/api/user-predictions/${symbol}/${encodedEmail}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch prediction");
        }

        // Find the next round prediction (or current if that's what we're editing)
        const predictionToEdit =
          data.next_predictions?.[0] || data.current_predictions?.[0];

        if (predictionToEdit) {
          // Initialize form with existing prediction data
          const initialData = {
            targetPrice: predictionToEdit.close || currentPrice,
            confidence: Math.round((predictionToEdit.confidence || 0.5) * 100), // Convert from 0-1 to percentage
            highPrice: predictionToEdit.high || currentPrice * 1.05,
            lowPrice: predictionToEdit.low || currentPrice * 0.95,
          };

          setFormData(initialData);
          setOriginalFormData(initialData);
        }
      } catch (err) {
        console.error("Error fetching existing prediction:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load existing prediction"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingPrediction();
  }, [isEditing, session?.user?.email, symbol, currentPrice]);

  // Check if values are unchanged when form data changes
  useEffect(() => {
    if (originalFormData && isEditing) {
      // Compare current values with original values
      const unchanged =
        Math.abs(formData.targetPrice - originalFormData.targetPrice) < 0.001 &&
        formData.confidence === originalFormData.confidence &&
        Math.abs(formData.highPrice - originalFormData.highPrice) < 0.001 &&
        Math.abs(formData.lowPrice - originalFormData.lowPrice) < 0.001;

      setValuesUnchanged(unchanged);
    } else {
      setValuesUnchanged(false);
    }
  }, [formData, originalFormData, isEditing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      // If updating targetPrice, also update high/low with same relative distance
      if (name === "targetPrice") {
        const newTargetPrice = parseFloat(value);
        const targetDiff = newTargetPrice - prev.targetPrice;

        // Round to 4 decimal places
        const roundTo4Decimals = (num: number) =>
          Math.round(num * 10000) / 10000;

        return {
          ...prev,
          [name]: roundTo4Decimals(newTargetPrice),
          highPrice: roundTo4Decimals(prev.highPrice + targetDiff),
          lowPrice: roundTo4Decimals(prev.lowPrice + targetDiff),
        };
      }

      // Round price values to 4 decimal places
      if (name === "highPrice" || name === "lowPrice") {
        const roundTo4Decimals = (num: number) =>
          Math.round(num * 10000) / 10000;
        return {
          ...prev,
          [name]: roundTo4Decimals(parseFloat(value)),
        };
      }

      return {
        ...prev,
        [name]: name === "confidence" ? parseInt(value) : parseFloat(value),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is logged in
    if (status !== "authenticated") {
      // Save the current URL to redirect back after login
      signIn(undefined, { callbackUrl: window.location.href });
      return;
    }

    // Show confirmation dialog instead of submitting immediately
    setShowConfirmation(true);
  };

  const confirmSubmission = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Get user email from session
      const userEmail = session?.user?.email;

      if (!userEmail) {
        throw new Error("User email not available");
      }

      // Format data for API
      const predictionData = {
        high: formData.highPrice,
        low: formData.lowPrice,
        close: formData.targetPrice,
        confidence: formData.confidence / 100, // Convert to 0-1 range
        timestamp: Date.now(),
        round: "next", // Ensure next round predictions are captured properly
        isUpdate: isEditing, // Indicate whether this is an update to an existing prediction
      };

      // Use the proxy route to avoid CORS issues
      const response = await fetch(
        `/api/proxy/submit-user-prediction/${symbol}/${encodeURIComponent(
          userEmail
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(predictionData),
        }
      );

      // Log the response for debugging
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to submit prediction");
      }

      // Call the success handler which now uses MongoDB to check status
      if (onSuccess) onSuccess(isEditing);

      // Update the local state - this is just for UI purposes
      addPrediction({
        id: Date.now().toString(),
        walletAddress: userEmail,
        walletType: "email",
        pair: symbol,
        predictedPrice: formData.targetPrice,
        predictedAt: new Date().toISOString(),
        targetDate: targetDate,
        currentPrice: currentPrice,
        accuracy: 0,
      });

      // Refresh the page data
      router.refresh();
    } catch (error) {
      console.error("Error submitting prediction:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An unknown error occurred. Please try again."
      );
      setShowConfirmation(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelSubmission = () => {
    setShowConfirmation(false);
  };

  // Render a login prompt if not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="bg-[rgba(11,17,43,0.8)] backdrop-blur-xl rounded-2xl p-6 border border-indigo-500/30 shadow-lg">
        <h3 className="text-xl font-semibold text-content-primary mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Submit Your Prediction
        </h3>
        <div className="text-center p-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[rgba(59,130,246,0.1)] flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <p className="text-content-secondary mb-6">
            You need to be signed in to submit predictions
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() =>
                signIn(undefined, { callbackUrl: window.location.href })
              }
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-blue-500/20 shadow-lg hover:shadow-blue-500/40 hover:translate-y-[-1px] transition-all duration-200"
            >
              Sign In
            </button>
            <Link
              href="/register"
              className="px-6 py-2.5 border border-indigo-500/50 text-indigo-400 font-medium rounded-lg hover:bg-indigo-500/10 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while fetching existing prediction
  if (isLoading) {
    return (
      <div className="bg-[rgba(11,17,43,0.8)] backdrop-blur-xl rounded-2xl p-6 border border-indigo-500/30 shadow-lg h-full overflow-hidden relative">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[rgba(11,17,43,0.8)] backdrop-blur-xl rounded-2xl p-6 border border-indigo-500/30 shadow-lg h-full overflow-hidden relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20 z-0">
          <div className="absolute w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -top-10 -right-10"></div>
          <div className="absolute w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -bottom-10 -left-10"></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-content-primary mb-5 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            {isEditing ? "Edit Your Prediction" : "Submit Your Prediction"}
          </h3>

          {error && (
            <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg backdrop-blur-sm">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-5">
              <div className="group">
                <label
                  htmlFor="targetPrice"
                  className="block text-sm font-medium text-content-secondary mb-2 group-focus-within:text-blue-400 transition-colors"
                >
                  Target Close Price (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-content-tertiary">$</span>
                  </div>
                  <input
                    type="number"
                    step="0.0001"
                    min="0"
                    id="targetPrice"
                    name="targetPrice"
                    value={formData.targetPrice}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-3 bg-[rgba(30,41,59,0.5)] border border-content-quaternary rounded-lg text-content-primary focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    required
                  />
                </div>
                <p className="mt-1.5 text-xs text-blue-400 font-medium">
                  Current price: ${currentPrice.toLocaleString()}
                </p>
              </div>

              <div className="group">
                <label
                  htmlFor="highPrice"
                  className="block text-sm font-medium text-content-secondary mb-2 group-focus-within:text-blue-400 transition-colors"
                >
                  High Price (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-content-tertiary">$</span>
                  </div>
                  <input
                    type="number"
                    step="0.0001"
                    min="0"
                    id="highPrice"
                    name="highPrice"
                    value={formData.highPrice}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-3 bg-[rgba(30,41,59,0.5)] border border-content-quaternary rounded-lg text-content-primary focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    required
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <span className="text-green-400 text-sm">↑</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="lowPrice"
                  className="block text-sm font-medium text-content-secondary mb-2 group-focus-within:text-blue-400 transition-colors"
                >
                  Low Price (USD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-content-tertiary">$</span>
                  </div>
                  <input
                    type="number"
                    step="0.0001"
                    min="0"
                    id="lowPrice"
                    name="lowPrice"
                    value={formData.lowPrice}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-3 bg-[rgba(30,41,59,0.5)] border border-content-quaternary rounded-lg text-content-primary focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    required
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <span className="text-red-400 text-sm">↓</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <label
                  htmlFor="confidence"
                  className="block text-sm font-medium text-content-secondary mb-2"
                >
                  Confidence Level:{" "}
                  <span className="text-blue-400">{formData.confidence}%</span>
                </label>
                <div className="px-1">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    id="confidence"
                    name="confidence"
                    value={formData.confidence}
                    onChange={handleChange}
                    className="w-full h-2 bg-[rgba(30,41,59,0.8)] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-moz-range-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0"
                    required
                  />
                  <div className="flex justify-between text-xs text-content-tertiary mt-1.5">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                {valuesUnchanged && isEditing ? (
                  <div className="w-full py-3.5 bg-gray-600 text-white font-medium rounded-lg flex justify-center items-center opacity-70 cursor-not-allowed">
                    Prediction values are unchanged
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || (isEditing && valuesUnchanged)}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-70 flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      `${isEditing ? "Update" : "Submit"} Prediction`
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Dialog Overlay */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-[rgba(15,23,42,0.95)] border border-indigo-500/30 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">
              Please confirm Your Prediction!
            </h3>

            <div className="space-y-4 mb-6">
              <div className="bg-[rgba(30,41,59,0.5)] p-4 rounded-lg">
                <p className="text-sm text-content-tertiary mb-1">
                  Target Close Price
                </p>
                <p className="text-lg font-semibold text-white">
                  ${formData.targetPrice.toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[rgba(30,41,59,0.5)] p-4 rounded-lg">
                  <p className="text-sm text-content-tertiary mb-1">
                    High Price
                  </p>
                  <p className="text-lg font-semibold text-green-400">
                    ${formData.highPrice.toLocaleString()}
                  </p>
                </div>

                <div className="bg-[rgba(30,41,59,0.5)] p-4 rounded-lg">
                  <p className="text-sm text-content-tertiary mb-1">
                    Low Price
                  </p>
                  <p className="text-lg font-semibold text-red-400">
                    ${formData.lowPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="bg-[rgba(30,41,59,0.5)] p-4 rounded-lg">
                <p className="text-sm text-content-tertiary mb-1">
                  Confidence Level
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${formData.confidence}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm mt-1 text-blue-400">
                  {formData.confidence}%
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={cancelSubmission}
                className="flex-1 py-3 border border-content-quaternary text-content-secondary rounded-lg hover:bg-[rgba(30,41,59,0.5)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmission}
                disabled={isSubmitting}
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-70 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
