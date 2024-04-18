import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, RmqOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { RmqService } from './rmq/rmq.service';

export const client1:MicroserviceOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: `consumer-orders`,
      brokers: ['kafka-0:9092','kafka-1:9092'],
    },
    consumer: {
      groupId: 'consumer-orders',
    },
    run:{
      autoCommit:false,
      // autoCommitInterval:6000
    }
  },
};

async function bootstrap() {
  const appTcp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    client1
    
  );
  // const rmqService = appTcp.get<RmqService>(RmqService);
  // const appRmq = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   rmqService.getOptions('order_queue')
  // );





  await appTcp.listen();

  const httpApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
        transport: Transport.TCP,
        options: {
          host: 'order-service',
          port: 6000,
        },
  });

 // Запускаем веб-приложение для HTTP
 httpApp.listen();


  // await appRmq.listen();
}
bootstrap();
