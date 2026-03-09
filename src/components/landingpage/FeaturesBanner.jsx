import React from 'react';
import { Truck, Shield, Leaf } from 'lucide-react';

const FeaturesBanner = () => {
    return (
        <div className="w-full bg-[#FCFAF5] py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row items-center justify-between">

                    {/* Item 1 */}
                    <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 w-full relative">
                        <Truck className="text-[#b59052] w-7 h-7 stroke-[1.5]" />
                        <div className="flex flex-col">
                            <span className="text-[#415a45] font-serif text-[19px] font-medium leading-tight">Fast Delivery</span>
                            <span className="text-gray-500 text-[13px] mt-0.5">Enjoy speedy delivery</span>
                        </div>
                    </div>

                    {/* Divider 1 */}
                    <div className="hidden md:block w-px h-12 bg-[#ecdcb9]"></div>

                    {/* Item 2 */}
                    <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 w-full relative border-t border-[#ecdcb9] md:border-t-0">
                        <Shield className="text-[#b59052] w-7 h-7 stroke-[1.5]" />
                        <div className="flex flex-col">
                            <span className="text-[#415a45] font-serif text-[19px] font-medium leading-tight">Secure Checkout</span>
                            <span className="text-gray-500 text-[13px] mt-0.5">256-bit encrypted</span>
                        </div>
                    </div>

                    {/* Divider 2 */}
                    <div className="hidden md:block w-px h-12 bg-[#ecdcb9]"></div>

                    {/* Item 3 */}
                    <div className="flex-1 flex items-center justify-center gap-4 py-4 md:py-0 w-full relative border-t border-[#ecdcb9] md:border-t-0">
                        <Leaf className="text-[#b59052] w-7 h-7 stroke-[1.5]" />
                        <div className="flex flex-col">
                            <span className="text-[#415a45] font-serif text-[19px] font-medium leading-tight">100% Natural</span>
                            <span className="text-gray-500 text-[13px] mt-0.5">Ethically sourced</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FeaturesBanner;
