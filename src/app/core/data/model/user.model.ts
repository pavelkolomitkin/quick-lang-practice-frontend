import {LanguageSkill} from './language-skill.model';

export default class User
{
    public id: string;

    public email: string;

    public fullName: string;

    public isActive?: boolean;

    public roles: Array<string> = [];

    public createdAt?: string;

    public updatedAt?: string;

    public aboutYourSelf?: string;

    public readyToPracticeSkill?: LanguageSkill;

    public skills: Array<LanguageSkill> = [];

    isAdmin()
    {
        return this.roles.includes('ROLE_ADMIN_USER');
    }

    isClient()
    {
        return this.roles.includes('ROLE_CLIENT_USER');
    }

    static createFromRawData(data: any)
    {
        const result: User = Object.assign(new User(), data);

        return result;
    }

    removeSkill(skill: LanguageSkill)
    {
        if (this.readyToPracticeSkill && (this.readyToPracticeSkill.id === skill.id))
        {
            this.readyToPracticeSkill = null;
        }

        const index = this.skills.findIndex(item => item.id === skill.id);
        if (index !== -1)
        {
            this.skills.splice(index, 1);
        }
    }
}
