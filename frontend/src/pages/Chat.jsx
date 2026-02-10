import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Send, Search, User, MoreVertical, Phone, Video as VideoIcon, MessageSquare } from 'lucide-react';

const Chat = () => {
    const [activeChat, setActiveChat] = useState(null);
    const [message, setMessage] = useState('');

    const contacts = [
        { id: 1, name: 'Alice Martin', school: 'HEC Paris', lastMsg: 'Ton projet est incroyable !', time: '12:45', online: true },
        { id: 2, name: 'Thomas Dubois', school: 'EPITA', lastMsg: 'On peut collaborer ?', time: 'Hier', online: false },
        { id: 3, name: 'Emma Leroy', school: 'ESMOD', lastMsg: 'Merci pour le feedback', time: 'Lun', online: true },
    ];

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 ml-64 flex">

                {/* Liste des conversations */}
                <div className="w-80 bg-white border-r border-gray-100 flex flex-col">
                    <div className="p-6 border-b border-gray-50">
                        <h2 className="text-2xl font-black text-black mb-4">Messages</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {contacts.map(contact => (
                            <button
                                key={contact.id}
                                onClick={() => setActiveChat(contact)}
                                className={`w-full p-4 flex gap-4 transition-colors hover:bg-gray-50 border-l-4 ${activeChat?.id === contact.id ? 'bg-[#D4AF37]/5 border-[#D4AF37]' : 'border-transparent'
                                    }`}
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                        {contact.name[0]}
                                    </div>
                                    {contact.online && (
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full"></div>
                                    )}
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-sm font-black text-black">{contact.name}</h4>
                                        <span className="text-[10px] text-gray-400 font-bold">{contact.time}</span>
                                    </div>
                                    <p className="text-[11px] text-gray-500 truncate">{contact.lastMsg}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Zone de Chat */}
                {activeChat ? (
                    <div className="flex-1 flex flex-col bg-white">
                        {/* Header Chat */}
                        <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                    {activeChat.name[0]}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-black">{activeChat.name}</h4>
                                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">En ligne</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors"><Phone size={18} /></button>
                                <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors"><VideoIcon size={18} /></button>
                                <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors"><MoreVertical size={18} /></button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50/30">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-lg bg-gray-200" />
                                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-md">
                                    <p className="text-sm text-gray-600 leading-relaxed">Salut ! J'ai vu ton dernier projet de design sur StudentConnect, c'est super propre.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 flex-row-reverse">
                                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-[#D4AF37] text-xs font-bold">Moi</div>
                                <div className="bg-black p-4 rounded-2xl rounded-tr-none shadow-lg max-w-md">
                                    <p className="text-sm text-white leading-relaxed">Merci Alice ! Ça m'a pris pas mal de temps pour affiner les ombres.</p>
                                </div>
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-6 border-t border-gray-50">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Écrivez votre message..."
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-4 pr-14 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-black text-[#D4AF37] rounded-xl hover:scale-110 active:scale-95 transition-all shadow-lg">
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-20 bg-gray-50/20">
                        <div className="w-24 h-24 bg-white rounded-[2rem] shadow-sm flex items-center justify-center text-[#D4AF37] mb-6">
                            <MessageSquare size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-black mb-2">Vos Messages</h3>
                        <p className="text-gray-500 max-w-sm">Sélectionnez une conversation pour commencer à échanger avec d'autres étudiants.</p>
                    </div>
                )}

            </main>
        </div>
    );
};

export default Chat;
