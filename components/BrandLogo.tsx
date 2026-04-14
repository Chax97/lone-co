interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  light?: boolean;
  className?: string;
}

const sizes = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl sm:text-3xl",
  xl: "text-3xl sm:text-4xl lg:text-5xl",
  hero: "text-[4rem] sm:text-[6rem] lg:text-[9rem] xl:text-[11rem]",
};

export default function BrandLogo({ size = "md", light = false, className = "" }: BrandLogoProps) {
  const textColor = light ? "text-white" : "text-navy";

  return (
    <span className={`brand-logo ${sizes[size]} ${textColor} ${className}`}>
      L O N E{" "}
      <span className="brand-ampersand">&amp;</span>
      {" "}C O
      <span className="brand-dot" />
    </span>
  );
}
