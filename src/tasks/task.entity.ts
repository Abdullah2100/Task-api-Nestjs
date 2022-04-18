import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatu } from "./task-Stateus.enum";


@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
 id:string;

 @Column()
 name:string;

 @Column()
 job:string;

 @Column({
  type:"enum",
  enum: TaskStatu,
  default:TaskStatu.UNDERTHEPROGERESS
})
 status:TaskStatu;

 @ManyToOne(() => User, (user) => user.task , { eager: false })
 user:User
}