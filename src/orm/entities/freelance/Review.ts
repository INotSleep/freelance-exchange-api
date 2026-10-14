import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from 'typeorm';

import { Profile } from './Profile';
import { Task } from './Task';

@Entity('reviews')
@Unique(['taskId', 'authorProfileLogin'])
export class Review {
  @PrimaryColumn('uuid', { default: () => 'uuidv7()' })
  id: string;

  @Column({ length: 64 })
  recipientProfileLogin: string;

  @ManyToOne(() => Profile, (profile) => profile.receivedReviews, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'recipient_profile_login' })
  recipientProfile: Profile;

  @Column({ length: 64 })
  authorProfileLogin: string;

  @ManyToOne(() => Profile, (profile) => profile.writtenReviews, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'author_profile_login' })
  authorProfile: Profile;

  @Column('uuid')
  taskId: string;

  @ManyToOne(() => Task, (task) => task.reviews, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @Column('integer')
  rating: number;

  @Column({ length: 4096, nullable: true })
  reviewText: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
