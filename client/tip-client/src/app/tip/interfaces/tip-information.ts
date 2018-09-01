import {User} from './user';

export interface TipInformation {
    from?: User;
    joinedPool?: Boolean;
    content?: any;
    total?: Number;
}
