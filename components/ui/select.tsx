import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ className, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={twMerge(
        'w-full rounded-xl bg-white/5 dark:bg-white/5 bg-amber-50/50 dark:border-white/10 border-amber-900/20 px-3 h-10 text-sm text-amber-900 dark:text-foreground focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors duration-200',
        className,
      )}
      {...props}
    />
  )
})


