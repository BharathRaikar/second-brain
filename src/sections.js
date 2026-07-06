// Central definition of every section in the dashboard.
// To add a new section later: add an entry here — nothing else needs to change,
// the nav, board, and forms all read from this list.
export const SECTIONS = [
  { key: 'work', label: 'Work', icon: 'ti-briefcase', color: 'c-blue',
    subtitle: 'SIMPEL pipelines, Tiger Analytics' },
  { key: 'projects', label: 'Projects', icon: 'ti-bulb', color: 'c-amber',
    subtitle: 'AlgoZone, content, side income' },
  { key: 'personal', label: 'Personal', icon: 'ti-heart', color: 'c-coral',
    subtitle: 'Fitness, health, home' },
  { key: 'travel', label: 'Travel', icon: 'ti-plane', color: 'c-teal',
    subtitle: 'Trips and itineraries' },
  { key: 'reflection', label: 'Reflection', icon: 'ti-moon', color: 'c-purple',
    subtitle: 'Journal and goals' },
  { key: 'finance', label: 'Finance', icon: 'ti-coin', color: 'c-green',
    subtitle: 'Budget and trading' },
]

export const STATUS_OPTIONS = ['Backlog', 'In progress', 'Blocked', 'Done']

export const STATUS_COLOR = {
  'Backlog': 'neutral',
  'In progress': 'warning',
  'Blocked': 'danger',
  'Done': 'success',
}
