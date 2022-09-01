import {React, useState, useEffect} from 'react'

const HomeBackground = () => {
  const [widthhh, setWidth] = useState(0);
    useEffect(() => {
        setWidth(window.innerWidth);
    }, []);
    var h = 530;
    if (widthhh >= 640) h = 455;
    if (widthhh >= 1024) h = 380;
    if (widthhh >= 1280) h = 250;
  return (
    <div className=" " 
        style={{
          width: "100%",
          height: `${h}vh`,
          backgroundAttachment: "fixed",
          backgroundImage: `url(https://wallpapercave.com/wp/rusvwuE.jpg)`,
          // backgroundImage: "url(https://glowinthedarkness.com/wp-content/uploads/2020/10/Trippy-neon-animated-gif.gif)",
          overflow: "hidden",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "blur(12px)",
          WebkitFilter: "blur(12px)",
          MozFilter: "blur(12px)",
          OFilter: "blur(12px)",
          MsFilter: "blur(12px)",
          zIndex: "1",
        }}
      ></div>
  )
}

export default HomeBackground