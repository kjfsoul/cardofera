import { Progress } from "@/components/ui/progress";

interface CardHeaderProps {
  progress: number;
}

const CardHeader = ({ progress }: CardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-center mb-4">Create Your Perfect Card</h1>
      <p className="text-center text-muted-foreground mb-6">
        Design a beautiful card in minutes with our AI-powered tools
      </p>
      <div className="w-full max-w-md mx-auto mb-8">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-center mt-2 text-muted-foreground">
          {progress === 100 ? "Ready to generate!" : "Complete all steps to create your card"}
        </p>
      </div>
    </div>
  );
};

export default CardHeader;