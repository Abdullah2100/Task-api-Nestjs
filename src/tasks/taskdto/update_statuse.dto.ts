import { IsBoolean, IsEnum } from "class-validator";
import { TaskStatu } from "../model/taskState";


export class UpdateStatusDto{
    @IsEnum(TaskStatu)
    status:TaskStatu
}