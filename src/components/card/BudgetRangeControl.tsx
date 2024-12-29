import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface BudgetRangeControlProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const BudgetRangeControl = ({ value, onChange }: BudgetRangeControlProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(localValue);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [localValue, onChange]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Budget Range</Label>
        <motion.span 
          key={`${localValue[0]}-${localValue[1]}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium"
        >
          ${localValue[0]} - ${localValue[1]}
        </motion.span>
      </div>
      <div className="flex items-center gap-4">
        <DollarSign className="h-4 w-4 text-muted-foreground" />
        <Slider
          value={localValue}
          min={0}
          max={500}
          step={10}
          onValueChange={(value) => setLocalValue(value as [number, number])}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default BudgetRangeControl;