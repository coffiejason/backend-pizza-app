import { Entity, PrimaryGeneratedColumn,ObjectIdColumn,ObjectID, Column } from 'typeorm';

@Entity()
export class Order {
    @ObjectIdColumn()
    id: ObjectID;

    @PrimaryGeneratedColumn()
    orderNumber: string;

    @Column('simple-array')
    toppings: string[];

    @Column()
    doughTime: number;

    @Column()
    toppingTime: number;

    @Column()
    ovenTime: number;

    @Column()
    walkingDistance: number;

    @Column()
    totalTime: number;

    @Column()
    status: string;
}