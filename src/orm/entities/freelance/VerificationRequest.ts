import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Moderator } from './Moderator';
import { Profile } from './Profile';
import { ProfileType, VerificationKind, VerificationStatus } from './types';

@Entity('verification_requests')
export class VerificationRequest {
  @PrimaryColumn('uuid', { default: () => 'uuidv7()' })
  id: string;

  @Column({ length: 64, nullable: true })
  reviewedByLogin: string | null;

  @ManyToOne(() => Moderator, (moderator) => moderator.reviewedVerificationRequests, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'reviewed_by_login' })
  reviewedBy: Moderator | null;

  @Column({ length: 64 })
  profileLogin: string;

  @ManyToOne(() => Profile, (profile) => profile.verificationRequests, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'profile_login' })
  profile: Profile;

  @Column({ type: 'enum', enum: ProfileType, enumName: 'profile_type' })
  profileType: ProfileType;

  @Column({ type: 'enum', enum: VerificationKind, enumName: 'verification_kind' })
  verificationKind: VerificationKind;

  @Column({ type: 'timestamp', default: () => 'now()' })
  submittedDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  reviewedDate: Date | null;

  @Column({ length: 1024, nullable: true })
  comment: string | null;

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    enumName: 'verification_status',
    default: VerificationStatus.PENDING,
  })
  status: VerificationStatus;

  @Column('date')
  birthOrRegistrationDate: string;

  @Column({ length: 512 })
  name: string;

  @Column({ length: 64 })
  documentOrRegistrationNumber: string;

  @Column({ length: 128 })
  country: string;
}
