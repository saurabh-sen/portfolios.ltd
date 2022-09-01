import { React, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useAnimation } from 'framer-motion';
import style from './Features.module.css'
import Link from 'next/link';

const Features = ({ t }) => {

    const { ref, inView } = useInView({
        threshold: 0.3,
    });

    const animation = useAnimation();

    useEffect(() => {
        if (inView) {
            animation.start(i => ({
                    x: 0,
                    opacity: 1,
                    translateX: 0,
                    translateY: 0,
                    transition:{ duration: 0.3, delay: i*0.2 },
                }));
            } else {
            animation.start({ 
                x: 0,
                opacity: 0,
                translateX: -50,
                translateY: -50, 
            })
        }
    }, [inView, animation])


    return (

        <section
            className=" absolute overflow-hidden lg:left-16 " style={{ top: `${t}rem` }}>
            <div className="container px-5 py-24 mx-auto">
                <div ref={ref} className="text-center mb-20">
                    <motion.div
                        animate={animation}>
                        <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-100 mb-4">Portfolios for undergraduates</h1>
                        <p className="text-gray-100 text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Pre-Designed themes and templates for you to showcase you abilities and get a high paying job. Be free from coding your portfolios instead invest time in making it strong through projects and skills.</p>
                    </motion.div>
                </div>
                <div ref={ref} className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                    <motion.li
                        className='list-none sm:w-1/2 w-full'
                        custom={1}
                        animate={animation}
                    >
                        <div className="p-2">
                            <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokellinejoin="round" strokeWidth="3" className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span className="title-font font-medium">No Coding</span>
                            </div>
                        </div>
                    </motion.li>
                    <motion.li 
                        className='list-none sm:w-1/2 w-full'
                        custom={2}
                        animate={animation}
                    >
                    <div className="p-2 ">
                        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokellinejoin="round" strokeWidth="3" className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                <path d="M22 4L12 14.01l-3-3"></path>
                            </svg>
                            <span className="title-font font-medium">Time Efficient</span>
                        </div>
                    </div>
                    </motion.li>
                    <motion.li
                    className='list-none sm:w-1/2 w-full'
                    custom={3}
                    animate={animation}
                    >
                        <div className="p-2">
                            <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokellinejoin="round" strokeWidth="3" className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span className="title-font font-medium">Hundreds of theme</span>
                            </div>
                        </div>
                    </motion.li>
                    <motion.li
                    className='list-none sm:w-1/2 w-full'
                    custom={4}
                    animate={animation}
                    >
                        <div className="p-2">
                            <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokellinejoin="round" strokeWidth="3" className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span className="title-font font-medium">No Fees</span>
                            </div>
                        </div>
                    </motion.li>
                    <motion.li
                    className='list-none sm:w-1/2 w-full'
                    custom={5}
                    animate={animation}
                    >
                        <div className="p-2">
                            <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokellinejoin="round" strokeWidth="3" className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span className="title-font font-medium">No need to look at the job portals</span>
                            </div>
                        </div>
                    </motion.li>
                    <motion.li
                    className='list-none sm:w-1/2 w-full'
                    custom={6}
                    animate={animation}
                    >
                        <div className="p-2">
                            <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokellinejoin="round" strokeWidth="3" className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span className="title-font font-medium">No need to purchase domains</span>
                            </div>
                        </div>
                    </motion.li>
                </div>
                <motion.li
                    className='list-none'
                    custom={7}
                    animate={animation}
                >
                    <Link href="Auth/Login">
                        <button className={`${style.signUpButton} border-2 border-yellow-500 flex mx-auto mt-16 py-2 px-8 focus:outline-none hover:underline`}>Sign Up!</button>
                    </Link>
                </motion.li>
            </div>
        </section>
    )
}

export default Features