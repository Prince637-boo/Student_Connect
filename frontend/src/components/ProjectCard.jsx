import React, { useState } from 'react';
import { MessageCircle, Heart, Eye, Share2, MoreHorizontal } from 'lucide-react';
import CommentSection from './CommentSection';
import { likeProject, trackView } from '../services/projectService';
import ProjectMedia from './ProjectMedia';

const ProjectCard = ({ project }) => {
    const [showComments, setShowComments] = useState(false);
    const [likes, setLikes] = useState(project.Likes?.length || 0);
    const [isLiked, setIsLiked] = useState(false); // Idéalement à vérifier via le backend
    const [views, setViews] = useState(project.views || 0);

    const handleLike = async () => {
        try {
            await likeProject(project.id);
            setIsLiked(!isLiked);
            setLikes(isLiked ? likes - 1 : likes + 1);
        } catch (err) {
            console.error(err);
        }
    };

    const handleView = async () => {
        try {
            await trackView(project.id);
            setViews(views + 1);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#D4AF37]/5 transition-all duration-500 mb-8 group">
            {/* Header du projet */}
            <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-black to-gray-800 flex items-center justify-center text-[#D4AF37] font-bold text-lg shadow-lg">
                        {project.User?.prenom?.[0] || 'S'}{project.User?.nom?.[0] || 'C'}
                    </div>
                    <div>
                        <h3 className="font-black text-lg text-black leading-none mb-1 group-hover:text-[#D4AF37] transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                            Par <span className="text-black">{project.User?.prenom} {project.User?.nom}</span> • {project.category}
                        </p>
                    </div>
                </div>
                <button className="text-gray-300 hover:text-black transition-colors">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Media (Utilisation du nouveau composant intelligent) */}
            <div onClick={handleView}>
                <ProjectMedia
                    imageUrl={project.imageUrl}
                    youtubeLink={project.youtubeLink}
                    category={project.category}
                />
            </div>

            {/* Description */}
            <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 hover:line-clamp-none transition-all">
                    {project.description}
                </p>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
                <div className="flex items-center gap-6">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 transition-all ${isLiked ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-red-500 hover:scale-110'}`}
                    >
                        <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                        <span className="text-xs font-bold">{likes}</span>
                    </button>

                    <button
                        onClick={() => setShowComments(!showComments)}
                        className={`flex items-center gap-2 transition-all ${showComments ? 'text-[#D4AF37] scale-110' : 'text-gray-400 hover:text-[#D4AF37] hover:scale-110'}`}
                    >
                        <MessageCircle size={20} fill={showComments ? 'currentColor' : 'none'} />
                        <span className="text-xs font-bold">{project.Comments?.length || 0}</span>
                    </button>

                    <div className="flex items-center gap-2 text-gray-400">
                        <Eye size={20} />
                        <span className="text-xs font-bold">{views}</span>
                    </div>
                </div>

                <button className="text-gray-400 hover:text-black transition-colors">
                    <Share2 size={18} />
                </button>
            </div>

            {/* Section Commentaires */}
            {showComments && (
                <CommentSection projectId={project.id} initialComments={project.Comments} />
            )}
        </div>
    );
};

export default ProjectCard;
