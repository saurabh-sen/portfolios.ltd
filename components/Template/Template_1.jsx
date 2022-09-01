import Image from 'next/image'
import { React, useEffect, useState } from 'react'
import styles from './Template_1.module.css'
import hero from '../../public/img/hero.png'
import port1 from '../../public/img/port1.jpg'
import { getDatabase, ref, child, get } from "../../firebase"
import { getStorage, ref as reference, getDownloadURL, listAll } from "firebase/storage";
import Link from 'next/link'
import NotFound from "../NotFound/NotFound"


const Template_1 = ({ slug }) => {

    const [dbData, setDbData] = useState([]);

    const [imageUri, setImageUri] = useState("");

    const [notFound, setNotFound] = useState(false);

    const [Uid, setUid] = useState("");
    useEffect(() => {

        const dbRef = ref(getDatabase());
        get(child(dbRef, `/domain_details/${slug}/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setUid(snapshot.val().UUid);
                // const storage = getStorage();

                const storageRef = reference(
                    getStorage(),
                    `/${Uid}/${slug}/`
                );

                var count = 1;
                listAll(storageRef)
                    .then((res) => {
                        res.items.forEach((item) => {
                            getDownloadURL(item)
                                .then((url) => {
                                    if (count <= 1) {
                                        count += 1;
                                        setImageUri(url);
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                // getDownloadURL(ref(storage, `/${Uid}/${slug}/`))
                // .then((url) => {
                //     console.log(url)
                // });
            }
        }).catch((error) => {
            setNotFound(true);
            console.error(error);
        });

        get(child(dbRef, `users/${Uid}/${slug}/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const array = Object.values(snapshot.val());
                setDbData(array);
            }
            //else {
            //     setTimeout(() => {

            //         if(!snapshot.exists())setNotFound(true);
            //     }, 3000);
            // }
        }).catch((error) => {
            console.error(error);
        });

    }, [slug, Uid]);

    const extlink = !dbData[11] ? "" : dbData[11];

    return (
        <>
            {
                notFound ? <NotFound /> :
                    <div className={styles.main_content}>
                        {dbData === [] ? "" :

                            <div>
                                <header className={`${styles["section"]} ${styles["header"]} ${styles["active"]}`} id="home">
                                    <div className={styles.header_content}>
                                        <div className={styles.left_header}>
                                            <div className={styles.h_shape}></div>
                                            <div className={styles.image}>
                                                <Image layout='fill' className={styles.heroImage} src={ imageUri === "" ? hero : imageUri } alt="" />
                                            </div>
                                        </div>
                                        <div className={styles.right_header}>
                                            <h1 className={styles.name}>
                                                Hi, I&apos;m <span>{dbData[7] + " "}</span>
                                                {/* A Web Developer. */}
                                            </h1>
                                            <p>
                                                {dbData[0]}
                                            </p>
                                            <div className={`${styles["anchorTag"]} ${styles["main_btn"]} ${styles["btn_con"]} cursor-pointer `}>
                                                <Link href={extlink} passHref={true} className={`${styles["anchorTag"]} ${styles["main_btn"]}`}>
                                                    <span className={styles.btn_text}>Download CV</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </header>
                                <main>
                                    <section className={`${styles["aboutsection"]} ${styles["sec2"]} ${styles["about"]}`} id="about">
                                        <div className={styles.main_title}>
                                            <h2>About <span>me</span><span className={styles.bg_text}>my stats</span></h2>
                                        </div>
                                        <div className={styles.about_container}>
                                            <div className={styles.left_about}>
                                                <h4>Information About me</h4>
                                                <p>
                                                    {dbData[0]}
                                                </p>
                                                <div className={`${styles["anchorTag"]} ${styles["main_btn"]} ${styles["btn_con"]} cursor-pointer w-max `}>
                                                    <Link href={extlink} passHref={true} className={`${styles["anchorTag"]} ${styles["main_btn"]}  `}>
                                                        <span className={styles.btn_text}>Download CV</span>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className={styles.right_about}>
                                                <div className={styles.about_item}>
                                                    <div className={styles.abt_text}>
                                                        <p className={styles.large_text}>{`${dbData[9]}+`}</p>
                                                        <p className={styles.small_text}>Projects <br /> Completed</p>
                                                    </div>
                                                </div>
                                                <div className={styles.about_item}>
                                                    <div className={styles.abt_text}>
                                                        <p className={styles.large_text}>{`${dbData[4]}+`}</p>
                                                        <p className={styles.small_text}>Years of <br /> experience</p>
                                                    </div>
                                                </div>
                                                <div className={styles.about_item}>
                                                    <div className={styles.abt_text}>
                                                        <p className={styles.large_text}>{`${dbData[2]}+`}</p>
                                                        <p className={styles.small_text}>Happy <br /> Clients</p>
                                                    </div>
                                                </div>
                                                <div className={styles.about_item}>
                                                    <div className={styles.abt_text}>
                                                        <p className={styles.large_text}>{`${dbData[15]}+`}</p>
                                                        <p className={styles.small_text}>Github <br /> stars</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.about_stats}>
                                            <h4 className={styles.stat_title}>My Skills</h4>

                                            {/* skills map */}
                                            {
                                                !dbData[13] ? "" : dbData[13].map((data, index) => {
                                                    return (
                                                        <div key={index} className={styles.progress_bars}>
                                                            <div className={styles.progress_bar}>
                                                                <p className={styles.prog_title}>{data.skill}</p>
                                                                <div className={styles.progress_con}>
                                                                    <p className={styles.prog_text}>{data.percentage}</p>
                                                                    <div className={styles.progress}>
                                                                        <span className={`${data.percentage >= 0 && data.percentage <= 35 ? "w-1/3" : data.percentage >= 36 && data.percentage <= 65 ? "w-8/12" : data.percentage >= 66 && data.percentage <= 100 ? "w-4/5" : ""}`}></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                })
                                            }
                                            {/* skills map end */}

                                        </div>
                                    </section>
                                    <section className={`${styles["portfoliosection"]}`} id="portfolio">
                                        <div className={styles.main_title}>
                                            <h2>My <span>Portfolio</span><span className={styles.bg_text}>My Work</span></h2>
                                        </div>
                                        <p className={styles.port_text}>
                                            Here is some of my work that I&apos;ve done in various programming languages.
                                        </p>

                                        {/* project map */}
                                        <div className={styles.portfolios}>
                                            {
                                                !dbData[10] ? "" : dbData[10].map((data, index) => {
                                                    return (
                                                        <div key={index} className={styles.portfolio_item}>
                                                            <div className={styles.image}>
                                                                <Image layout='fill' style={{ borderRadius: "15px" }} src={port1} alt="" />
                                                            </div>
                                                            <div className={styles.hover_items}>
                                                                <h3>{data.projectName}</h3>
                                                                <div className={styles.icons}>
                                                                    <Link href={!dbData[5] ? "" : data.githubLink} passHref={true} className={`${styles["anchorTag"]} ${styles["icon"]}`} target="_blank">
                                                                        <svg style={{ width: "50px", padding: "8px 12px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                        {/* project map end */}
                                    </section>
                                    <section className={`${styles["contactsection"]} ${styles["contact"]}`} id="contact">
                                        <div className={styles.contact_container}>
                                            <div className={styles.main_title}>
                                                <h2>Contact <span>Me</span><span className={styles.bg_text}>Contact</span></h2>
                                            </div>
                                            <div className={styles.contact_content_con}>
                                                <div className={styles.left_contact}>
                                                    <h4>Contact me here</h4>
                                                    <p>
                                                        Want to talk ? or hire me, or build a project together ?
                                                    </p>
                                                    <div className={styles.contact_info}>
                                                        <div className={styles.contact_item}>
                                                            <div className={styles.icon}>
                                                                <svg style={{ width: "20px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" /></svg>
                                                                <span>Location</span>
                                                            </div>
                                                            <p>
                                                                : {dbData[1]}
                                                            </p>
                                                        </div>
                                                        <div className={styles.contact_item}>
                                                            <div className={styles.icon}>
                                                                <svg style={{ width: "20px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z" /></svg>
                                                                <span>Email</span>
                                                            </div>
                                                            <p>
                                                                <span>: {dbData[14]}</span>
                                                            </p>
                                                        </div>
                                                        <div className={styles.contact_item}>
                                                            <div className={styles.icon}>
                                                                <svg style={{ width: "20px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M45.63 79.75L52 81.25v58.5C45 143.9 40 151.3 40 160c0 8.375 4.625 15.38 11.12 19.75L35.5 242C33.75 248.9 37.63 256 43.13 256h41.75c5.5 0 9.375-7.125 7.625-13.1L76.88 179.8C83.38 175.4 88 168.4 88 160c0-8.75-5-16.12-12-20.25V87.13L128 99.63l.001 60.37c0 70.75 57.25 128 128 128s127.1-57.25 127.1-128L384 99.62l82.25-19.87c18.25-4.375 18.25-27 0-31.5l-190.4-46c-13-3-26.62-3-39.63 0l-190.6 46C27.5 52.63 27.5 75.38 45.63 79.75zM359.2 312.8l-103.2 103.2l-103.2-103.2c-69.93 22.3-120.8 87.2-120.8 164.5C32 496.5 47.53 512 66.67 512h378.7C464.5 512 480 496.5 480 477.3C480 400 429.1 335.1 359.2 312.8z" /></svg>
                                                                <span>Education</span>
                                                            </div>
                                                            <p>
                                                                <span>: {dbData[12]}</span>
                                                            </p>
                                                        </div>
                                                        <div className={styles.contact_item}>
                                                            <div className={styles.icon}>
                                                                <svg style={{ width: "20px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" /></svg>
                                                                <span>Mobile Number</span>
                                                            </div>
                                                            <p>
                                                                <span>: {dbData[8]}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className={styles.contact_icons}>
                                                        <div className={styles.contact_icon}>
                                                            <Link href={!dbData[6] ? "" : dbData[6]} passHref={true} className={styles.anchorTag} target="_blank">
                                                                <svg style={{ width: "50px", padding: "8px 12px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" /></svg>
                                                            </Link>
                                                            <Link href={!dbData[5] ? "" : dbData[5]} passHref={true} className={styles.anchorTag} target="_blank">
                                                                <svg style={{ width: "50px", padding: "8px 12px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </main>
                            </div>
                        }
                    </div>
            }
        </>
    )
}

export default Template_1