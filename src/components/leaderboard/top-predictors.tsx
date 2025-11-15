interface TopPredictorsProps {
  limit?: number;
}

export function TopPredictors({ limit = 5 }: TopPredictorsProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: limit }).map((_, i) => (
        <div
          key={i}
          className="p-4 border rounded-lg flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <span className="font-bold">{i + 1}</span>
            <span>User {i + 1}</span>
          </div>
          <span className="text-gray-600">Success Rate: {85 - i * 5}%</span>
        </div>
      ))}
    </div>
  );
}
