import styles from './info.module.scss'


function Info() {
    return (
        <section className={styles.section}>
            <h2 className={styles.titleMain}>CLICK BAZA</h2>
            <div className={styles.line}></div>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <span className={styles.text}>Account manager</span>
                    <span className={styles.textInfo}>Sergei</span>
                </li>
                <li className={styles.item}>     
                    <span className={styles.text}>Sales manager</span>
                    <span className={styles.textInfo}>Sergei</span>
                </li>
                <li className={styles.item}>
                    <span className={styles.text}>Start date</span>
                    <span className={styles.textInfo}>14.03.2025</span>
                </li>
                <li className={styles.item}>
                    <span className={styles.text}>Status</span>
                    <span className={styles.textStatus}>ACTIVE</span>
                </li>
            </ul>
            <div className={styles.line}></div>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <span className={styles.text}>Type of client</span>
                    <span className={styles.textInfo}>Webmaster</span>
                </li>
                <li className={styles.item}>
                    <span className={styles.text}>Experience</span>
                    <span className={styles.textInfo}>Noob</span>       
                </li>
                <li className={styles.item}>
                    <span className={styles.text}>Monthly budgets</span>
                    <span className={styles.textInfo}>1000$ - 5000$</span>     
                </li>
            </ul>
            <div className={styles.line}></div>
            <h2 className={styles.title}>BALANCE</h2>
            <h3 className={styles.h3}>50 345.00 USD</h3>
            <h3 className={styles.h3}>140 345.00 RUB</h3>

            <h2 className={styles.title}>LOANS</h2>
            <h3 className={styles.total}>140 345.00 RUB</h3>
            <div className={styles.line}></div>
            <div className={styles.container}>
                <button className={styles.archive}>Archive</button>
                <button className={styles.edit}>Edit</button>
            </div>
        </section>
    )
}

export default Info;