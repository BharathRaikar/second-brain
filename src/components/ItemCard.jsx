import React from 'react'
import { STATUS_COLOR } from '../sections.js'

export default function ItemCard({ item, onToggleDone, onDelete }) {
  const badgeRole = STATUS_COLOR[item.status] || 'neutral'
  return (
    <div className="item-card">
      <button
        className="item-check"
        aria-label={item.status === 'Done' ? 'Mark not done' : 'Mark done'}
        onClick={() => onToggleDone(item)}
      >
        <i className={item.status === 'Done' ? 'ti ti-check' : 'ti ti-circle'} aria-hidden="true" />
      </button>
      <div className="item-body">
        <p className={'item-title' + (item.status === 'Done' ? ' item-title-done' : '')}>
          {item.title}
        </p>
        {item.notes ? <p className="item-notes">{item.notes}</p> : null}
      </div>
      <span className={`badge badge-${badgeRole}`}>{item.status}</span>
      <button className="item-delete" aria-label="Delete item" onClick={() => onDelete(item)}>
        <i className="ti ti-x" aria-hidden="true" />
      </button>
    </div>
  )
}
