import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { Order } from './models/order.model';
import { DbConfigService } from './config/db.config.service'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DbConfigService,
    }),
    TypeOrmModule.forFeature([Order])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class AppModule {}
