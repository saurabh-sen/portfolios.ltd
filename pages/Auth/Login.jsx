import { React, useState, useEffect } from 'react'
import styles from './Login.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { async } from '@firebase/util'

const Login = () => {

  const [showAlert, setShowAlert] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let user = getCookie("userEmail");
    if (user != "") {
      router.push("../Dashboard/YourProfile");
    }
  }, [router]);

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


  const handleSubmit = async (event) => {

    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    var email = event.target.email.value;
    var password = event.target.password.value;
    let mailformat = new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
    // let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    if (mediumPassword.test(password) && mailformat.test(email)) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          // document.getElementById("myForm").reset();
          const user = userCredential.user;
          // setCookie("UserEmail", user.email, "UserAuthUid", user.uid, 1);
          let Authuser = user.email;
          if (user != "" && user != null) {
            setCookie("userEmail", Authuser, "userUid", user.uid, 0.5);
          }
          // console.log(user);
          setShowAlert(true);
          setTimeout(() => {
            router.push("../Dashboard/YourProfile");
          }, 3000);
          // ...
        })
        .catch((error) => {
          setShowDangerAlert(true);
          // console.log(error)
          // const errorCode = error.code;
          // const errorMessage = error.message;
        });
    }

  };

  const setCookie = (cname, cvalue, cUid, cUidValue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    document.cookie = cUid + "=" + cUidValue + ";" + expires + ";path=/";
  }


  return (
    <div className={`${styles.LoginContainer} flex justify-center`}>
      <div className={styles.box_form}>
        <div className={styles.left}>
          <div className={styles.overlay}>
            <h1>Hello World.</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              et est sed felis aliquet sollicitudin
            </p>
            <p className={styles.socialMediaLogin}>login with social media</p>
            <div className='flex'>
              <a href="#">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>Login with Facebook
              </a>
              <a href="#"
              >
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>Login with Twitter
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.right}>
          <h5>Login</h5>
          <p>Dont have an account? <Link href="./Register">Create Your Account</Link> it takes
            less than a minute
          </p>
          <div className={styles.inputs}>
            <input required title="Enter a valid email address" type="text" id='email' name='email' placeholder="user email" />
            <br />
            <input required title="Use a strong Password" type="password" id='password' name='password' placeholder="password" suggested="current-password" />
          </div>

          <br /><br />

          <div className={styles.remembermeforgetpassword}>
            <label className={styles.labelForInput}>
              <input type="checkbox" />
              <span className={styles.text_checkbox}>Remember me</span>
            </label>
            <p>forget password?</p>
          </div>

          <br />
          {showAlert ? (
            <div
              className="flex items-center text-green-700 px-6 py-4 border-0 rounded-lg w-full relative mb-4 bg-green-100"
            >
              <span className="text-xl inline-block mr-5 align-middle">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                </svg>
              </span>
              <span className="inline-block align-middle mr-8">
                <strong className="mr-1">Logging In! </strong> You will be redirected automatically.
              </span>
              <button
                className=" bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none"
                onClick={() => setShowAlert(false)}
              >
                <span>×</span>
              </button>
            </div>
          ) : null}
          {showDangerAlert ? (
            <div
              className="flex items-center text-red-700 px-6 py-4 border-0 rounded-lg w-full relative mb-4 bg-red-100"
            >
              <span className="text-xl inline-block mr-5 align-middle">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                </svg>
              </span>
              <span className="inline-block align-middle mr-8">
                <strong className="mr-1">Err Something Bad Happened! </strong> Try after sometimes.
              </span>
              <button
                className=" bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none"
                onClick={() => setShowDangerAlert(false)}
              >
                <span>×</span>
              </button>
            </div>
          ) : null}
          <button className={styles.buttonSignUp} type='submit'>Lets do this</button>
        </form>
      </div>
    </div>
  )
}

export default Login