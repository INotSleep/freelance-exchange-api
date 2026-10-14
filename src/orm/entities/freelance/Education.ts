import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Profile } from './Profile';

@Entity('educations')
export class Education {
  @PrimaryColumn('uuid', { default: () => 'uuidv7()' })
  id: string;

  @Column({ length: 64 })
  profileLogin: string;

  @ManyToOne(() => Profile, (profile) => profile.educations, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'profile_login' })
  profile: Profile;

  @Column({ length: 512 })
  institutionName: string;

  @Column({ length: 256, nullable: true })
  specialization: string | null;

  @Column('date')
  startDate: string;

  @Column('date', { nullable: true })
  finishDate: string | null;

  @Column({ length: 2048, nullable: true })
  description: string | null;
}
