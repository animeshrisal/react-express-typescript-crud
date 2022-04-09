import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @Column()
    completed: boolean

    @ManyToOne(() => User, (user) => user.notes)
    user: User

}