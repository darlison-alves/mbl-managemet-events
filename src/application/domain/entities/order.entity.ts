import "reflect-metadata";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IBuyDTO } from "../../ports/inbound/dtos/buy.dto.interface";
import { OrderStatusEnum } from "../enums/order.status.enum";
import { PaymentMethodEnum } from "../enums/payment.method.enum";
import Event from "./event.entity";

@Entity("orders")
export class Order {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => Event, event => event.orders, { cascade: false })
    @JoinColumn({ name: "event_id" })
    event: Event;

    @Column()
    price: number;
    
    @Column({ enum: OrderStatusEnum })
    status: OrderStatusEnum;

    @Column({ enum: PaymentMethodEnum })
    payment_method: PaymentMethodEnum

    @Column()
    bank_slip_url: string;

    @Column()
    email: string;

    @Column()
    document: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    static of(event: Event, payload: IBuyDTO): Order {
        const order = new Order();
        order.price = event.price;
        order.event = event;
        order.payment_method = payload.payment_method
        order.email = payload.customer.email;
        order.document = payload.customer.document;
        order.status = OrderStatusEnum.PAID;
        return order
    }
}