import { readable } from 'svelte/store'

export function timer(options = {}) {
  return readable(null, (set) => {
    const update = () => set(new Date())
    update()
    const interval = setInterval(update, options.interval || 1000)
    return () => clearInterval(interval)
  })
}
