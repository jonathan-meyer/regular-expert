import React, { Component } from "react";
import Modal from "react-modal";
import LoginForm from '../LoginForm/index';

class LoginModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: true
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Modal
        isOpen={this.state.showModal}
        shouldCloseOnEsc={true}
        aria={{
          labelledby: "heading",
          describedby: "full_description"
        }}
      >
        <h1 id='heading'>Please Log In to Search for a Home!</h1>
        <br></br>
        <div id='full_description'>
          <LoginForm />
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </div>
      </Modal>
    );
  }
}

export default LoginModal;
