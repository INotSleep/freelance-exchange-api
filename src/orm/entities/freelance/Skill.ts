import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

import { Profile } from './Profile';
import { Task } from './Task';

@Entity('skills')
export class Skill {
  @PrimaryColumn({ length: 64 })
  name: string;

  @Column({ length: 512, nullable: true })
  description: string | null;

  @ManyToMany(() => Profile, (profile) => profile.skills, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  profiles: Profile[];

  @ManyToMany(() => Task, (task) => task.skills, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  tasks: Task[];
}
