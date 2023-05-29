import { PaymentMethodEnum } from "../../../domain/enums/payment.method.enum";

export interface IBuyDTO {
    event_id: string;
    payment_method: PaymentMethodEnum;
    card?: ICard
    customer: ICustomer;
}

export interface ICard {
    holder: string;
    number: string;
    expiration: string;
    cvv: string;
}

export interface ICustomer {
    email: string;
    document: string;
}