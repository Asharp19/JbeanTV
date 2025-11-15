export function PredictionStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 border rounded-lg">
        <h3 className="text-sm text-gray-600">Total Predictions</h3>
        <p className="text-2xl font-bold">1,234</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="text-sm text-gray-600">Active Predictions</h3>
        <p className="text-2xl font-bold">567</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="text-sm text-gray-600">Accuracy Rate</h3>
        <p className="text-2xl font-bold">76%</p>
      </div>
    </div>
  );
}
