import { useId } from 'react'

export function Switch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (v: boolean) => void }) {
  const id = useId()
  return (
    <button
      aria-pressed={checked}
      aria-labelledby={id}
      onClick={() => onCheckedChange(!checked)}
      className={
        'h-6 w-10 rounded-full transition-colors ' +
        (checked ? 'bg-amber-500' : 'bg-white/20')
      }
    >
      <span
        id={id}
        className={
          'block h-5 w-5 rounded-full bg-white transform transition-transform translate-y-0.5 ' +
          (checked ? 'translate-x-5' : 'translate-x-0.5')
        }
      />
    </button>
  )
}



