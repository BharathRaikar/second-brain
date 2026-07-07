import React from 'react'
import { SECTIONS } from '../sections.js'
import SectionPreviewCard from './SectionPreviewCard.jsx'

export default function HomeView({ itemsBySection, onNavigate }) {
  const allItems = Object.values(itemsBySection).flat()
  const countByStatus = (status) => allItems.filter((i) => i.status === status).length

  const stats = [
    { label: 'Open', value: countByStatus('Open') },
    { label: 'In progress', value: countByStatus('In progress') },
    { label: 'Blocked', value: countByStatus('Blocked') },
    { label: 'Completed', value: countByStatus('Completed') },
    { label: 'Total', value: allItems.length },
  ]

  return (
    <div className="section-view">
      <div className="section-header">
        <p className="section-title">Second brain</p>
        <p className="section-subtitle">Everything, in one place</p>
      </div>

      <div className="stat-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="section-preview-list">
        {SECTIONS.map((section) => (
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
