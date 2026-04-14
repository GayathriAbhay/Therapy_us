import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { db } from "../../firebase";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { Send, Heart } from "lucide-react";

export function Talk() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- AUTOMATIC ROLE ASSIGNMENT ---
  // This generates a unique ID for this specific browser/phone
  const [deviceId] = useState(() => {
    let id = localStorage.getItem("chat_device_id");
    if (!id) {
      id = Math.random().toString(36).substring(7);
      localStorage.setItem("chat_device_id", id);
    }
    return id;
  });

  const spaceId = "Marapatti130922";

  useEffect(() => {
    const q = query(
      collection(db, "spaces", spaceId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });

    return () => unsub();
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const textToSend = input;
    setInput(""); 

    try {
      await addDoc(collection(db, "spaces", spaceId, "messages"), {
        text: textToSend,
        senderId: deviceId, // Use the unique device ID instead of 'user1'
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-[#FFFDF9] relative">
      {/* Header */}
      <div className="p-6 border-b border-purple-50 bg-white/60 backdrop-blur-md">
        <h1 className="text-2xl font-medium bg-gradient-to-r from-[#9b7ea8] to-[#c9a6ba] bg-clip-text text-transparent italic">
          Our Conversation
        </h1>
        <p className="text-[10px] text-[#9e8c9f] uppercase tracking-widest mt-1">
          End-to-end encrypted connection
        </p>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-40">
        {messages.map((msg) => {
          // KEY LOGIC: If the message senderId matches THIS device, put it on the right.
          const isMe = msg.senderId === deviceId;
          
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: isMe ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[75%] p-4 rounded-[2rem] shadow-sm relative ${
                isMe 
                  ? "bg-[#9b7ea8] text-white rounded-tr-none" 
                  : "bg-white border border-purple-50 text-[#5a4a5e] rounded-tl-none"
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-24 left-0 right-0 px-6 max-w-lg mx-auto">
        <form 
          onSubmit={sendMessage}
          className="bg-white border border-purple-100 rounded-full p-2 shadow-2xl flex items-center gap-2 backdrop-blur-xl"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write to each other..."
            className="flex-1 bg-transparent px-4 py-2 outline-none text-[#5a4a5e] text-sm"
          />
          <button 
            type="submit"
            className="bg-[#9b7ea8] p-3 rounded-full text-white shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}