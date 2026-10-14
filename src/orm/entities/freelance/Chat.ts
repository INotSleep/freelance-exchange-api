import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { Message } from './Message';
import { Profile } from './Profile';

@Entity('chats')
export class Chat {
  @PrimaryColumn('uuid', { default: () => 'uuidv7()' })
  id: string;

  @Column({ length: 64 })
  firstProfileLogin: string;

  @ManyToOne(() => Profile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'first_profile_login' })
  firstProfile: Profile;

  @Column({ length: 64 })
  secondProfileLogin: string;

  @ManyToOne(() => Profile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'second_profile_login' })
  secondProfile: Profile;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
