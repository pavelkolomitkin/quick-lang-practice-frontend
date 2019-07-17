import * as actions from './actions';
import {LanguageSkill} from '../../core/data/model/language-skill.model';

export interface State {

    isAddSkillWindowShown: boolean;
    lastRemovedSkill: LanguageSkill;

}

const initialState: State = {

    isAddSkillWindowShown: false,
    lastRemovedSkill: null

};

export function reducer(state = initialState, action: actions.ClientActions): State {

    switch (action.type) {

        case actions.CLIENT_ADD_SKILL_WINDOW_CHANGE_STATE:

            return {
                ...state,
                isAddSkillWindowShown: action.isOpen
            };

        default:

            return state;

    }

}
