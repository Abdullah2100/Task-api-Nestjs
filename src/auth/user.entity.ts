import { Exclude } from "class-transformer"
import { Task } from "src/tasks/task.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @Column()
    username:string
    @Column()
    password:string
    @OneToMany(() => Task, (task) => task.user , { eager : true })
    @Exclude({ toPlainOnly: true })
    task:Task[];
}
