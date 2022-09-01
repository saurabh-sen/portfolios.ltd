import React from 'react';
import styles from './NavBar.module.css'
import Link from 'next/link';


const NavBar = () => {
    return (
        <header style={{
            width: "99%",
            position: "absolute",
            top: "0%",
            left: "0%",
            zIndex: "2",
        }}

            className="text-white flex body-font">
            <div className="max-w-7xl m-auto flex flex-wrap flex-1 flex-col md:flex-row items-center">
                <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                    <a className={styles.navbar_links}>Create</a>
                    <a className={styles.navbar_links}>Awesome</a>
                    <a className={styles.navbar_links}>Portfolio</a>
                </nav>
                <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-white lg:items-center lg:justify-center mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="bg-yellow-500 w-10 h-10 text-white p-2 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl py-5 px-3 my-5">PORTFOLIO.LTD</span>
                </a>
                <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0 py-5 px-3 my-5">
                    <Link href="/Auth/Login" >
                        <button className={styles.navbar_links}>Get In
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default NavBar