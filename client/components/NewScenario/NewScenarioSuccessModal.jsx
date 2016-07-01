import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { history } from '../../redux/store';

const NewScenarioSuccessModal = props => {
  const { isScenarioModalOpen, hideScenarioSuccessModal } = props;

  const routeToLiveResults = () => {
    history.push('/live-results');
    hideScenarioSuccessModal();
  };

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
        <Button onClick={routeToLiveResults} bsStyle="success">View Real-Time Results</Button>
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
