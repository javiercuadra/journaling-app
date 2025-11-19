import { writable } from 'svelte/store'

// Key used in localStorage
const STORAGE_KEY = 'journal_draft'

// Draft expires after 12 hours (in ms)
const EXPIRATION_MS = 12 * 60 * 60 * 1000

// Debounce timer holder
let saveTimeout: NodeJS.Timeout | null = null

interface DraftData {
  content: string
  lastUpdated: number
}

function loadDraftFromStorage(): DraftData | null {
  if (typeof localStorage === 'undefined') return null

  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    const data: DraftData = JSON.parse(raw)

    const expired = Date.now() - data.lastUpdated > EXPIRATION_MS
    if (expired) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }

    return data
  } catch {
    return null
  }
}

export const draft = writable<DraftData>({
  content: '',
  lastUpdated: Date.now()
})

// Load any existing draft at startup
if (typeof localStorage !== 'undefined') {
  const existing = loadDraftFromStorage()
  if (existing) {
    draft.set(existing)
  }
}

export function updateDraftContent(newContent: string) {
  draft.update((d) => {
    const updated = { ...d, content: newContent, lastUpdated: Date.now() }

    // debounce saving
    if (saveTimeout) clearTimeout(saveTimeout)
    saveTimeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }, 800) // 800ms debounce

    return updated
  })
}

export function clearDraft() {
  localStorage.removeItem(STORAGE_KEY)
  draft.set({ content: '', lastUpdated: Date.now() })
}