import { Card } from "../ui/Card";
import type { ImportStats } from "../../types";
export interface SyncStatsProps {
  stats: ImportStats;
}

export const SyncStats: React.FC<SyncStatsProps> = ({ stats }) => {
  const statItems = [
    {
      label: "New",
      value: stats.new,
      color: "text-green-600 bg-green-100",
    },
    {
      label: "Updated",
      value: stats.updated,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Removed",
      value: stats.removed,
      color: "text-red-600 bg-red-100",
    },
    { label: "Total", value: stats.new + stats.updated },
  ];

  return (
    <Card style={{ padding: 24 }}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Sync Statistics
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <div key={index} className="text-center">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${item.color} mb-2`}
            >
              <span className="text-lg font-bold">{item.value}</span>
            </div>
            <p className="text-sm font-medium text-gray-900">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last sync completed</span>
          <span className="text-gray-900">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </Card>
  );
};
