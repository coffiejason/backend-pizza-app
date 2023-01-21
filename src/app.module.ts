import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controllers/orders.controller';
import { Order } from './models/order.model';
import { DbConfigService } from './config/db.config.service'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService
    }),
    TypeOrmModule.forFeature([Order]),
    ConfigModule.forRoot({envFilePath: '.env',})
  ],
  controllers: [OrdersController],
  providers: [],
})
export class AppModule {}