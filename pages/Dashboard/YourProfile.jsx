import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import NavDashboard from '../../components/NavBar/NavDashboard'
import Footer from '../../components/Footer/Footer'
import PortfoliosComponent from '../../components/PortfoliosComponent/PortfoliosComponent'

const YourProfile = () => {

  const router = useRouter();
  
  const [showDashboard, setShowDashboard] = useState(null);
  
  useEffect(() => {
    let user = getCookie("userEmail");
    if (user != "") {
      setShowDashboard(user);
    } else {
      router.push("../Auth/Login");
    }
  }, [router]);

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
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

  return (
    <>
    {showDashboard ? 
      <div
        style={{
          background: "linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, rgb(11, 132, 145) 91.1%)",
        }}
        className=' bg-gray-500 h-auto'
      >
        <NavDashboard email={showDashboard} />
        <PortfoliosComponent />
        <Footer bottom={0} />
      </div>
      : 
      <p>no user</p>
      }
    </>
  )
}

export default YourProfile