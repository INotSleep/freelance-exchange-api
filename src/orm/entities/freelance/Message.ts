import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Chat } from './Chat';
import { Profile } from './Profile';

@Entity('messages')
export class Message {
  @PrimaryColumn('uuid', { default: () => 'uuidv7()' })
  id: string;

  @Column('uuid')
  chatId: string;

  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'chat_id' })
  chat: Chat;

  @Column({ length: 64 })
  senderProfileLogin: string;

  @ManyToOne(() => Profile, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'sender_profile_login' })
  senderProfile: Profile;

  @Column({ length: 4096 })
  messageText: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  sentAt: Date;
}
