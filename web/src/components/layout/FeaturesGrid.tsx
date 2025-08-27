import FeatureCard from './FeatureCard';
import { Feature } from '@/types';

interface FeaturesGridProps {
  features: Feature[];
}

export default function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8 mt-16">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}
