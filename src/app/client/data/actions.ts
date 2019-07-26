import { Action } from '@ngrx/store';
import {LanguageSkill} from '../../core/data/model/language-skill.model';

export const CLIENT_ADD_SKILL_WINDOW_CHANGE_STATE = 'CLIENT_ADD_SKILL_WINDOW_CHANGE_STATE';


export class ClientAddSkillWindowChangeState implements Action
{
    readonly type = CLIENT_ADD_SKILL_WINDOW_CHANGE_STATE;

    constructor(public isOpen: boolean) {}
}

export type ClientActions = ClientAddSkillWindowChangeState
    ;
