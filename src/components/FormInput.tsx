import { LucideIcon } from "lucide-react";

type FormInputProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (name: string, value: string) => void;
  icon?: LucideIcon;
};

export default function FormInput({
  name,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
}: FormInputProps) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300/70" />
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required
        className={`w-full px-3 py-3 border border-white/20 rounded-lg bg-white/10 
          text-white placeholder-blue-200/70 
          focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent
          ${Icon ? "pl-10" : ""}
          text-base transition-all duration-200
          hover:border-white/30`}
      />
    </div>
  );
}
