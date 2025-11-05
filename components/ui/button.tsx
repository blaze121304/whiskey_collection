import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'default', size = 'md', ...props },
  ref,
) {
  const base = 'inline-flex items-center justify-center rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    default: 'bg-amber-600 text-white hover:bg-amber-500 dark:bg-amber-600 dark:hover:bg-amber-500',
    ghost: 'bg-transparent hover:bg-white/5 dark:hover:bg-white/5 hover:bg-amber-100 border border-white/10 dark:border-white/10 border-amber-900/20 text-foreground dark:text-foreground',
    outline: 'bg-transparent border border-amber-600/50 dark:border-amber-600/50 text-amber-600 dark:text-amber-300 hover:bg-amber-600/10 dark:hover:bg-amber-600/10',
  } as const
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  } as const
  return (
    <button ref={ref} className={twMerge(base, variants[variant], sizes[size], className)} {...props} />
  )
})



