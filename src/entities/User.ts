import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", name: "name", length: 255 })
  name: string;

  @Column({ type: "varchar", name: "email", length: 1024 })
  email: string;

  @Column({ type: "text" })
  image_url: string;

  @Exclude()
  @Column({ type: "boolean" })
  admin: boolean;

  @Exclude()
  @Column({ type: "varchar", name: "password", length: 1024 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
