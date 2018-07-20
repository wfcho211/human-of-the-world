import UserActions from '~/actions/UserActions';
import alt from '~/utils/alt';
import { isEmpty } from 'lodash';

class UserStore {
    constructor() {
        this.bindActions(UserActions);

        this.storeError = null;
        this.storeAction = null;

        this.items = [];
    }

    /**
     * Listeners
     */
     onSetError(err) {
         this.storeAction = UserActions.SET_ERROR;
         this.storeError = err;
     }

     onFetchUserList() {
         this.storeAction = UserActions.FETCH_USER_LIST;
     }

     onSetUserList(data) {
         this.storeAction = UserActions.SET_USER_LIST;
         this.items = data || []
     }


    onFetchMoreUserList() {
        this.storeAction = UserActions.FETCH_MORE_USER_LIST;
    }

    onAppendUserList(data) {
        this.storeAction = UserActions.APPEND_USER_LIST;

        if (!isEmpty(this.items)) {
            this.items = (this.items || []).concat(data);
        }
    }
}

export default alt.createStore(UserStore, 'UserStore');
