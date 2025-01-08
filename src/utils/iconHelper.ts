import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

export function getLucideIcon(iconName: keyof typeof LucideIcons) {
  const Icon = LucideIcons[iconName];
  if (!Icon) {
    console.warn(`Icon "${iconName}" not found in Lucide icons`);
    return LucideIcons.HelpCircle;
  }
  return Icon as React.FC<LucideProps>;
}
