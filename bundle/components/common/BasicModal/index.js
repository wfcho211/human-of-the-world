import './index.scss';

import { Component } from 'react';
import classNames from 'classnames';

import Modal from 'react-modal';

export default class BasicModal extends Component {
    static defaultProps = {
        className : ''
    }

    constructor(props) {
        super(props)

        this.state = {
            contentHeight : 0
        }
    }

    componentDidUpdate() {
        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(this.sizeDialog);
        }
        else {
            // IE <10 CYA - Note: I haven't actually tested this in IE - YMMV
            window.setTimeout(this.sizeDialog, 50);
        }
    }

    sizeDialog = () => {
        if (!this.refs.content) return;
        let contentHeight = this.refs.content.getBoundingClientRect().height;
        this.setState({
            contentHeight: contentHeight,
        });
    }

    render() {
        const { className, closeModal, ...other } = this.props;

        const padding = 0; // adjust this to your needs
        let height = (this.state.contentHeight + padding);
        let heightPx = height + 'px';
        let offsetPx = '30px';

        const style = {
            content: {
                height: heightPx,  // set height
                transform: 'translate(-50%,-' + offsetPx + ')', // adjust top "up" based on height
            }
        };

        return (
            <Modal
                className={classNames('BasicModal', className)}
                contentLabel="BasicModal"
                ariaHideApp={false}
                style={style}
                {...other}
            >
                <div className="BasicModal-inner" ref="content">
                    {this.props.children}
                </div>
            </Modal>
        )
    }
}
