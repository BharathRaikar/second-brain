import React from 'react'
import { SECTIONS } from '../sections.js'

export default function HomeView({ itemsBySection, onNavigate }) {
  const allItems = Object.values(itemsBySection).flat()
  const openCount = allItems.filter((i) => i.status !== 'Done').length
  const blockedCount = allItems.filter((i) => i.status === 'Blocked').length

  return (
    <div className="section-view">
      <div className="section-header">
        <p className="section-title">Second brain</p>
        <p className="section-subtitle">Everything, in one place</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-label">Open items</p>
          <p className="stat-value">{openCount}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Blocked</p>
          <p className="stat-value">{blockedCount}</p>
        </div>
      </div>

      <div className="section-preview-list">
        {SECTIONS.map((section) => {
          const items = itemsBySection[section.key] || []
          const open = items.filter((i) => i.status !== 'Done')
          return (
            <button
              key={section.key}
              className="section-preview-card"
              onClick={() => onNavigate(section.key)}
            >
              <div className={`preview-icon ${section.color}`}>
                <i className={`ti ${section.icon}`} aria-hidden="true" />
              </div>
              <div className="preview-body">
                <p className="preview-title">{section.label}</p>
                <p className="preview-subtitle">{section.subtitle}</p>
              </div>
              <span className="preview-count">{open.length}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
