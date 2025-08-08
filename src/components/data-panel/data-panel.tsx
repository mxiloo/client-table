import { useState } from 'react';
import Table from '../table/table';
import styles from './data-panel.module.scss';


function DataPanel({ title, buttonTitle, table, columnFilters, setColumnFilters, active }: any) {

    const [open, setOpen] = useState<boolean>(false);
    const findRowByTitle = columnFilters.find(f => f.id === (active === "offers" ? "orderTitle" : "termsTitle"))?.value || "";
  
    const onFilterChange = (id: string, value: string) => {
      setColumnFilters(prev => {
        const filtered = prev.filter(f => f.id !== id);
        if (value) {
          return [...filtered, { id, value }];
        }
        return filtered;
      });
    };

    const onClose = (value: string) => {
        setOpen(false);
        onFilterChange("status", value)
    };

    return (
      <section className={styles.dataPanel}>
        <div className={styles.box}>
          <h3>{title}</h3>
          <div className={styles.container}>
            <button className={styles.button}>
              {buttonTitle}
              <span className={styles.addLogo}>+</span>
            </button>
            <div className={styles.actions}>
              <input
                className={styles.input}
                type="text"
                placeholder={`Search ${title.toLowerCase()}`}
                value={findRowByTitle}
                onChange={(e) => onFilterChange(active === "offers" ? "orderTitle" : "termsTitle", e.target.value)}
              />
              <div className={styles.container}>
                <div className={styles.dropdown} onClick={() => setOpen(!open)}>
                    <span className={styles.dropdownText}>Search</span>
                    <span className={styles.dropdownText}>&#8744;</span> 
                    </div> 
                    {open && (
                        <div className={styles.dropdownContent}>
                            <button className={styles.contentStatus} onClick={() => onClose("active")}>
                                Active
                            </button>
                            <button className={styles.contentStatus} onClick={() => onClose("disabled")}>
                                Disabled
                            </button>
                            <button className={styles.contentStatus} onClick={() => onClose("")}>
                                Clear
                            </button>
                        </div>
                    )}
                </div>
              </div>
          </div>
        </div>
        <div className={styles.tablePanel}>
          <Table isDisabled={true} table={table} />
        </div>
      </section>
    );
  }
  

export default DataPanel;