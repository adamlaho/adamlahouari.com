import { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-[#2550E6] transition-colors',
  secondary: 'bg-bg-elev text-fg border border-border hover:bg-border/30 transition-colors',
  ghost: 'text-fg hover:bg-border/30 transition-colors',
  link: 'text-accent hover:text-[#2550E6] underline-offset-4 hover:underline transition-colors',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center gap-2 rounded-[var(--radius-md)]
        font-medium transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </button>
  );
}
