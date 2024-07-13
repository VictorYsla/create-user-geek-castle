import { Entity, Column } from 'typeorm';

@Entity()
export class User {
  @Column()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;
}
