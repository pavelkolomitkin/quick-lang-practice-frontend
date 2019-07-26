import User from './user.model';

export class ContactMessage
{
    id?: string;

    text: string;

    author?: User;

    contacts?: User[];

    createdAt: string;

    updatedAt: string;
}
