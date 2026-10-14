import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { PaymentMethod, RequestStatus } from './types';

@Entity('withdrawal_requests')
export class WithdrawalRequest {
  @PrimaryColumn('uuid', { default: () => 'uuidv7()' })
  id: string;

  @Column({ length: 64 })
  userLogin: string;

  @ManyToOne(() => Account, (account) => account.withdrawalRequests, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_login' })
  account: Account;

  @Column('numeric', { precision: 12, scale: 2 })
  amount: string;

  @Column({ type: 'enum', enum: PaymentMethod, enumName: 'payment_method' })
  paymentMethod: PaymentMethod;

  @Column({ length: 1024 })
  paymentDetails: string;

  @Column({ length: 128, nullable: true })
  externalTransactionNumber: string | null;

  @Column({ type: 'enum', enum: RequestStatus, enumName: 'request_status', default: RequestStatus.PENDING })
  status: RequestStatus;

  @Column({ type: 'timestamp', default: () => 'now()' })
  submittedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt: Date | null;
}
