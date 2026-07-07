import React from 'react'
import ItemCard from './ItemCard.jsx'
import QuickAdd from './QuickAdd.jsx'

export default function SectionView({ section, items, loading, onAdd, onCycleStatus, onDelete }) {
  const openItems = items.filter((i) => i.status !== 'Completed')
  const doneItems = items.filter((i) => i.status === 'Completed')

  return (
    <div className="section-view">
      <div className="section-header">
        <p className="section-title">{section.label}</p>
        <p className="section-subtitle">{section.subtitle}</p>
      </div>

      <QuickAdd onAdd={onAdd} placeholder={`Add to ${section.label.toLowerCase()}`} />

      {loading ? (
        <p className="hint-text">Loading...</p>
      ) : items.length === 0 ? (
        <p className="hint-text">Nothing here yet. Add your first item above.</p>
      ) : (
        <>
          <div className="item-list">
            {openItems.map((item) => (
              <ItemCard key={item.id} item={item} onCycleStatus={onCycleStatus} onDelete={onDelete} />
            ))}
          </div>
          {doneItems.length > 0 && (
            <>
              <p className="list-divider">Completed</p>
              <div className="item-list">
                {doneItems.map((item) => (
                  <ItemCard key={item.id} item={item} onCycleStatus={onCycleStatus} onDelete={onDelete} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
