import { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalBox, Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  close = evt => {
    if (evt.target === evt.currentTarget) this.props.onClose();
  };

  handleKeydown = evt => {
    if (evt.code !== 'Escape') return;

    this.props.onClose();
  };

  render() {
    return (
      <Overlay onClick={this.close}>
        <ModalBox>
          <img src={this.props.url} alt="" />
        </ModalBox>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
