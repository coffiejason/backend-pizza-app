import { Controller, Get, Post, Body, Param, Res, NotFoundException } from '@nestjs/common';
import { Order } from '../models/order.model';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('orders')
export class OrdersController {
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


    @Post()
    async createOrder(@Body() order: Order | Order[], @Res() res) {
        if (!Array.isArray(order)) {
            order = [order];
        }
        for (const singleOrder of order) {
            // Prepare the dough
            await new Promise(resolve => setTimeout(resolve, this.doughTime));
            singleOrder.doughTime = this.doughTime;
            singleOrder.orderNumber = ""+Math.floor((Math.random() * 10000000000) + 1);
            this.ordersRepository.save(singleOrder);

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
        res.status(201).json({ id: order.map(o => o.orderNumber) });

    }



    @Get()
    async getOrders() {
        return this.ordersRepository.find();
    }

    @Get('/:orderNumber')
    async getOrderById(@Param('orderNumber') orderNumber: number) {
        const order = await this.ordersRepository.findOneBy({ "orderNumber": orderNumber });
        if (!order) throw new NotFoundException("No Order found");
        return order;
    }
    @Get('/:orderNumber/report')
    async getReportById(@Param('orderNumber') orderNumber: number) {
        const order = await this.ordersRepository.findOneBy({ orderNumber: orderNumber });
        if (!order) throw new NotFoundException("No ID found");
        return {
            doughTime: order.doughTime,
            toppingTime: order.toppingTime,
            ovenTime: order.ovenTime,
            walkingDistance: order.walkingDistance,
            totalTime: order.totalTime
        };
    }

    @Get('report')
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



//     constructor(
//         @InjectRepository(Order)
//         private ordersRepository: MongoRepository<Order>,
//     ) {}

//     @Post()
//     async createOrder(@Body() order: Order) {
//         // Prepare the dough
//         await new Promise(resolve => setTimeout(resolve, this.doughTime));
//         order.doughTime = this.doughTime;

//         // Add toppings
//         const toppingTime = order.toppings.length * this.toppingTime / this.toppingChefs;
//         await new Promise(resolve => setTimeout(resolve, toppingTime));
//         order.toppingTime = toppingTime;

//         // Cook in oven
//         await new Promise(resolve => setTimeout(resolve, this.ovenTime));
//         order.ovenTime = this.ovenTime;

//         // Serve to customer
//         await new Promise(resolve => setTimeout(resolve, this.walkingDistance));
//         order.walkingDistance = this.walkingDistance;
//         order.totalTime = this.doughTime + toppingTime + this.ovenTime + this.walkingDistance;
//         order.status = 'served';
//         this.ordersRepository.save(order);
//     }

//     @Get()
//     async getOrders() {
//         return this.ordersRepository.find();
//     }

//     @Get('report')
//     async getReport() {
//         const orders = await this.ordersRepository.find();
//         let totalPreparationTime = 0;
//         for (const order of orders) {
//             totalPreparationTime += order.totalTime;
//         }
//         return {
//             totalPreparationTime,
//             orders,
//         };
//     }
// }
