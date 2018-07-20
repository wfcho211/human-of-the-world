import alt from '~/utils/alt';
import * as UserApi from '~/api/UserApi';

class UserActions {
    setError(err) {
        return err;
    }

    fetchUserList(params) {
        return dispatch => {
            dispatch();

            return UserApi.getUserList(params)
                .then(this.setUserList)
                .catch(this.setError);
        }
    }

    setUserList(data) {
        return data;
    }

    fetchMoreUserList(params) {
        return dispatch => {
            dispatch();

            return UserApi.getUserList(params)
                .then(this.appendUserList)
                .catch(this.setError);
        }
    }

    appendUserList(data) {
        return data;
    }
}

export default alt.createActions(UserActions);
