export type TClient = {
    id: number;
    status: string;
    name: string;
    startDate: string;
    balance: string;
    offers: number | TOffers[];
    payment_terms?: TTerms[];
    manager: string;
};

export type TOrder = {
    title: string;
    id: string;
};

export type TMethod = {
    title: string;
    id: string;
}

export type TOffers = {
    order: TOrder;
    sources: string;
    spend: string;
    profit: string;
    status: string;
};

export type TTerms = {
    payment_method: TMethod;
    exchange_extras: string;
    vat: string;
    start_date: string;
    status: string;
}

export type TDataProfile = {
    title: string;
    buttonTitle: string;
}

export type TSwitch = {
    active: 'arrow' | 'home' | string,
    click: () => void;
}