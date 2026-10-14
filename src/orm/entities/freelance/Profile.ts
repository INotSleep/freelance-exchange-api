import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Account } from './Account';
import { Education } from './Education';
import { PortfolioProject } from './PortfolioProject';
import { Review } from './Review';
import { Skill } from './Skill';
import { Task } from './Task';
import { TaskBid } from './TaskBid';
import { ProfileStatus, ProfileType } from './types';
import { VerificationRequest } from './VerificationRequest';

@Entity('profiles')
export class Profile {
  @PrimaryColumn({ length: 64 })
  userLogin: string;

  @OneToOne(() => Account, (account) => account.profile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_login' })
  account: Account;

  @Column({ length: 256, nullable: true })
  altName: string | null;

  @Column({ length: 512 })
  name: string;

  @Column({ type: 'enum', enum: ProfileType, enumName: 'profile_type', default: ProfileType.INDIVIDUAL })
  type: ProfileType;

  @Column({ length: 4096, nullable: true })
  description: string | null;

  @Column({ length: 128 })
  country: string;

  @Column({ type: 'enum', enum: ProfileStatus, enumName: 'profile_status', default: ProfileStatus.UNVERIFIED })
  status: ProfileStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Skill, (skill) => skill.profiles, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable({
    name: 'profiles_skills',
    joinColumn: { name: 'profile_login', referencedColumnName: 'userLogin' },
    inverseJoinColumn: { name: 'skill_name', referencedColumnName: 'name' },
  })
  skills: Skill[];

  @OneToMany(() => Education, (education) => education.profile)
  educations: Education[];

  @OneToMany(() => PortfolioProject, (project) => project.profile)
  portfolioProjects: PortfolioProject[];

  @OneToMany(() => VerificationRequest, (request) => request.profile)
  verificationRequests: VerificationRequest[];

  @OneToMany(() => Task, (task) => task.customerProfile)
  tasks: Task[];

  @OneToMany(() => TaskBid, (bid) => bid.executorProfile)
  bids: TaskBid[];

  @OneToMany(() => Review, (review) => review.recipientProfile)
  receivedReviews: Review[];

  @OneToMany(() => Review, (review) => review.authorProfile)
  writtenReviews: Review[];
}
