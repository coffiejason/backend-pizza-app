import { Controller, Get, Post, Body, Param, Res, NotFoundException } from '@nestjs/common';
import { Order } from '../models/order.model';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    async createOrder(@Body() order: Order | Order[], @Res() res) {       
        const placedOrders = await this.ordersService.placeOrder(order);
        res.status(201).json({ id: placedOrders.map(o => o.orderNumber) });
    }

    @Get()
    async getOrders() {
        return this.ordersService.getOrders();
    }

    @Get('/:orderNumber')
    async getOrderById(@Param('orderNumber') orderNumber: number) {
        const order = await this.ordersService.getOrderById(orderNumber);
        if (!order) throw new NotFoundException("No Order found");
        return order;
    }
    
    @Get('/:orderNumber/report')
    async getReportById(@Param('orderNumber') orderNumber: number) {
        const order = await this.ordersService.getOrderById(orderNumber);
        if (!order) throw new NotFoundException("No ID found");
        return {
            doughTime: order.doughTime,
            toppingTime: order.toppingTime,
            ovenTime: order.ovenTime,
            walkingDistance: order.walkingDistance,
            totalTime: order.totalTime,
            status: order.status
        };
    }

    @Get('report')
    async getReport() {
        return this.ordersService.getReport();
    }

}