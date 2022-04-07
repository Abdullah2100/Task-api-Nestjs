import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatu } from "./model/taskState";
import { TasksService } from "./tasks.service";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
 id:string;
 @Column()
 name:string;
 @Column()
 job:string;
 @Column()
 status:TaskStatu;
}