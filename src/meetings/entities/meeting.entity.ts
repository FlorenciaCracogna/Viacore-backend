import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('meetings')
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  userName!: string;

  @Column()
  userEmail!: string;

  @Column({
    default: 'Scheduled Meeting',
  })
  topic!: string;

  @Column({
    type: 'timestamp',
  })
  startTime!: Date;

  @Column({
    type: 'timestamp',
  })
  endTime!: Date;

  @Column({
    nullable: true,
  })
  meetLink!: string;

  @Column({
    nullable: true,
  })
  googleEventId!: string;

  @Column({
    default: 'CONFIRMED',
  })
  status!: string;

  @Column({
    default: false,
  })
  reminderSent!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}