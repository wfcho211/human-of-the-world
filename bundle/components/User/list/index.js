import './index.scss';
import { Component } from 'react';
import { capitalize, map } from 'lodash';

import UserActions from '~/actions/UserActions';

// Components
import Waypoint from 'react-waypoint';

export default class UserList extends Component {
    constructor() {
        super();

        this.state = {
            currentPage : 1,
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
        const { isLoading } = this.state;

        return (
            <div className="container mt-5 mb-5">
                {!isLoading &&
                    <div className="row">
                        {
                            map(items, (item, index) => {
                                return (
                                    <div key={index}
                                        className="UserList-item col col-lg-6 col-12 bg-white border"
                                        onClick={this._onClick.bind(this, item.id)}
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
            </div>
        )
    }

    renderItem(item) {
        return(
            <div className="row">
                <div className="UserList-item-picture col col-md-3 col-12">
                    <img src={item.picture.large} />
                </div>
                <div className="UserList-item-details col col-md-9 col-12">
                    <div className="UserList-item-name">
                        {`${capitalize(item.name.title)} ${capitalize(item.name.first)} ${capitalize(item.name.last)}`}
                    </div>
                    <div className="UserList-item-cell">
                        <label>Mobile</label>
                        {item.cell}
                    </div>
                    <div className="UserList-item-phone">
                        <label>Phone</label>
                        {item.phone}
                    </div>
                    <div className="UserList-item-email">
                        <label>Email</label>
                        <a href={`mailto:${item.email}`}>{item.email}</a>
                    </div>
                </div>
            </div>
        )
    }

    _onClick(id, e) {
        e.preventDefault();

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
