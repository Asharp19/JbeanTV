import { useState, useEffect } from "react";
import { Session } from "next-auth";

export function useUserPrediction(
  selectedPair: string,
  status: string,
  session: Session | null
) {
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);

  useEffect(() => {
    const checkUserPrediction = async () => {
      // Skip if user isn't authenticated
      if (status !== "authenticated" || !session?.user?.email) {
        setPredictionSubmitted(false);
        return;
      }

      try {
        // Fetch submission status from the API
        const userId = encodeURIComponent(session.user.email);
        const response = await fetch(
          `/api/user-predictions/${selectedPair}/${userId}?checkSubmission=true`
        );

        if (!response.ok) {
          throw new Error("Failed to check prediction status");
        }

        const data = await response.json();
        setPredictionSubmitted(data.hasSubmitted);
      } catch (error) {
        console.error("Error checking user prediction:", error);
        setPredictionSubmitted(false);
      }
    };

    checkUserPrediction();
  }, [selectedPair, status, session?.user?.email]);

  return { predictionSubmitted, setPredictionSubmitted };
}

