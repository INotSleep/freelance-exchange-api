import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Profile } from './Profile';

@Entity('portfolio_projects')
export class PortfolioProject {
  @PrimaryColumn('uuid', { default: () => 'uuidv7()' })
  id: string;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 4096, nullable: true })
  description: string | null;

  @Column({ length: 512, nullable: true })
  projectUrl: string | null;

  @Column({ length: 64 })
  profileLogin: string;

  @ManyToOne(() => Profile, (profile) => profile.portfolioProjects, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'profile_login' })
  profile: Profile;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
