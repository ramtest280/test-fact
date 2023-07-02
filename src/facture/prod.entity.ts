import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Prod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;
}
