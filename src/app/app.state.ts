import * as securityReducer from './security/data/reducer';
import * as coreReducer from './core/data/reducer';
import * as clientReducer from './client/data/reducer';
import * as clientContactMessage from './client/data/contact-message.reducer';
import * as clientProfile from './client/data/profile.reducer';
import * as clientUserContact from './client/data/user-contact.reducer';

export interface State
{
  security: securityReducer.State;
  core: coreReducer.State;
  client: clientReducer.State;
  clientContactMessage: clientContactMessage.State;
  clientProfile: clientProfile.State;
  clientUserContact: clientUserContact.State;
}
