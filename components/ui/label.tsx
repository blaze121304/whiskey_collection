export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={"text-sm text-foreground dark:text-white/80 text-amber-900/80 " + (className ?? '')} {...props} />
}



