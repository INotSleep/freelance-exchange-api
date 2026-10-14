import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { Moderator } from './Moderator';
import { RequestStatus } from './types';

@Entity('account_deletion_requests')
export class AccountDeletionRequest {
  @PrimaryColumn('uuid', { default: () => 'uuidv7()' })
  id: string;

  @Column({ length: 64 })
  userLogin: string;

  @ManyToOne(() => Account, (account) => account.deletionRequests, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_login' })
  account: Account;

  @Column({ length: 2048 })
  reason: string;

  @Column({ type: 'enum', enum: RequestStatus, enumName: 'request_status', default: RequestStatus.PENDING })
  status: RequestStatus;

  @Column({ type: 'timestamp', default: () => 'now()' })
  submittedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  reviewedAt: Date | null;

  @Column({ length: 64, nullable: true })
  reviewedByLogin: string | null;

  @ManyToOne(() => Moderator, (moderator) => moderator.reviewedDeletionRequests, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'reviewed_by_login' })
  reviewedBy: Moderator | null;

  @Column({ length: 1024, nullable: true })
  reviewComment: string | null;
}
