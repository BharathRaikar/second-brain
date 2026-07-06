import React from 'react'

export default function MoreView({ sections, itemsBySection, onNavigate }) {
  return (
    <div className="section-view">
      <div className="section-header">
        <p className="section-title">More sections</p>
        <p className="section-subtitle">Everything else</p>
      </div>
      <div className="section-preview-list">
        {sections.map((section) => {
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
