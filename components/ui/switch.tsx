import { useId } from 'react'

export function Switch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (v: boolean) => void }) {
  const id = useId()
  return (
    <button
      aria-pressed={checked}
      aria-labelledby={id}
      onClick={() => onCheckedChange(!checked)}
      className={
        'relative h-6 w-11 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ' +
        (checked ? 'bg-amber-500 dark:bg-amber-600' : 'bg-gray-300 dark:bg-gray-600')
      }
    >
      <span
        id={id}
        className={
          'absolute top-0.5 left-0.5 block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ' +
          (checked ? 'translate-x-5' : 'translate-x-0')
        }
      />
    </button>
  )
}



