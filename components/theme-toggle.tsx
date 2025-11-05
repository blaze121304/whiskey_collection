"use client"
import { useTheme } from '@/components/theme-provider'
import { Switch } from '@/components/ui/switch'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-foreground dark:text-white/60 text-amber-900/60">Light</span>
      <Switch checked={isDark} onCheckedChange={(v) => setTheme(v ? 'dark' : 'light')} />
      <span className="text-xs text-foreground dark:text-white/60 text-amber-900/60">Dark</span>
    </div>
  )
}



