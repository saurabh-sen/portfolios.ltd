import { React, useEffect, useState } from 'react'
import BlankPortfolioComponent from './BlankPortfolioComponent'
import PortfolioCard from './PortfolioCard'

import { getDatabase, ref, onValue } from "firebase/database";


const PortfoliosComponent = () => {

  const [Uuid, setUuid] = useState(null);
  const [dbDataArray, setDbDataArray] = useState([]);

  useEffect(() => {
    let uUid = getCookie("userUid");
    if (uUid != "") {
      setUuid(uUid);
      const db = getDatabase();
      const dbData = ref(db, 'users/' + Uuid);
      onValue(dbData, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const array = Object.values(data);
          // console.table(array);
          setDbDataArray(array);
        }
      });
    }
  }, [Uuid]);

  function getCookie(cUid) {
    let name = cUid + "=";
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

  const portfolios = dbDataArray.map((data, index) => {
    return (
      <PortfolioCard key={index} domainName={data.UDomainName} />
    );
  })

  return (
    <div className=' max-w-max flex flex-wrap justify-evenly'>
      {/* // TODO:- SHOW BLANK COMPONENT WHEN NO ITEM TO SHOW ELSE SHOW OTHER ITEMS + BLANK COMPONENT  */}
      <BlankPortfolioComponent Uuid={Uuid} />

      {/* map through the data and show the component */}
      {portfolios}
    </div>
  )
}

export default PortfoliosComponent