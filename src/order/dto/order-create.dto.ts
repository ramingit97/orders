import { IS_LENGTH, IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class OrderCreateDto{
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsString()
    description:string;   
    
    
    @IsString()
    @IsNotEmpty()
    userId:string;
}