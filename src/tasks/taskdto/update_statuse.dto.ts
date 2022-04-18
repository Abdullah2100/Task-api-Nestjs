import { IsBoolean, IsEnum } from "class-validator";
import { TaskStatu } from "../task-Stateus.enum";


export class UpdateStatusDto{
    @IsEnum(TaskStatu)
    status:TaskStatu
}