import './index.scss';
import { Component } from 'react';
import { capitalize, map } from 'lodash';

import UserActions from '~/actions/UserActions';

// Components
import Waypoint from 'react-waypoint';
import ProfileModal from './ProfileModal';

export default class UserList extends Component {
    constructor() {
        super();

        this.state = {
            user        : {},
            currentPage : 1,
            isModalOpen : false,
            isLoading   : true
        };

        this.__perpage = 10;
        this.__seed = 'randomuser';

        this._onInview = this._onInview.bind(this);
    }

    componentWillMount() {
        const { currentPage } = this.state;

        UserActions.fetchUserList({
            page    : currentPage,
            results : this.__perpage
        });
    }

    componentWillReceiveProps(nextProps) {
        const { storeAction, storeError } = nextProps;

        if (storeAction === UserActions.SET_USER_LIST
            || storeAction === UserActions.APPEND_USER_LIST) {
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { items } = this.props;
        const { user, isModalOpen, isLoading } = this.state;

        return (
            <div className="container mt-5 mb-5">
                {isLoading &&
                    <div className="text-center mt-3 mb-3">
                        <i className="fas fa-spinner fa-spin" style={{ color: '#dddddd', fontSize: '50px' }}></i>
                    </div>
                }

                {!isLoading &&
                    <div className="row">
                        {
                            map(items, (item, index) => {
                                return (
                                    <div key={index}
                                        className="UserList-item col col-lg-6 col-12 bg-white border"
                                        onClick={this._onClick.bind(this, item)}
                                    >
                                        <div className="UserList-item-inner p-3">
                                            {this.renderItem(item)}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }

                {!isLoading &&
                    <Waypoint onEnter={this._onInview}>
                        <div className="text-center mt-3">
                            Loading...
                        </div>
                    </Waypoint>
                }

                {isModalOpen &&
                    <ProfileModal
                        user={user}
                        isOpen={isModalOpen}
                        closeModal={ ()=> this.setState({ isModalOpen: false, user: {} }) }
                    />
                }
            </div>
        )
    }

    renderItem(user) {
        return(
            <div className="row">
                <div className="UserList-item-picture col col-md-3 col-12">
                    <img src={user.picture.large} />
                </div>
                <div className="UserList-item-details col col-md-9 col-12">
                    <div className="UserList-item-name">
                        {`${capitalize(user.name.title)} ${capitalize(user.name.first)} ${capitalize(user.name.last)}`}
                    </div>
                    <div className="UserList-item-cell">
                        <label>Mobile</label>
                        {user.cell}
                    </div>
                    <div className="UserList-item-email">
                        <label>Email</label>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                    </div>
                </div>
            </div>
        )
    }

    _onClick(user, e) {
        e.preventDefault();

        this.setState({ user, isModalOpen: true });
    }

    _onInview() {
        const { currentPage } = this.state;

        this.setState({ currentPage: currentPage + 1 }, () => {
            UserActions.fetchMoreUserList({
                page    : currentPage + 1,
                results : this.__perpage
            });
        });
    }
}
