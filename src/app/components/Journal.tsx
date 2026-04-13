import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookHeart, Plus, ChevronDown, Lock, Globe, Trash2, Edit3, Check, X } from "lucide-react";
import { PageTransition } from "./PageTransition";

// Firebase Imports
import { db } from "../../firebase";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

interface JournalEntry {
  id: string;
  text: string;
  createdAt: any;
  author: string;
  prompt: string;
  isPrivate: boolean;
}

export function Journal() {
  const [isWriting, setIsWriting] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [journalText, setJournalText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // States for Editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // 1. Fetch Entries
  useEffect(() => {
    const q = query(collection(db, "journal_entries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedEntries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JournalEntry[];
      setEntries(fetchedEntries);
    });
    return () => unsubscribe();
  }, []);

  // 2. Save New Entry
  const handleSaveEntry = async () => {
    if (!journalText.trim()) return;
    setIsSaving(true);
    try {
      await addDoc(collection(db, "journal_entries"), {
        text: journalText,
        prompt: selectedPrompt || "Freestyle",
        createdAt: serverTimestamp(),
        author: "you", 
        isPrivate: isPrivate,
      });
      setJournalText("");
      setSelectedPrompt("");
      setIsWriting(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  // 3. Delete Entry
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this memory?")) {
      try {
        await deleteDoc(doc(db, "journal_entries", id));
      } catch (e) {
        console.error("Error deleting: ", e);
      }
    }
  };

  // 4. Update (Edit) Entry
  const handleUpdate = async (id: string) => {
    if (!editText.trim()) return;
    try {
      const entryRef = doc(db, "journal_entries", id);
      await updateDoc(entryRef, {
        text: editText,
        lastUpdated: serverTimestamp() // Optional: track when it was edited
      });
      setEditingId(null);
    } catch (e) {
      console.error("Error updating: ", e);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-8 max-w-lg mx-auto pb-24">
        {/* Header - Identical to previous */}
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2 bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] bg-clip-text text-transparent font-medium">Shared Journal</h1>
          <p className="text-[#9e8c9f] text-sm italic">Your story, written together</p>
        </div>

        {/* Action Button & Writing Area - Identical to previous */}
        <motion.button
          onClick={() => setIsWriting(!isWriting)}
          className="w-full mb-6 bg-gradient-to-br from-[#9b7ea8] to-[#c9a6ba] text-white rounded-2xl py-4 shadow-lg flex items-center justify-center gap-2"
        >
          {isWriting ? <ChevronDown /> : <Plus />}
          <span>{isWriting ? "Close" : "Write an entry"}</span>
        </motion.button>

        <AnimatePresence>
          {isWriting && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-8 overflow-hidden">
               <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 shadow-lg">
                  <textarea
                    value={journalText}
                    onChange={(e) => setJournalText(e.target.value)}
                    placeholder="Write from your heart..."
                    className="w-full bg-transparent border-none focus:ring-0 text-[#5a4a5e] italic text-lg"
                    rows={4}
                  />
                  <button onClick={handleSaveEntry} className="w-full mt-4 bg-[#9b7ea8] text-white py-3 rounded-xl">Save entry</button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Entries List with Edit/Delete */}
        <div className="space-y-4">
          {entries.map((entry) => (
            <motion.div key={entry.id} layout className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 shadow-sm relative group">
              
              {/* Entry Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-[#9b7ea8]">
                    <BookHeart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#5a4a5e]">{entry.author === "you" ? "You" : "Partner"}</p>
                    <p className="text-[10px] text-[#9e8c9f] uppercase tracking-wider">{formatDate(entry.createdAt)}</p>
                  </div>
                </div>

                {/* Edit/Delete Icons (Visible on hover) */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditingId(entry.id); setEditText(entry.text); }} className="p-1.5 text-blue-400 hover:bg-blue-50 rounded-lg">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(entry.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content Area */}
              {editingId === entry.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-white/80 border border-purple-200 rounded-xl p-3 text-[#5a4a5e] italic focus:outline-none"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(entry.id)} className="bg-green-500 text-white p-2 rounded-lg flex-1 flex justify-center"><Check className="w-4 h-4" /></button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white p-2 rounded-lg flex-1 flex justify-center"><X className="w-4 h-4" /></button>
                  </div>
                </div>
              ) : (
                <p className="text-[#5a4a5e] leading-relaxed italic text-lg">{entry.text}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}