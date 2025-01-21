interface PremiumFeaturesProps {
  isPremium: boolean;
}

const PremiumFeatures = ({ isPremium }: PremiumFeaturesProps) => {
  if (isPremium) return null;

  return (
    <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10">
      <p className="text-sm text-yellow-600 dark:text-yellow-400">
        Upgrade to Premium for advanced features:
        <ul className="list-disc list-inside mt-2">
          <li>Auto-suggested cards and gifts</li>
          <li>Week-in-advance birthday reminders</li>
          <li>Multiple delivery methods</li>
          <li>Aura-based theme generation</li>
        </ul>
      </p>
    </div>
  );
};

export default PremiumFeatures;
