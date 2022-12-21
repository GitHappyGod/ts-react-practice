import { produce } from 'immer';
import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT,
    LogInFailureAction,
    LogInRequestAction,
    LogInSuccessAction,
    LogOutAction,
} from "../actions/user";

export interface UserState {
    isLoggedIn: boolean,
    data: {
        nickname: string,
    } | null    // 비로그인 상태의 null값도 타입 지정해주기
}

const initialState = {
    isLoggedIn: false,
    data: null,
};

type UserReducerActions = LogInRequestAction | LogInSuccessAction | LogInFailureAction | LogOutAction;
const userReducer = (prevState = initialState, action: UserReducerActions) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.data = null;
                draft.isLoggedIn = true;
                break;
            case LOG_IN_SUCCESS:
                if(action.data != null) {
                    // @ts-ignore
                    draft.data = action.data;
                }
                draft.isLoggedIn = false;
                break;
            case LOG_IN_FAILURE:
                draft.data = null;
                draft.isLoggedIn = false;
                break;
            case LOG_OUT:
                draft.data = null;
                break;
            default:
                break;
        }
    });
}

export default userReducer;