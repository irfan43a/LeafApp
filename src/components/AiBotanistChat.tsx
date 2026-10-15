import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Trash2, Settings, Lightbulb, AlertCircle } from 'lucide-react';
import { askBotanistAi } from '../services/geminiApi';
import { getGeminiApiKey } from '../services/storage';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

interface AiBotanistChatProps {
  onOpenSettings: () => void;
}

export const AiBotanistChat: React.FC<AiBotanistChatProps> = ({ onOpenSettings }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Halo! Saya **Dr. Botanika**, asisten AI herbalis dan ahli botani Anda 🌿. Anda bisa bertanya seputar khasiat tanaman bagi kesehatan manusia, takaran racikan herbal, atau konsultasi masalah perawatan tanaman yang sedang layu/menguning. Ada yang bisa saya bantu hari ini?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasApiKey = !!getGeminiApiKey();

  const quickQuestions = [
    'Tanaman apa yang ampuh untuk asam lambung & GERD?',
    'Bagaimana takaran aman rebusan jahe merah untuk flu?',
    'Mengapa daun tanaman saya menguning dan layu?',
    'Apakah sambiloto aman diminum setiap hari?',
    'Tanaman apa yang bagus untuk menurunkan tensi darah?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.sender === 'user' ? 'user' as const : 'model' as const,
          text: m.text
        }));

      const reply = await askBotanistAi(textToSend, history);

      const botMsg: Message = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (e: any) {
      const errorMsg: Message = {
        id: 'bot-err-' + Date.now(),
        sender: 'bot',
        text: 'Maaf, terjadi kendala saat memproses jawaban. Silakan coba kembali.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'bot',
        text: 'Riwayat obrolan telah dibersihkan. Silakan tanyakan hal baru seputar tanaman dan herbal!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Basic markdown-like parser for formatting **bold** and newlines
  const renderFormattedText = (txt: string) => {
    const paragraphs = txt.split('\n');
    return paragraphs.map((para, idx) => {
      if (!para.trim()) return <div key={idx} className="h-2" />;
      
      // Replace **text** with strong
      const parts = para.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="mb-1 leading-relaxed">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-semibold text-stone-900">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={pIdx} className="italic text-stone-800">{part.slice(1, -1)}</em>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm flex flex-col h-[750px] max-h-[85vh] overflow-hidden">
      {/* Top Bar */}
      <div className="p-4 sm:p-5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-stone-900 font-serif text-base">Dr. Botanika AI</h3>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                hasApiKey ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {hasApiKey ? 'Gemini 3.8 Flash' : 'Mode Cerdas Lokal'}
              </span>
            </div>
            <p className="text-xs text-stone-500">Konsultan Herbal Medis & Dokter Perawatan Tanaman</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleClearChat}
            title="Bersihkan Percakapan"
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenSettings}
            title="Pengaturan API"
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-stone-50/30">
        {!hasApiKey && (
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong>Tips Integrasi AI:</strong> Anda dapat memasukkan Google Gemini API Key di{' '}
              <button onClick={onOpenSettings} className="underline font-bold text-amber-950 hover:text-emerald-700">
                Pengaturan
              </button>{' '}
              untuk mengaktifkan penalaran penuh Gemini 3.8 Flash secara real-time!
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-stone-800 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm ${
                msg.sender === 'user'
                  ? 'bg-emerald-800 text-white rounded-tr-none'
                  : 'bg-white border border-stone-200/90 text-stone-800 shadow-2xs rounded-tl-none'
              }`}
            >
              {renderFormattedText(msg.text)}
              <div
                className={`text-[10px] mt-2 ${
                  msg.sender === 'user' ? 'text-emerald-200 text-right' : 'text-stone-400'
                }`}
              >
                {msg.time}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs rounded-tl-none">
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                <span>Dr. Botanika sedang menganalisis literatur herbal dan botani...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts carousel */}
      <div className="p-3 bg-white border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-semibold text-stone-400 flex items-center gap-1 shrink-0 pl-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Contoh:
        </span>
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 text-[11px] font-medium whitespace-nowrap transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="p-3 sm:p-4 bg-white border-t border-stone-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan khasiat tanaman, cara merebus jamu, atau solusi daun layu..."
            className="flex-1 px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            aria-label="Kirim pertanyaan ke Dr. Botanika"
            className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold transition-all shadow-xs flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
