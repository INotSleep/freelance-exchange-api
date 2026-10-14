import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { AccountDeletionRequest } from './AccountDeletionRequest';
import { AccountSuspension } from './AccountSuspension';
import { VerificationRequest } from './VerificationRequest';

@Entity('moderators')
export class Moderator {
  @PrimaryColumn({ length: 64 })
  login: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ length: 128 })
  name: string;

  @OneToMany(() => VerificationRequest, (request) => request.reviewedBy)
  reviewedVerificationRequests: VerificationRequest[];

  @OneToMany(() => AccountDeletionRequest, (request) => request.reviewedBy)
  reviewedDeletionRequests: AccountDeletionRequest[];

  @OneToMany(() => AccountSuspension, (suspension) => suspension.moderator)
  suspensions: AccountSuspension[];
}
