import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

/**
 * Shared inner page wrapper.
 * - Offsets the fixed navbar (72px)
 * - Centres content with max-w-7xl and consistent horizontal padding
 */
export default function PageWrapper({ children, className = "" }: Props) {
  return (
    <div className={`pt-[72px] max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 ${className}`}>
      {children}
    </div>
  );
}
