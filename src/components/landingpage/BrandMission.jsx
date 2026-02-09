import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import team1 from "../../assets/images/home/team1.png"
import team2 from "../../assets/images/home/team2.png"
import team3 from "../../assets/images/home/team3.png"

const BrandMission = () => {
    return (
        <main className='py-10 overflow-hidden'>
            <section className=' container flex flex-col md:flex-row gap-5'>
                <div className='h-[700px] w-full flex flex-col justify-between md:border-r-4 border-[#B18A45]'>
                    <section className='w-[430px] h-[320px] flex flex-col gap-5 '>
                        <button className='w-[116px] h-[38px] bg-[#ECEFED] text-[#334936] italic font-bold text-[14px] rounded-[5px]'>Brand Mission</button>
                        <h1 className='font-normal text-[18px] leading-[30px] text-[#1F2C20] w-[380px]'>Our goal is to captivate our customers with premium,
                            naturally sourced teas and infusions that promote a healthier lifestyle while caring for our planet, fostering a positive work environment,
                            and embracing innovative growth.
                        </h1>
                        <Link to="/about" className='flex items-center justify-center gap-2 w-[140px] h-[40px] bg-[#ECEFED] text-[#334936] 
                        italic font-bold text-[14px] rounded-[5px] border-2 border-[#C5CEC6]'>
                            Read More <ArrowUpRight size={16} className='text-[#B18A45]' />
                        </Link>
                    </section>
                    <div>
                        <img src={team1} alt="team" className='w-full h-[400px] lg:w-[251px] lg:h-[333px] object-cover' />
                    </div>
                </div>
                <div className='h-[600px] md:h-[700px] w-full flex flex-col md:justify-end gap-4'>
                    <h1 className='font-normal text-[18px] leading-[30px] text-[#1F2C20] w-[380px]'>
                        At a time when the whole world was reeling from the effects of a global pandemic,
                        we knew to tap into the wonders of our African herbs and spices to create a blend that is
                        not only tasty and delicious but with a wide range of benefits as well. Particularly, helping relieve stress, boosting the immune system,
                        aiding weight loss and promoting general wellbeing.
                    </h1>
                    <div>
                        <img src={team2} alt="team" className='object-cover' />
                    </div>
                </div>
                <div className='h-[400px] md:h-[700px] w-full flex items-start justify-end'>
                    <div>
                        <img src={team3} alt="team" className='w-full h-[400px] lg:w-[290px] lg:h-[333px] object-cover' />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BrandMission;
