import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
const CalendarIntegration = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
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
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(CalendarIcon, { className: "h-5 w-5" }), "Calendar Integration"] }), _jsx(CardDescription, { children: "Connect your calendar to import birthdays automatically" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Button, { variant: "outline", onClick: handleGoogleCalendarConnect, disabled: isConnecting, children: "Connect Google Calendar" }), _jsx(Button, { variant: "outline", onClick: handleAppleCalendarConnect, disabled: isConnecting, children: "Connect Apple Calendar" })] }), _jsx(Calendar, { mode: "single", selected: selectedDate, onSelect: setSelectedDate, className: "rounded-md border" })] })] }));
};
export default CalendarIntegration;
