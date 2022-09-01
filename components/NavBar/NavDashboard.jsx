import Image from 'next/image'
import React from 'react'
import styles from './NavDashboard.module.css'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import { async } from '@firebase/util'
import { useRouter } from 'next/router'

const NavDashboard = ({ email }) => {

    const router = useRouter()

    const OnSignOut = async () => {
        signOut(auth).then(() => {
            //SignOut!
            document.cookie = "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "userUid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            router.push("/");
        }).catch((error) => {
            console.log(error)
        });
    };

    let chars = 'abcdefghijklmnopqrstuvwxyz';

    // Pick characers randomly
    let name = '';
    for (let i = 0; i < 4; i++) {
        name += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    var myArray = [
        "male",
        "female"
    ];

    var gender = myArray[Math.floor(Math.random() * myArray.length)];
    const myLoader = ({ src }) => {
        return `https://avatars.dicebear.com/api/${gender}/${name}.svg`;
    }

    // let email = "sensaurabh1212@gmail.com"
    return (
        <header className="text-white flex body-font">
            <div className="max-w-7xl m-auto flex justify-between flex-wrap flex-1 flex-col md:flex-row items-center">
                <div className='py-3 px-2 mx-3 flex items-center'>
                    <Image unoptimized={myLoader} src={`https://avatars.dicebear.com/api/${gender}/${name}.svg`} alt='hello' width={30} height={30} className=" mr-3 rounded-full" />
                    <p>
                        Hi, {email}
                    </p>
                </div>
                <a className="flex order-first lg:order-none title-font font-medium items-center text-white lg:items-center lg:justify-center mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="bg-yellow-500 w-10 h-10 text-white p-2 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className={`${styles["comName"]}`} >PORTFOLIO.LTD</span>
                </a>
                <div className=" inline-flex lg:justify-end ml-5 lg:ml-0 py-5 px-3 my-5">
                    <button onClick={OnSignOut} className={styles.navbar_links}>Leave session
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default NavDashboard