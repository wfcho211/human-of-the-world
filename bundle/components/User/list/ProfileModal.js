import { Component } from 'react';
import { isEmpty } from 'lodash';

// Components
import BasicModal from '~/components/common/BasicModal';
import UserProfile from '../profile';

export default class ProfileModal extends Component {
    render() {
        const { user, closeModal, ...other } = this.props;

        return(
            <BasicModal className="ProfileModal" {...other}>
                <div>
                    <div className="BasicModal-header">
                        <h3>User Details</h3>
                    </div>

                    <div className="BasicModal-body">
                        {!isEmpty(user) &&
                            <UserProfile user={user} />
                        }
                    </div>

                    <a className="modal-close"
                        onClick={closeModal}
                    >
                        <i className="fas fa-times"></i> <span>Close</span>
                    </a>
                </div>
            </BasicModal>
        )
    }
}
