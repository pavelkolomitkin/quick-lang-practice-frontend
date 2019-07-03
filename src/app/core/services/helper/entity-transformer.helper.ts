import User from '../../data/model/user.model';

export class EntityTransformer
{
    static transformUser(user)
    {
        return User.createFromRawData(user);
    }
}
