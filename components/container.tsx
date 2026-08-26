import { ReactNode } from 'react';

type ContainerSize = 'prose' | 'default' | 'wide';

interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
}

const sizeMap: Record<ContainerSize, string> = {
  prose: 'max-w-[var(--container-prose)]',
  default: 'max-w-[var(--container-default)]',
  wide: 'max-w-[var(--container-wide)]',
};

export function Container({ children, size = 'default', className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${sizeMap[size]} ${className}`}>
      {children}
    </div>
  );
}
