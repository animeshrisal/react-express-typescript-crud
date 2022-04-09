import { IsNotEmpty, Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm"
import { Note } from "./Note"
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["username"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Length(4, 20)
    username: string;
  
    @Column()
    @Length(4, 100)
    password: string;
  
    @Column()
    @IsNotEmpty()
    role: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }

    @OneToMany(() => Note, (note) => note.user)
    notes: Note[]

}