import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../models/order.model';
import { MongoRepository } from 'typeorm';

@Injectable()
export class OrdersService {
    private doughChefs = 2;
    private toppingChefs = 3;
    private oven = 1;
    private waiters = 2;
    private doughTime = 7;
    private toppingTime = 4;
    private ovenTime = 10;
    private walkingDistance = 5;

    constructor(
        @InjectRepository(Order)
        private ordersRepository: MongoRepository<Order>,
    ) { }

    async placeOrder(order: Order | Order[]){
        if (!Array.isArray(order)) {
            order = [order];
        }
        for (const singleOrder of order) {
            singleOrder.orderNumber = "" + Math.floor((Math.random() * 10000000000) + 1);
            singleOrder.status = 'preparing';
            await this.ordersRepository.save(singleOrder);
        }
        this.createOrder(order);

        return order;
    }

    async createOrder(order: Order | Order[]) {

        console.log('creating order')

        if (!Array.isArray(order)) {
            order = [order];
        }
        for (const singleOrder of order) {
            // Prepare the dough
            await new Promise(resolve => setTimeout(resolve, this.doughTime));
            singleOrder.doughTime = this.doughTime;
            //singleOrder.orderNumber = "" + Math.floor((Math.random() * 10000000000) + 1);

            // Add toppings
            const toppingTime = singleOrder.toppings.length * this.toppingTime / this.toppingChefs;
            await new Promise(resolve => setTimeout(resolve, toppingTime));
            singleOrder.toppingTime = toppingTime;
            await this.ordersRepository.findOneAndUpdate({ orderNumber: singleOrder.orderNumber }, { $set: { toppingTime: singleOrder.toppingTime } });

            // Cook in oven
            await new Promise(resolve => setTimeout(resolve, this.ovenTime));
            singleOrder.ovenTime = this.ovenTime;
            await this.ordersRepository.findOneAndUpdate({ orderNumber: singleOrder.orderNumber }, { $set: { ovenTime: singleOrder.ovenTime } });

            // Serve to customer
            await new Promise(resolve => setTimeout(resolve, this.walkingDistance));
            singleOrder.walkingDistance = this.walkingDistance;
            singleOrder.totalTime = this.doughTime + toppingTime + this.ovenTime + this.walkingDistance;
            singleOrder.status = 'served';
            await this.ordersRepository.findOneAndUpdate({ orderNumber: singleOrder.orderNumber }, { $set: { status: singleOrder.status, walkingDistance: singleOrder.walkingDistance, totalTime: singleOrder.totalTime } });
        }
        return order;
    }

    async getOrders() {
        return this.ordersRepository.find();
    }

    async getOrderById(id: number) {
        return this.ordersRepository.findOneBy({ where: { orderNumber: id } });
    }

    async getReport() {
        const orders = await this.ordersRepository.find();
        let totalPreparationTime = 0;
        for (const order of orders) {
            totalPreparationTime += order.totalTime;
        }
        return {
            totalPreparationTime,
            orders,
        };
    }
}