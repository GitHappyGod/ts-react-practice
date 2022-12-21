import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {logIn, logOut, ThunkDispatch} from "./actions/user";
import {Dispatch} from "redux";
import {RootState} from "./reducers";
import {UserState} from "./reducers/user";

interface StateToProps {
    user: UserState,
}

interface DispatchToProps {
    dispatchLogIn: ({ id, password }: {id: string, password: string}) => void,
    dispatchLogOut: () => void;
}

// 가독성을 위해 StateProps와 DispatchProps를 나누어 놓을 수도 있지만 Props로 한번에 묶어도 됨
// interface Props {
//     user: UserState,
//     dispatchLogin: ({ id, password }: {id: string, password: string}) => void,
//     dispatchLogOut: () => void;
// }


class App extends Component<StateToProps & DispatchToProps> {
    onClick = () => {
        this.props.dispatchLogIn({
            id: 'winterlimit',
            password: '123123',
        });
    }

    onLogout = () => {
        this.props.dispatchLogOut();
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                {user.isLoggedIn
                    ? <div>로그인 중</div>
                    : user.data
                        ? <div>{user.data.nickname}</div>
                        : '로그인 해주세요.'}
                {!user.data
                    ? <button onClick={this.onClick}>로그인</button>
                    : <button onClick={this.onLogout}>로그아웃</button>}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.user,
})

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
    dispatchLogIn: (data: {id: string, password: string}) => dispatch(logIn(data)),
    dispatchLogOut: () => dispatch(logOut()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);