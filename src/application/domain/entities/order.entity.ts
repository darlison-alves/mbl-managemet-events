import "reflect-metadata";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EventStatusEnum } from "../enums/event.status.enum";
import Event from "./event.entity";

@Entity()
export class Order {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => Event, event => event.orders)
    event: Event;

    @Column()
    description: string;

    @Column({ enum: EventStatusEnum })
    status: EventStatusEnum;

    @Column()
    show_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}