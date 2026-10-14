import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { PaymentMethod, RequestStatus } from './types';

@Entity('balance_top_up_requests')
export class BalanceTopUpRequest {
  @PrimaryColumn('uuid', { default: () => 'uuidv7()' })
  id: string;

  @Column({ length: 64 })
  userLogin: string;

  @ManyToOne(() => Account, (account) => account.topUpRequests, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_login' })
  account: Account;

  @Column('numeric', { precision: 12, scale: 2 })
  amount: string;

  @Column({ type: 'enum', enum: PaymentMethod, enumName: 'payment_method' })
  paymentMethod: PaymentMethod;

  @Column({ type: 'timestamp', default: () => 'now()' })
  operationDate: Date;

  @Column({ length: 128, nullable: true })
  externalTransactionNumber: string | null;

  @Column({ type: 'enum', enum: RequestStatus, enumName: 'request_status', default: RequestStatus.PENDING })
  status: RequestStatus;

  @Column({ type: 'timestamp', default: () => 'now()' })
  submittedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt: Date | null;
}
