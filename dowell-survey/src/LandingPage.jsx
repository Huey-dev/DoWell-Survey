import { Link } from "react-router-dom"

import styles from "./LandingPage.module.css"

const LandingPage = () => {
  return (
    <main className={styles.container}>
        <div className={styles.header}>
            <h1>Get feedback from your desired location</h1>
        </div>
        <div className={styles.line}></div>
        <div className={styles.questionaire}>
            <h2 className={styles.question}>Questionaira</h2>
            <p className={styles.Link}>Link your own using Google forms, <br /> HTML or any other link</p>
        </div>
        <div className={styles.line}></div>
        {/* report */}
        <h3 className={styles.report}>Access Report</h3>
        <div  className={styles.buttons}>
          <Link to="/preview-page" smooth="true" duration={500}>
        <button  className={styles.preview}>Preview</button>

          </Link>
        <button  className={styles.create}>Create My own Survey</button>
        </div>

    </main>
  )
}

export default LandingPage
