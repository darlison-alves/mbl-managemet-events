import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";
import { EventStatusEnum } from "../enums/event.status.enum";
import { Order } from "./order.entity";

@Entity({ name: "events" })
export default class Event extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ enum: EventStatusEnum })
    status: EventStatusEnum;

    @OneToMany(() => Order, order => order.event)
    orders: Order[]

    @Column()
    show_date: Date;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}