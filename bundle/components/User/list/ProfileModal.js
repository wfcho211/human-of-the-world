import { Component } from 'react';

// Components
import BasicModal from '~/components/common/BasicModal';

export default class ProfileModal extends Component {
    render() {
        const { closeModal, ...other } = this.props;

        return(
            <BasicModal className="ProfileModal" {...other}>
                <div>
                    <div className="BasicModal-header">
                        <h3></h3>
                    </div>

                    <div className="BasicModal-body">
                        Hello World
                    </div>

                    <a className="modal-close"
                        onClick={closeModal}
                    >
                        <button type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </a>
                </div>
            </BasicModal>
        )
    }
}
