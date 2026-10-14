import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Profile } from './Profile';
import { Task } from './Task';
import { BidStatus } from './types';

@Entity('task_bids')
export class TaskBid {
  @PrimaryColumn('uuid')
  taskId: string;

  @PrimaryColumn({ length: 64 })
  executorProfileLogin: string;

  @ManyToOne(() => Task, (task) => task.bids, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => Profile, (profile) => profile.bids, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'executor_profile_login' })
  executorProfile: Profile;

  @Column({ length: 4096 })
  proposalText: string;

  @Column('numeric', { precision: 12, scale: 2 })
  proposedAmount: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  submittedAt: Date;

  @Column({ type: 'enum', enum: BidStatus, enumName: 'bid_status', default: BidStatus.PENDING })
  status: BidStatus;

  @Column({ type: 'timestamp', nullable: true })
  decidedAt: Date | null;
}
