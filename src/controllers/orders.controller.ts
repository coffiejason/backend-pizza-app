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
    async createOrder(@Body() order: Order, @Res() res) {
        // Save order to database before processing
        const createdOrder = await this.ordersRepository.save(order);

        // Prepare the dough
        await new Promise(resolve => setTimeout(resolve, this.doughTime));
        createdOrder.doughTime = this.doughTime;
        await this.ordersRepository.save(createdOrder);

        // Add toppings
        const toppingTime = createdOrder.toppings.length * this.toppingTime / this.toppingChefs;
        await new Promise(resolve => setTimeout(resolve, toppingTime));
        createdOrder.toppingTime = toppingTime;
        await this.ordersRepository.save(createdOrder);

        // Cook in oven
        await new Promise(resolve => setTimeout(resolve, this.ovenTime));
        createdOrder.ovenTime = this.ovenTime;
        await this.ordersRepository.save(createdOrder);

        // Serve to customer
        await new Promise(resolve => setTimeout(resolve, this.walkingDistance));
        createdOrder.walkingDistance = this.walkingDistance;
        createdOrder.totalTime = this.doughTime + toppingTime + this.ovenTime + this.walkingDistance;
        createdOrder.status = 'served';
        await this.ordersRepository.save(createdOrder);
        res.status(201).json({ id: createdOrder.id });
    }

    @Get()
    async getOrders() {
        return this.ordersRepository.find();
    }

    @Get('/:id')
    async getOrderById(@Param('id') id: string) {
        const order = await this.ordersRepository.findOneBy({ id: id });
        if (!order) throw new NotFoundException();
        return order;
    }
    @Get('/:id/report')
    async getReportById(@Param('id') id: string) {
        const order = await this.ordersRepository.findOneBy({ id: id });
        if (!order) throw new NotFoundException();
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
