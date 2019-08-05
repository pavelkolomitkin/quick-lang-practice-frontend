import {Language} from '../../../core/data/model/language.model';
import {LanguageLevel} from '../../../core/data/model/language-level.model';

export default interface RegisterData
{
  email: string,
  fullName: string,
  password: string,
  passwordRepeat: string,
  language: Language,
  languageLevel: LanguageLevel,
}
