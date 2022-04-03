import{IsNotEmpty, isNotEmpty}from 'class-validator'

export class createTaskDto{
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    job:string;
}