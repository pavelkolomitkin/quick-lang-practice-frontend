import User from './user.model';
import {ContactMessage} from './contact-message.model';

export class UserContact
{
    id: string;

    user: User;

    addressee: User;

    newMessages: ContactMessage[];

    lastMessage?: ContactMessage;

    createdAt: string;

    updatedAt: string;
}
