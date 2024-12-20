import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProgressItem {
  id: string;
  label: string;
  status: "completed" | "in-progress" | "pending";
}

interface ProgressTrackerProps {
  items: ProgressItem[];
}

const ProgressTracker = ({ items }: ProgressTrackerProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Development Progress</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors"
            onClick={() => console.log(`Clicked: ${item.label}`)}
            role="button"
            tabIndex={0}
          >
            <CheckCircle2 
              className={cn(
                "h-4 w-4",
                item.status === "completed" ? "text-green-500" :
                item.status === "in-progress" ? "text-yellow-500" :
                "text-gray-300"
              )}
            />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProgressTracker;