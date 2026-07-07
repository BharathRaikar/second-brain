import React from 'react'
import { STATUS_COLOR } from '../sections.js'

export default function ItemCard({ item, onCycleStatus, onDelete }) {
  const badgeRole = STATUS_COLOR[item.status] || 'neutral'
  return (
    <div className="item-card">
      <div className="item-body">
        <p className={'item-title' + (item.status === 'Completed' ? ' item-title-done' : '')}>
          {item.title}
        </p>
        {item.notes ? <p className="item-notes">{item.notes}</p> : null}
      </div>
      <button
        className={`badge badge-${badgeRole}`}
        aria-label={`Status: ${item.status}. Tap to change.`}
        onClick={() => onCycleStatus(item)}
      >
        {item.status}
      </button>
      <button className="item-delete" aria-label="Delete item" onClick={() => onDelete(item)}>
        <i className="ti ti-x" aria-hidden="true" />
      </button>
    </div>
  )
}
