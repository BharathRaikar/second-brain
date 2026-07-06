import React from 'react'

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: 'ti-home' },
  { key: 'work', label: 'Work', icon: 'ti-briefcase' },
  { key: 'projects', label: 'Projects', icon: 'ti-bulb' },
  { key: 'personal', label: 'Personal', icon: 'ti-heart' },
  { key: 'more', label: 'More', icon: 'ti-dots' },
]

export default function BottomNav({ active, onNavigate }) {
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          className={'nav-item' + (active === item.key ? ' nav-item-active' : '')}
          onClick={() => onNavigate(item.key)}
        >
          <i className={`ti ${item.icon}`} aria-hidden="true" />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
