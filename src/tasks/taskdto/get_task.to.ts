import { TaskStatus } from "../tasks.model";

export class GetDtoTaskFilter{
    status?:TaskStatus;
    search?:string;
}