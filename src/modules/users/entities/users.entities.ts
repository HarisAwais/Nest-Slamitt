import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  firstName: string;
  @Column({ type: 'varchar', nullable: true })
  secondName: string;
  @Column({ type: 'varchar', unique: true })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
