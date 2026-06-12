import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    text: 'Bonjour ! 👋 Je suis l\'assistant SaaS-Data Engine. Comment puis-je vous aider ?',
    sender: 'bot',
    time: 'Maintenant',
  },
];

const BOT_RESPONSES: Record<string, string> = {
  prix: 'Nous proposons 3 plans : Starter (79$), Pro (149$) et Compétiteur (199$). Le plan Pro est le plus populaire ! Consultez la page tarifs pour plus de détails.',
  tarif: 'Nous proposons 3 plans : Starter (79$), Pro (149$) et Compétiteur (199$). Le plan Pro est le plus populaire ! Consultez la page tarifs pour plus de détails.',
  remboursement: 'Oui ! Nous offrons une garantie satisfait ou remboursé de 30 jours, sans questions posées.',
  garantie: 'Oui ! Nous offrons une garantie satisfait ou remboursé de 30 jours, sans questions posées.',
  démo: 'Vous pouvez tester la démo interactive directement sur notre page d\'accueil. Glissez un fichier CSV pour voir le système en action !',
  support: 'Le support est inclus dans tous les plans. Les plans Pro et Compétiteur bénéficient d\'un support prioritaire (réponse sous 24h).',
  stripe: 'Oui, l\'intégration Stripe est complète : Checkout, abonnements, webhooks, customer portal et plus encore.',
  docker: 'Tout le stack est containerisé avec Docker Compose. Un seul "docker compose up" et vous êtes prêt !',
  default: 'Merci pour votre message ! Pour une réponse personnalisée, contactez-nous via le formulaire de contact ou envoyez un email à contact@saas-data-engine.com.',
};

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      time: 'Maintenant',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = BOT_RESPONSES.default;
      
      for (const [keyword, reply] of Object.entries(BOT_RESPONSES)) {
        if (lowerInput.includes(keyword)) {
          response = reply;
          break;
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        time: 'Maintenant',
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 shadow-lg shadow-teal-500/30 flex items-center justify-center hover:scale-110 transition-all ${
          isOpen ? 'hidden' : ''
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-[10px] text-white font-bold">
          1
        </span>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[500px] bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-500 to-teal-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-950">Assistant SaaS-Data Engine</h3>
                <p className="text-xs text-slate-800">Toujours là pour vous aider</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-950/70 hover:text-slate-950"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'bot'
                      ? 'bg-teal-500/20 text-teal-400'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}
                >
                  {msg.sender === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    msg.sender === 'bot'
                      ? 'bg-slate-800 rounded-tl-sm'
                      : 'bg-teal-500 text-slate-950 rounded-tr-sm'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === 'bot' ? 'text-slate-500' : 'text-slate-800'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
              />
              <button
                onClick={sendMessage}
                className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center hover:bg-teal-400 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-600 text-center mt-2">
              Réponses automatiques • Pour un humain : contact@saas-data-engine.com
            </p>
          </div>
        </div>
      )}
    </>
  );
}
