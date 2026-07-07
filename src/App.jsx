import React, { useEffect, useState, useCallback } from 'react'
import { supabase } from './supabaseClient.js'
import { SECTIONS, STATUS_OPTIONS } from './sections.js'
import BottomNav from './components/BottomNav.jsx'
import HomeView from './components/HomeView.jsx'
import SectionView from './components/SectionView.jsx'
import MoreView from './components/MoreView.jsx'

const MAIN_NAV_KEYS = ['work', 'projects', 'personal']
const MORE_SECTIONS = SECTIONS.filter((s) => !MAIN_NAV_KEYS.includes(s.key))

export default function App() {
  const [active, setActive] = useState('home')
  const [itemsBySection, setItemsBySection] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadItems = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    const grouped = {}
    for (const section of SECTIONS) grouped[section.key] = []
    for (const row of data || []) {
      if (!grouped[row.section]) grouped[row.section] = []
      grouped[row.section].push(row)
    }
    setItemsBySection(grouped)
    setError(null)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  async function handleAdd(sectionKey, { title, status }) {
    const optimisticId = `temp-${Date.now()}`
    const optimisticItem = { id: optimisticId, section: sectionKey, title, status, notes: null }
    setItemsBySection((prev) => ({
      ...prev,
      [sectionKey]: [...(prev[sectionKey] || []), optimisticItem],
    }))

    const { data, error } = await supabase
      .from('items')
      .insert({ section: sectionKey, title, status })
      .select()
      .single()

    if (error) {
      setError(error.message)
      return
    }

    setItemsBySection((prev) => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map((i) => (i.id === optimisticId ? data : i)),
    }))
  }

  async function handleCycleStatus(item) {
    const currentIndex = STATUS_OPTIONS.indexOf(item.status)
    const nextStatus = STATUS_OPTIONS[(currentIndex + 1) % STATUS_OPTIONS.length]
    setItemsBySection((prev) => ({
      ...prev,
      [item.section]: prev[item.section].map((i) =>
        i.id === item.id ? { ...i, status: nextStatus } : i
      ),
    }))

    const { error } = await supabase
      .from('items')
      .update({ status: nextStatus })
      .eq('id', item.id)

    if (error) setError(error.message)
  }

  async function handleDelete(item) {
    setItemsBySection((prev) => ({
      ...prev,
      [item.section]: prev[item.section].filter((i) => i.id !== item.id),
    }))

    const { error } = await supabase.from('items').delete().eq('id', item.id)
    if (error) setError(error.message)
  }

  function renderActiveView() {
    if (active === 'home') {
      return <HomeView itemsBySection={itemsBySection} onNavigate={setActive} />
    }
    if (active === 'more') {
      return (
        <MoreView
          sections={MORE_SECTIONS}
          itemsBySection={itemsBySection}
          onNavigate={setActive}
        />
      )
    }
    const section = SECTIONS.find((s) => s.key === active)
    if (!section) return null
    return (
      <SectionView
        section={section}
        items={itemsBySection[section.key] || []}
        loading={loading}
        onAdd={(payload) => handleAdd(section.key, payload)}
        onCycleStatus={handleCycleStatus}
        onDelete={handleDelete}
      />
    )
  }

  return (
    <div className="app-shell">
      <div className="app-screen">
        {error && (
          <div className="error-banner">
            Could not reach the database. Check your Supabase setup in .env.
          </div>
        )}
        {renderActiveView()}
      </div>
      <BottomNav active={active === 'home' ? 'home' : MAIN_NAV_KEYS.includes(active) ? active : 'more'} onNavigate={setActive} />
    </div>
  )
}
