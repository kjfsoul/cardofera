import { motion } from "framer-motion";
import NavigationButtons from "@/components/NavigationButtons";

interface DashboardHeaderProps {
  userName: string;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DashboardHeader = ({ userName, activeSection, onSectionChange }: DashboardHeaderProps) => {
  return (
    <header className="text-center space-y-4">
      <h1 className="text-4xl font-semibold tracking-tight">
        Welcome, {userName}
      </h1>
      <p className="text-lg text-foreground/60">Create something special today</p>
      <NavigationButtons 
        activeSection={activeSection} 
        onSectionChange={onSectionChange} 
      />
    </header>
  );
};

export default DashboardHeader;