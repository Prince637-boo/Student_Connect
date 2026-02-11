import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, MessageSquare } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { API_URL } from '../config';

const Chat = () => {
    const [activeChat, setActiveChat] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [myId] = useState(JSON.parse(localStorage.getItem('user'))?.id);

    const [contacts] = useState([
        { id: 'd1', name: 'Alice Martin', lastMessage: "On se voit demain ?", time: '10:30', online: true, color: 'bg-blue-500' },
        { id: 'd2', name: 'Jean Dupont', lastMessage: "Tu as vu le nouveau projet ?", time: 'Hier', online: false, color: 'bg-green-500' },
        { id: 'd3', name: 'Sophie Laurent', lastMessage: "Merci pour ton aide !", time: 'Mar.', online: true, color: 'bg-purple-500' },
        { id: 'd4', name: 'Lucas Petit', lastMessage: "Je t'envoie les fichiers.", time: 'Lun.', online: false, color: 'bg-orange-500' },
    ]);

    const DUMMY_MESSAGES = {
        'd1': [
            { id: 1, senderId: 'd1', content: "Salut ! Tu as avancé sur le projet d'IA ?" },
            { id: 2, senderId: myId, content: "Hello Alice ! Oui, j'ai terminé la partie preprocessing." },
            { id: 3, senderId: 'd1', content: "Super ! On se fait un point demain ?" },
        ],
        'd2': [
            { id: 4, senderId: 'd2', content: "Tu as vu le nouveau projet posté par Marc ?" },
            { id: 5, senderId: myId, content: "Pas encore, je vais regarder ça." },
        ],
        'd3': [
            { id: 6, senderId: 'd3', content: "Merci pour ton aide ! Ton code m'a débloqué." },
            { id: 7, senderId: myId, content: "Avec plaisir ! N'hésite pas si tu as d'autres questions." },
        ],
        'd4': [
            { id: 8, senderId: 'd4', content: "Je t'envoie les fichiers dès que possible." },
        ]
    };

    useEffect(() => {
        const fetchMessages = async () => {
            if (!activeChat) return;

            // Si c'est un contact fictif, utiliser les données fictives
            if (typeof activeChat.id === 'string' && activeChat.id.startsWith('d')) {
                setMessages(DUMMY_MESSAGES[activeChat.id] || []);
                return;
            }

            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${API_URL}/messages/${activeChat.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessages(res.data);
            } catch (err) {
                console.error("Erreur chargement messages", err);
            }
        };
        fetchMessages();
    }, [activeChat, myId]);

    const handleSendMessage = async () => {
        if (!message.trim() || !activeChat) return;

        // Simuler l'envoi pour les contacts fictifs
        if (typeof activeChat.id === 'string' && activeChat.id.startsWith('d')) {
            const newMessage = {
                id: Date.now(),
                senderId: myId,
                content: message,
            };
            setMessages([...messages, newMessage]);
            setMessage('');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${API_URL}/messages`,
                { content: message, receiverId: activeChat.id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessages([...messages, res.data]);
            setMessage('');
        } catch (err) {
            alert("Erreur d'envoi");
        }
    };

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 ml-64 flex gap-6 p-6">
                {/* Liste des contacts */}
                <div className="w-80 bg-white flex flex-col rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50">
                        <h2 className="text-2xl font-black text-black">Mes<span className="text-[#D4AF37]">sages</span></h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {contacts.map((contact) => (
                            <button
                                key={contact.id}
                                onClick={() => setActiveChat(contact)}
                                className={`w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-all duration-300 border-b border-gray-50 ${activeChat?.id === contact.id ? 'bg-[#D4AF37]/10 border-l-4 border-l-[#D4AF37]' : ''
                                    }`}
                            >
                                <div className={`relative w-12 h-12 rounded-xl ${contact.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                    {contact.name[0]}
                                    {contact.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-semibold text-sm text-gray-900">{contact.name}</h3>
                                        <span className="text-[10px] text-gray-400 font-medium">{contact.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate w-40">{contact.lastMessage}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {activeChat ? (
                    <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gradient-to-br from-white to-gray-50/50">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl ${activeChat.color || 'bg-gray-200'} flex items-center justify-center font-bold text-white shadow-lg`}>
                                    {activeChat.name[0]}
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-black">{activeChat.name}</h3>
                                    <p className={`text-xs font-semibold ${activeChat.online ? 'text-green-500' : 'text-gray-400'}`}>
                                        {activeChat.online ? '● En ligne' : 'Hors ligne'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-gradient-to-br from-gray-50/50 to-white">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex gap-3 ${msg.senderId === myId ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shadow-lg ${msg.senderId === myId ? 'bg-gradient-to-br from-[#D4AF37] to-[#aa8a1e] text-black' : 'bg-gray-200 text-gray-600'
                                        }`}>
                                        {msg.senderId === myId ? 'M' : (activeChat.name ? activeChat.name[0] : '?')}
                                    </div>
                                    <div className={`p-4 rounded-2xl shadow-lg max-w-md ${msg.senderId === myId
                                        ? 'bg-gradient-to-br from-black to-gray-900 text-white rounded-tr-sm border border-black/20'
                                        : 'bg-white text-gray-700 rounded-tl-sm border border-gray-100'
                                        }`}>
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 border-t border-gray-50 bg-white">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Écrivez votre message..."
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-5 pr-16 text-sm focus:ring-2 focus:ring-[#D4AF37]/30 outline-none transition-all"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-br from-[#D4AF37] to-[#aa8a1e] text-black rounded-xl hover:scale-110 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-inner">
                            <MessageSquare size={48} className="opacity-30 text-[#D4AF37]" />
                        </div>
                        <h3 className="text-xl font-black text-black mb-2">Tes <span className="text-[#D4AF37]">conversations</span></h3>
                        <p className="text-sm text-gray-500">Sélectionnez un contact pour commencer à discuter</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Chat;
