import { ReactNode, ButtonHTMLAttributes } from 'react';

interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

const baseClasses = `
  inline-flex items-center px-3 py-1.5 rounded-[var(--radius-full)]
  text-sm font-medium transition-all
`;

export function Tag({ active = false, children, className = '', ...props }: TagProps) {
  const styles = `
    ${baseClasses}
    ${active ? 'bg-accent text-white' : 'bg-bg-elev text-fg border border-border'}
    ${props.onClick ? 'hover:bg-border/30 cursor-pointer' : ''}
    ${className}
  `;

  // Without a click handler this is a label, not a control — rendering a
  // <button> would put a dead stop in the keyboard tab order.
  if (!props.onClick) {
    const { type, disabled, ...rest } = props;
    return (
      <span className={styles} {...rest}>
        {children}
      </span>
    );
  }

  return (
    <button type="button" className={styles} {...props}>
      {children}
    </button>
  );
}
