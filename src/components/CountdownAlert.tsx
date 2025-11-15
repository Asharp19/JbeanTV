import { useState, useEffect } from "react";
import { format as formatDate } from "date-fns";
interface CountdownAlertProps {
  className?: string;
  showLocalTime?: boolean;
}

export function CountdownAlert({
  className = "",
  showLocalTime = false,
}: CountdownAlertProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();

      // Set the target to the next UTC midnight
      const tomorrow = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 1,
          0,
          0,
          0
        )
      );

      // Calculate the difference in milliseconds
      const diff = tomorrow.getTime() - now.getTime();

      // Convert to hours, minutes, seconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    // Calculate immediately and then set interval
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    // Clear interval on cleanup
    return () => clearInterval(timer);
  }, []);

  // Format numbers to always show two digits
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div
      className={`bg-gradient-to-r w-full from-white-500 to-white-700/20 backdrop-blur-sm border border-white-500/30 rounded-lg px-4 py-3 shadow-lg text-center ${className}`}
    >
      {!showLocalTime ? (
        <div className="flex items-center w-full h-[4rem] justify-center gap-1.5">
          <div className="flex items-center">
            <div className="bg-background-primary/50 rounded px-2 py-1 border border-cyan-500/40">
              <span className="font-mono font-semibold text-white">
                {formatNumber(timeLeft.hours)}{" "}
              </span>
            </div>
            <span className="mx-1 text-cyan-300">:</span>
            <div className="bg-background-primary/50 rounded px-2 py-1 border border-cyan-500/40">
              <span className="font-mono font-semibold text-white">
                {formatNumber(timeLeft.minutes)}
              </span>
            </div>
            <span className="mx-1 text-cyan-300">:</span>
            <div className="bg-background-primary/50 rounded px-2 py-1 border border-cyan-500/40">
              <span className="font-mono font-semibold text-white">
                {formatNumber(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center h-[4rem] w-full justify-center gap-1.5 text-[76%]">
          {formatDate(
            new Date(new Date().setDate(new Date().getDate() + 1)).setUTCHours(
              0,
              0,
              0,
              0
            ),
            "MMM d, hh:mm a"
          )}
        </div>
      )}
    </div>
  );
}
