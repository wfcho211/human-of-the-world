import { Component } from 'react';

// Alt
import AltContainer from 'alt-container';
import UserStore from '~/stores/UserStore';

// Components
import UserList from '~/components/User/list';

export default class App extends Component {
    render() {
        return (
            <AltContainer
                stores={{
                    item            : props => ({ store: UserStore, value: UserStore.getState().item }),
                    items           : props => ({ store: UserStore, value: UserStore.getState().items }),
                    storeAction     : props => ({ store: UserStore, value: UserStore.getState().storeAction }),
                    storeError      : props => ({ store: UserStore, value: UserStore.getState().storeError })
                }}
            >
                <UserList />
            </AltContainer>
        )
    }
}
