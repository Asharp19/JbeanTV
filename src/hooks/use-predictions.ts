import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import type { Prediction } from "@/types/predictions";

const COOKIE_KEY = "userPredictions";

export function usePredictions() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  // Load predictions from cookies on mount
  useEffect(() => {
    const storedPredictions = Cookies.get(COOKIE_KEY);
    if (storedPredictions) {
      setPredictions(JSON.parse(storedPredictions));
    }
  }, []);

  // Add a new prediction
  const addPrediction = (prediction: Prediction) => {
    const storedPredictions = Cookies.get(COOKIE_KEY);
    const userPredictions = storedPredictions
      ? JSON.parse(storedPredictions)
      : [];

    // Add new prediction to the beginning of user predictions
    const newUserPredictions = [prediction, ...userPredictions];

    // Update cookies with user predictions
    Cookies.set(COOKIE_KEY, JSON.stringify(newUserPredictions));

    // Update state with user predictions
    setPredictions(newUserPredictions);
  };

  return {
    predictions,
    addPrediction,
  };
}
