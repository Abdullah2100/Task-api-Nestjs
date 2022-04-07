import { IsBoolean, IsEnum } from "class-validator";


export class UpdateStatusDto{
    @IsBoolean()
    status:boolean
}