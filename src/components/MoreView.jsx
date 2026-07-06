import React from 'react'
import SectionPreviewCard from './SectionPreviewCard.jsx'

export default function MoreView({ sections, itemsBySection, onNavigate }) {
  return (
    <div className="section-view">
      <div className="section-header">
        <p className="section-title">More sections</p>
        <p className="section-subtitle">Everything else</p>
      </div>
      <div className="section-preview-list">
        {sections.map((section) => (
          <SectionPreviewCard
            key={section.key}
            section={section}
            items={itemsBySection[section.key] || []}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  )
}
