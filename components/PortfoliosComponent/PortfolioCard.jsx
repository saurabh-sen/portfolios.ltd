import React from 'react'
import { useRouter } from 'next/router'

const PortfolioCard = ({ domainName }) => {

    const router = useRouter();

    return (
        <>
            <div className="hover:bg-[#fff056ba] bg-[#6c82858f] rounded-2xl w-60 h-60 mx-16 my-8 flex justify-center flex-col items-center text-white cursor-pointer "
                style={{
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(5.9px)",
                    WebkitBackdropFilter: "blur(5.9px)",
                    border: "1px solid rgba(255, 255, 255, 0.11)",
                }}
                onClick={()=> router.push(`/${domainName}`)}
            >

            {domainName}
            <p>{`https://portfolios-ltd.vercel.app/${domainName}`}</p>

        </div>
        </>
    )
}

export default PortfolioCard