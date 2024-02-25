import { DynamicModule, Module } from "@nestjs/common";
import { RmqService } from "./rmq.service";
import { ClientsModule } from "@nestjs/microservices";

interface RmqModuleOptions{
    name:string
}

@Module({
    providers:[RmqService],
    exports:[RmqService]
})

export class RmqModule{
    // static register({name}:RmqModuleOptions):DynamicModule{
    //     return {
    //         module:RmqModule,
    //         imports:[
    //             ClientsModule.
    //         ]
    //     }
    // }
}