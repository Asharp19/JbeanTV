import { format } from "date-fns";

interface SubmissionSuccessProps {
  onEdit: () => void;
}

export function SubmissionSuccess({ onEdit }: SubmissionSuccessProps) {
  return (
    <div className="bg-background-secondary/40 backdrop-blur-xl rounded-2xl p-6 border border-content-quaternary h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onEdit}
            className="px-4 py-1.5 bg-background-tertiary hover:bg-background-tertiary/80 text-content-primary font-medium rounded-lg transition-colors text-sm flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit Prediction
          </button>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-success-bg rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-success-foreground"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-content-primary mb-2">
            Prediction Submitted!
          </h3>
          <p className="text-content-secondary mb-6">
            Your prediction has been recorded. You can edit it using the button
            above, or check back later to see how accurate it was.
          </p>
          <p className="text-sm text-content-tertiary">
            Results available after{" "}
            <span className="font-medium text-content-primary">
              {format(
                new Date(
                  new Date().setDate(new Date().getUTCDate() + 2)
                ).setHours(0, 5, 0, 0),
                "MMM d, hh:mm a"
              )}{" "}
              UTC
            </span>
            <span className=" text-content-tertiary">
              {" "}
              in your local time{" "}
              <span className="font-bold text-content-primary">
                {format(
                  new Date(
                    new Date().setDate(new Date().getDate() + 2)
                  ).setUTCHours(0, 5, 0, 0),
                  "MMM d, hh:mm a"
                )}
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

