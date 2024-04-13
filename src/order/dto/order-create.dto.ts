import { IS_LENGTH, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength, isNumber } from "class-validator";

export class OrderCreateDto{

    @IsNumber()
    @IsOptional()
    id:number;


    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsString()
    description:string;   
    
    
    @IsString()
    @IsNotEmpty()
    userId:string;
}