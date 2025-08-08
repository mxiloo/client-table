import { memo, useCallback, useMemo, useState } from "react";
import Info from "../info/info";
import Switcher from "../switcher/switcher";
import styles from "./panel.module.scss";
import stylesActions from "../menu/menu.module.scss";
import DataPanel from "../data-panel/data-panel";
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { TOffers } from "../../types/types";

function Panel({ clientData }: any) {
  const clientOffers = clientData?.offers ?? [];
  const clientTerms = clientData?.payment_terms ?? [];

  const [active, setActive] = useState<"offers" | "terms">("offers");
  const [columnFilters, setColumnFilters] = useState([]);

  const click = useCallback((value: "offers" | "terms") => {
    setActive(value);
  }, []);

  const { title, buttonTitle } = useMemo(() => ({
    title: active === "offers" ? "Offers" : "Payment terms",
    buttonTitle: active === "offers" ? "New Offer" : "New Terms",
  }), [active]);

  const columns = useMemo<ColumnDef<TOffers>[]>(() => [
    { header: "", accessorKey: "status" },
    {
      id: active === 'offers' ? "orderTitle" : "termsTitle",  // уникальный id колонки
      header: active === "offers" ? "Title" : "Payment method" ,
      accessorFn: row => active === "offers" ? row.order?.title ?? "" : row.payment_method?.title ?? "",
      cell: (info) => {
        const order =  info?.row?.original?.order;
        const terms = info?.row?.original?.payment_method;

        return (
          <div className={styles.firstCell}>
            <span className={styles.titleCell}>
              {active === 'offers' ? order?.title : terms?.title}
            </span>
            <span className={styles.orderId}>
              ID {active ==="offers" ? order?.id : terms?.id}
            </span>
          </div>
        );
      },
    },
    { header: active === "offers" ? "Sources" : "Exchange extras", accessorKey: active === "offers" ? "sources" : "exchange_extras" },
    { header: active === "offers" ? "Spend" : "VAT" , accessorKey: active === "offers" ? "spend" : "vat" },
    { header: active === "offers" ? "Profit" : "Start date" , accessorKey: active === "offers" ? "profit" : "start_date" },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: () => (
        <div className={stylesActions.actions}>
          <button className={stylesActions.eye}></button>
          <button className={stylesActions.edit}></button>
          <button className={stylesActions.trash}></button>
        </div>
      ),
    },
  ], [active]);

  const table = useReactTable({
    data: active === "offers" ? clientOffers : clientTerms,
    state:{
      columnFilters
    },
    columns,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

 

  return (
    <section className={styles.panel}>
      <Info />
      <Switcher status={active} click={click} />
      <DataPanel table={table} title={title} buttonTitle={buttonTitle} columnFilters={columnFilters} setColumnFilters={setColumnFilters} active={active}/>
    </section>
  );
}

export default memo(Panel);
