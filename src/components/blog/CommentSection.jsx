import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const CommentSection = () => {
    return (
        <div className="mt-16 space-y-8">
            <div className="flex justify-between items-center border-b border-stone-200 pb-4">
                <h4 className="text-sm font-bold text-primary-dark uppercase tracking-widest">COMMENT (0)</h4>
                <div className="flex gap-6">
                    <button className="text-[10px] font-bold text-primary-dark uppercase tracking-widest hover:text-gold transition-colors">NEWEST FIRST</button>
                    <button className="text-[10px] font-bold text-primary-dark uppercase tracking-widest hover:text-gold transition-colors">SUBSCRIBE VIA EMAIL</button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="relative">
                    <textarea
                        rows="8"
                        className="w-full border border-stone-200 rounded-sm p-6 focus:outline-none focus:border-gold transition-all bg-white"
                        placeholder="Join the conversation..."
                    ></textarea>

                    <div className="flex justify-between items-center mt-4">
                        <button className="text-xs font-bold text-stone-400 hover:text-primary-dark transition-colors uppercase tracking-widest">Preview</button>
                        <button className="bg-[#EEEDED] hover:bg-gold hover:text-white text-primary-dark px-10 py-3 rounded-sm font-bold text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 border border-stone-100 group shadow-sm">
                            Post Comment
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
