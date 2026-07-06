import React from 'react'

export default function SectionPreviewCard({ section, items, onNavigate }) {
  const open = items.filter((i) => i.status !== 'Done')
  return (
    <button className="section-preview-card" onClick={() => onNavigate(section.key)}>
      <span className={`preview-bar ${section.color}`} aria-hidden="true" />
      <div className="preview-body">
        <p className="preview-title">{section.label}</p>
        <p className="preview-subtitle">{section.subtitle}</p>
      </div>
      <span className={`preview-count-pill ${section.color}`}>{open.length}</span>
    </button>
  )
}
