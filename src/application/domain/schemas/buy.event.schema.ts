import { object, string } from "yup";
import { IEventCreateDTO } from "../../ports/inbound/dtos/event.dto.interface";
import { PaymentMethodEnum } from "../enums/payment.method.enum";

export const buyEventSchema = object<IEventCreateDTO>({
    payment_method: string().oneOf([PaymentMethodEnum.BOL, PaymentMethodEnum.CREDIT, PaymentMethodEnum.DEBIT]).required(),
    card: object().when("payment_method", {
        is: PaymentMethodEnum.CREDIT,
        then: (schema) => schema.required()
    }).when("payment_method", {
        is: PaymentMethodEnum.DEBIT,
        then: (schema) => schema.required()
    }),
    customer: object({
        email: string().email().required(),
        document: string().required()
    })
});
