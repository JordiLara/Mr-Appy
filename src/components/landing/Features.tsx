import { Smile, BarChart2, Trophy } from "lucide-react";

interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Smile,
    title: "Control sencillo del estado anímico:",
    description:
      "Monitoriza tu estado de ánimo diario fácilmente con iconos intuitivos y entradas rápidas.",
  },
  {
    icon: BarChart2,
    title: "Powerful Analytics",
    description:
      "Give managers the tools and insights they need to support their teams effectively.",
  },
  {
    icon: Trophy,
    title: "Team Management",
    description:
      "Encourage participation through achievements, badges, and team milestones.",
  },
];

const Features: React.FC = (): JSX.Element => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything you need to track team wellness
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Simple tools to help you understand and improve team morale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
