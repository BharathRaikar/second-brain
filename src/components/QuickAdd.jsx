import React, { useState } from 'react'
import { STATUS_OPTIONS } from '../sections.js'

export default function QuickAdd({ onAdd, placeholder }) {
  const [title, setTitle] = useState('')

  function submit(e) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd({ title: trimmed, status: STATUS_OPTIONS[0] })
    setTitle('')
  }

  return (
    <form className="quick-add" onSubmit={submit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={placeholder || 'Add a task or note'}
      />
      <button type="submit" aria-label="Add">
        <i className="ti ti-plus" aria-hidden="true" />
      </button>
    </form>
  )
}
