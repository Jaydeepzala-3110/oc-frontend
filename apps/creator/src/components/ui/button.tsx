import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-3.5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/85 active:translate-y-px',
        secondary:
          'bg-secondary text-secondary-foreground border border-border hover:border-primary/40 hover:text-primary',
        outline:
          'border border-border bg-transparent hover:border-primary/50 hover:text-primary',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive:
          'bg-destructive/15 text-destructive border border-destructive/30 hover:bg-destructive hover:text-destructive-foreground',
        success:
          'bg-success/15 text-success border border-success/30 hover:bg-success hover:text-success-foreground',
      },
      size: {
        default: 'h-9 px-4',
        sm: 'h-7 px-3 text-[10px]',
        lg: 'h-11 px-6',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

export { Button, buttonVariants };
