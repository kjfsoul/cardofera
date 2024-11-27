import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";

const CalendarIntegration = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isConnecting, setIsConnecting] = useState(false);

  const handleGoogleCalendarConnect = async () => {
    setIsConnecting(true);
    // Mock integration - would normally handle OAuth flow
    setTimeout(() => {
      toast.success("Successfully connected to Google Calendar!");
      setIsConnecting(false);
    }, 1000);
  };

  const handleAppleCalendarConnect = async () => {
    setIsConnecting(true);
    // Mock integration - would normally handle OAuth flow
    setTimeout(() => {
      toast.success("Successfully connected to Apple Calendar!");
      setIsConnecting(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Calendar Integration
        </CardTitle>
        <CardDescription>
          Connect your calendar to import birthdays automatically
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={handleGoogleCalendarConnect}
            disabled={isConnecting}
          >
            Connect Google Calendar
          </Button>
          <Button
            variant="outline"
            onClick={handleAppleCalendarConnect}
            disabled={isConnecting}
          >
            Connect Apple Calendar
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
};

export default CalendarIntegration;