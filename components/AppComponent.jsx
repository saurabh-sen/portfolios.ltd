import { React, useState, useEffect } from 'react'
import Features from './Features/Features'
import Footer from './Footer/Footer'
import Home from './MainPage/Home'
import HomeBackground from './Background/HomeBackground'
import NavBar from './NavBar/NavBar'
import { useRouter } from 'next/router'

//  TODO modal and deploy;

const AppComponent = () => {

  const router = useRouter();

  const [widthh, setWidth] = useState(0);
  
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  
  var t = 63;
  if (widthh >= 1024) t = 68;
  if (widthh >= 1280) t = 50;
  
  var tFooter = 130;
  
  if (widthh >= 640) tFooter = 110;
  if (widthh >= 1280) tFooter = 95;

  return (

    <>
      <HomeBackground />
      <NavBar />
      <Home />
      <Features t={t} />
      <Footer t={tFooter} />
    </>
  )
}

export default AppComponent