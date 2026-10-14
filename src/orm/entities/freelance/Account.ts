import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

import { AccountDeletionRequest } from './AccountDeletionRequest';
import { AccountSuspension } from './AccountSuspension';
import { BalanceTopUpRequest } from './BalanceTopUpRequest';
import { Profile } from './Profile';
import { AccountStatus } from './types';
import { WithdrawalRequest } from './WithdrawalRequest';

@Entity('accounts')
export class Account {
  @PrimaryColumn({ length: 64 })
  login: string;

  @Column({ length: 128, unique: true })
  email: string;

  @Column({ type: 'enum', enum: AccountStatus, enumName: 'account_status', default: AccountStatus.EMAIL_NOT_VERIFIED })
  status: AccountStatus;

  @Column({ type: 'timestamp', nullable: true })
  passwordChangedAt: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column('numeric', { precision: 12, scale: 2, default: 0 })
  balance: string;

  @OneToOne(() => Profile, (profile) => profile.account)
  profile: Profile;

  @OneToMany(() => AccountDeletionRequest, (request) => request.account)
  deletionRequests: AccountDeletionRequest[];

  @OneToMany(() => BalanceTopUpRequest, (request) => request.account)
  topUpRequests: BalanceTopUpRequest[];

  @OneToMany(() => WithdrawalRequest, (request) => request.account)
  withdrawalRequests: WithdrawalRequest[];

  @OneToMany(() => AccountSuspension, (suspension) => suspension.account)
  suspensions: AccountSuspension[];
}
