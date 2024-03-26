import { Module } from '@nestjs/common';
import { PostModule } from './order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './ormconfig';
import { RmqModule } from './rmq/rmq.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot({}),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'./.development.env'
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:()=>dataSource.options
    }),
    PostModule,
    RmqModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
