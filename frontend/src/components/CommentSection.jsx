import React, { useState } from 'react';
import { Send, User } from 'lucide-react';
import { addComment } from '../services/projectService';

const CommentSection = ({ projectId, initialComments = [] }) => {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setLoading(true);
        try {
            const data = await addComment(projectId, newComment);
            setComments([data.comment, ...comments]);
            setNewComment('');
        } catch (err) {
            alert(err.error || "Erreur lors de l'envoi du commentaire");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50/50 rounded-2xl p-6 mt-4 animate-in slide-in-from-top duration-300">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                Commentaires <span className="text-[#D4AF37]">({comments.length})</span>
            </h4>

            {/* Formulaire de commentaire */}
            <form onSubmit={handleSubmit} className="relative mb-6">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 pr-12 text-sm focus:border-[#D4AF37]/50 focus:ring-4 focus:ring-[#D4AF37]/5 outline-none transition-all"
                />
                <button
                    disabled={loading || !newComment.trim()}
                    className="absolute right-2 top-1.5 p-2 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg transition-all disabled:opacity-50"
                >
                    <Send size={18} />
                </button>
            </form>

            {/* Liste des commentaires */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0">
                            <User size={14} />
                        </div>
                        <div className="flex-1">
                            <div className="bg-white border border-gray-100 p-3 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
                                <p className="text-[10px] font-bold text-black uppercase mb-1">
                                    {comment.User?.prenom} {comment.User?.nom}
                                </p>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {comment.content}
                                </p>
                            </div>
                            <span className="text-[9px] text-gray-400 ml-2 mt-1 block">
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}

                {comments.length === 0 && (
                    <p className="text-center text-gray-400 text-xs py-4 italic">
                        Soyez le premier à commenter !
                    </p>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
