import { TDataProfile } from '../../types/types';
import Table from '../table/table';
import styles from './offers-panel.module.scss';
import { FixedSizeList as List, VariableSizeList } from "react-window";




function OffersPanel({title, buttonTitle}: TDataProfile) {
    return (
        <section>
            <h3>{title}</h3>
            <div>
                <button>{buttonTitle}</button>
                <div>
                    <input/>
                    <div>HI</div>
                </div>
            </div>
            {/* <Table isDisabled={true} table={table}/> */}
        </section>
    )
}

export default OffersPanel;