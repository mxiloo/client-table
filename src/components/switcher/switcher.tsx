import styles from './switcher.module.scss'
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import { ReactComponent as HomeIcon } from '../../images/home.svg';
import classNames from 'classnames';


type TSwitcher = {
    status: string,
    click: (active: string) => void,
}

function Switcher({status, click}: TSwitcher) {

    return (
        <section>
            <div className={styles.container}>
                <button onClick={() => click('offers')} className={classNames(styles.arrow, status === 'offers' ? styles.active : styles.disabled)}>
                    <ArrowIcon />
                </button>
                <button onClick={() => click('payment_tems')} className={classNames(styles.home, status === 'payment_tems' ? styles.active : styles.disabled)}>
                    <HomeIcon />
                </button>
            </div>
        </section>
    )
}

export default Switcher;