import React, { useEffect, useState } from 'react'

export default function SectionNotes({ sectionKey, content, onSave }) {
  const [value, setValue] = useState(content || '')
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    setValue(content || '')
    setDirty(false)
  }, [sectionKey, content])

  function handleBlur() {
    if (dirty) {
      onSave(value)
      setDirty(false)
    }
  }

  return (
    <div className="notes-box">
      <p className="list-divider">Notes</p>
      <textarea
        className="notes-textarea"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setDirty(true)
        }}
        onBlur={handleBlur}
        placeholder="Jot down anything related to this section..."
      />
    </div>
  )
}
