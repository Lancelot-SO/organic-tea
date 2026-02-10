import { Heart, Share2 } from 'lucide-react';
import product3 from '../../assets/images/product3.jpeg';

const AuthorBio = ({ author = "Davida Dzato" }) => {
    return (
        <div className="mt-16 space-y-8">
            <div className="bg-[#F8F5F0] rounded-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-stone-100">
                <div className="w-32 h-32 rounded-full overflow-hidden shrink-0 shadow-lg border-4 border-white">
                    <img
                        src={product3}
                        alt={author}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="text-center md:text-left space-y-3">
                    <h4 className="text-2xl font-bold text-primary-dark font-heading">{author}</h4>
                    <p className="text-stone-600 leading-relaxed italic font-serif">
                        Embracing the health benefits of hibiscus tea is a joyous journey that can easily become a part of your daily routine. Whether enjoyed hot or cold, sweetened or unsweetened, its versatility allows for a variety of preparations to suit individual tastes.
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-12 py-6 border-y border-stone-100">
                <button className="flex items-center gap-2 text-stone-400 hover:text-red-500 transition-colors group">
                    <Heart className="w-5 h-5 group-hover:fill-current" />
                    <span className="text-xs font-bold uppercase tracking-widest">621 LIKES</span>
                </button>
                <button className="flex items-center gap-2 text-stone-400 hover:text-gold transition-colors group">
                    <Share2 className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">SHARE</span>
                </button>
            </div>
        </div>
    );
};

export default AuthorBio;
