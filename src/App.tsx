import { useEffect, useState } from 'react'
import { supabase } from './services/supabaseClient'
import NoteForm from './features/notes/NoteForm'

type Note = {
  id: string
  title: string
  content: string
  created_at: string
}

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setNotes(data || [])
    } catch (err: any) {
      setError('Impossible de charger les notes')
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">📚 Mes Notes</h1>

      <NoteForm onNoteAdded={fetchNotes} />

      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default App
