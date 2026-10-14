import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { Moderator } from './Moderator';

@Entity('account_suspensions')
export class AccountSuspension {
  @PrimaryColumn('uuid', { default: () => 'uuidv7()' })
  id: string;

  @Column({ length: 64 })
  userLogin: string;

  @ManyToOne(() => Account, (account) => account.suspensions, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_login' })
  account: Account;

  @Column({ length: 64, nullable: true })
  moderatorLogin: string | null;

  @ManyToOne(() => Moderator, (moderator) => moderator.suspensions, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'moderator_login' })
  moderator: Moderator | null;

  @Column({ length: 1024 })
  reason: string;

  @Column('timestamp')
  startAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  endAt: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
