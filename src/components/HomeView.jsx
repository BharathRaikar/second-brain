import React from 'react'
import { SECTIONS } from '../sections.js'
import SectionPreviewCard from './SectionPreviewCard.jsx'

export default function HomeView({ itemsBySection, onNavigate }) {
  const allItems = Object.values(itemsBySection).flat()
  const totalCount = allItems.length
  const doneCount = allItems.filter((i) => i.status === 'Done').length
  const blockedCount = allItems.filter((i) => i.status === 'Blocked').length
  const progressPct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0

  return (
    <div className="section-view">
      <div className="section-header">
        <p className="section-title">Second brain</p>
        <p className="section-subtitle">Everything, in one place</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card stat-card-ring">
          <div
            className="progress-ring"
            style={{ background: `conic-gradient(var(--accent) 0% ${progressPct}%, var(--border) ${progressPct}% 100%)` }}
          >
            <div className="progress-ring-inner">
              <span className="progress-ring-value">{progressPct}%</span>
            </div>
          </div>
          <div>
            <p className="stat-label">Progress</p>
            <p className="stat-sublabel">{doneCount} of {totalCount} done</p>
          </div>
        </div>
        <div className="stat-card stat-card-danger">
          <p className="stat-label">Blocked</p>
          <p className="stat-value">{blockedCount}</p>
        </div>
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
