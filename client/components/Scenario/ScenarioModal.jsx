import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ScenarioModal = props => {
  const { isScenarioModalOpen, hideScenarioSuccessModal, routeToMain, siteToken, isVerifiedOwner } = props;
  const rerunText = !isVerifiedOwner ? (
    <div>
      <p>Before you can run the test, please verify that you own the domain by adding the following token to your DNS records:</p>
      <p><em>{siteToken}</em></p>
      <p>Choose "TXT" as the record type, "@" as the Host, and insert the token in the value field. It may take a few hours before your hosting provider updates.</p>
    </div>
    ) : (
    <p>Test is now running...</p>
    );

  return (
    <Modal show={isScenarioModalOpen} onHide={hideScenarioSuccessModal} closeButton>
      <Modal.Header>
        <Modal.Title className="text-center">
          <h2>Success!</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">New test has been added!</p>
        {rerunText}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={hideScenarioSuccessModal} bsStyle="success">{isVerifiedOwner ? 'Close': 'Add Another Script'}</Button>
        <Button onClick={routeToMain} bsStyle="success">Go To Main</Button>
      </Modal.Footer>
    </Modal>
  );
};

ScenarioModal.propTypes = {
  siteToken: PropTypes.string,
  hideScenarioSuccessModal: PropTypes.func,
  routeToMain: PropTypes.func,
  isScenarioModalOpen: PropTypes.bool,
  isVerifiedOwner: PropTypes.bool,
};

export default ScenarioModal;
