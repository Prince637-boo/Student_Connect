import React from 'react';
import { Home, MessageSquare, User, Settings, LogOut, Search, PlusCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUI } from '../context/UIContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { openPublishModal } = useUI();

    const menuItems = [
        { icon: Home, label: 'Feed', path: '/dashboard' },
        { icon: Search, label: 'Explorer', path: '/explore' },
        { icon: MessageSquare, label: 'Messages', path: '/chat' },
        { icon: User, label: 'Profil', path: '/profile' },
        { icon: Settings, label: 'Paramètres', path: '/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-50">
            <div className="p-8">
                <h1 className="text-2xl font-black tracking-tighter text-black">
                    STUDENT<span className="text-[#D4AF37]">CONNECT</span>
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                ? 'bg-black text-white shadow-lg shadow-black/10'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                                }`}
                        >
                            <item.icon
                                size={20}
                                className={isActive ? 'text-[#D4AF37]' : 'group-hover:text-[#D4AF37] transition-colors'}
                            />
                            <span className="font-semibold text-sm">{item.label}</span>
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                            )}
                        </button>
                    );
                })}

                <div className="pt-8 pb-4">
                    <button
                        onClick={openPublishModal}
                        className="w-full bg-[#D4AF37] hover:bg-[#aa8a1e] text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition-all active:scale-95"
                    >
                        <PlusCircle size={20} />
                        <span>Publier</span>
                    </button>
                </div>
            </nav>

            <div className="p-4 mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group"
                >
                    <LogOut size={20} />
                    <span className="font-semibold text-sm">Déconnexion</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
