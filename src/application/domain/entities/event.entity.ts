import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @Column()
    price: number;

    @OneToMany(() => Order, order => order.event)
    orders: Order[]

    @Column()
    show_date: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}