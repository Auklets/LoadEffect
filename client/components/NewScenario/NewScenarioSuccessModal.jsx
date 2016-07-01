import React, { Component, PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

const NewScenarioSuccessModal = props => {
  const { isScenarioModalOpen, hideScenarioSuccessModal } = props;

  return (
    <Modal show={isScenarioModalOpen} onHide={hideScenarioSuccessModal} closeButton>
      <Modal.Header>
        <Modal.Title className="text-center">
          <h2>Success!</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h4>New test has been submitted and is being executed.</h4>
      </Modal.Body>

      <Modal.Footer>
        <Button bsStyle="success">View Real-Time Results</Button>
      </Modal.Footer>
    </Modal>
  );
};


NewScenarioSuccessModal.propTypes = {
  errorMessage: PropTypes.string,
  hideScenarioSuccessModal: PropTypes.func,
  isScenarioModalOpen: PropTypes.bool,
};

export default NewScenarioSuccessModal;
