import React from 'react'
import { useRouter } from 'next/router'
import styles from "./NotFound.module.css"

const NotFound = () => {
  
  const router = useRouter();

  return (
    <section className={styles.page_404}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className={styles.four_zero_four_bg}>
                <h1 className="text-center ">404</h1>


              </div>

              <div className={styles.contant_box_404}>
                <h3 className="h2">
                  Look like youre lost
                </h3>

                <p>the page you are looking for not avaible!</p>

                <div onClick={() => router.push("/")} className={styles.link_404}>Go to Home</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFound