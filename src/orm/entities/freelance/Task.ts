import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { Profile } from './Profile';
import { Review } from './Review';
import { Skill } from './Skill';
import { TaskBid } from './TaskBid';
import { TaskStatus } from './types';

@Entity('tasks')
export class Task {
  @PrimaryColumn('uuid', { default: () => 'uuidv7()' })
  id: string;

  @Column({ length: 64 })
  customerProfileLogin: string;

  @ManyToOne(() => Profile, (profile) => profile.tasks, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'customer_profile_login' })
  customerProfile: Profile;

  @Column({ length: 256 })
  title: string;

  @Column({ length: 4096 })
  description: string;

  @Column('numeric', { precision: 12, scale: 2 })
  budget: string;

  @Column('date')
  deadline: string;

  @Column({ type: 'enum', enum: TaskStatus, enumName: 'task_status', default: TaskStatus.OPEN })
  status: TaskStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date | null;

  @ManyToMany(() => Skill, (skill) => skill.tasks, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable({
    name: 'task_skills',
    joinColumn: { name: 'task_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skill_name', referencedColumnName: 'name' },
  })
  skills: Skill[];

  @OneToMany(() => TaskBid, (bid) => bid.task)
  bids: TaskBid[];

  @OneToMany(() => Review, (review) => review.task)
  reviews: Review[];
}
