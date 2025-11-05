import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={twMerge(
        'w-full rounded-xl bg-white/5 dark:bg-white/5 bg-amber-50/50 dark:border-white/10 border-amber-900/20 px-3 py-2 min-h-[100px] text-sm text-amber-900 dark:text-foreground placeholder:text-amber-900/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors duration-200',
        className,
      )}
      {...props}
    />
  )}
)



