export interface Task{
    id:string;
    name:string;
    job:string;
    status:TaskStatus
}

 export enum  TaskStatus{
        OPEN="OPEN",
        CLOSE="CLOSE"
}