import { useState } from 'react'
import { supabase } from '../../services/supabaseClient'

type Props = {
  onNoteAdded: () => void
}

export default function NoteForm({ onNoteAdded }: Props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.from('notes').insert([{ title, content }])
      if (error) throw error

      setMessage('✅ Note ajoutée avec succès')
      setTitle('')
      setContent('')

      onNoteAdded() // Mise à jour de la liste des notes
    } catch (err: any) {
      console.error('Erreur Supabase :', err.message)
      setMessage('❌ Erreur lors de l’ajout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded shadow bg-white mb-6"
    >
      <h2 className="text-lg font-bold text-blue-800">✍️ Ajouter une note</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre"
        className="w-full px-3 py-2 border rounded"
        required
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenu"
        className="w-full px-3 py-2 border rounded h-24"
      />

      <button
        type="submit"
        disabled={loading}
        className="className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700>
        {loading ? 'Ajout en cours...' : 'Ajouter'}
      </button>

      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  )
}
