import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

const VerifySiteModal = props => {
  const { isVerifyModalOpen, hideVerifyModal, siteToken } = props;

  return (
    <Modal show={isVerifyModalOpen} onHide={hideVerifyModal} closeButton>
      <Modal.Header>
        <Modal.Title className="text-center">
          Your Special DDoS Token
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead text-center" style={{ color: 'green' }}><em>{siteToken}</em></p>
        <hr />
        <p>Use this token to help us verify that you own the domains submitted for testing.</p>
        <p>To use this token, login to your hosting provider, go to your DNS settings, and add a new DNS TXT record.</p>
        <p>Set the token inide the "value" field, and set "@" inside the Host/Name field.</p>
        <p>Once saved, depending on your provider, it may take up to 1-2 hours to update accordingly, at which point you will be able to check for validation.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={hideVerifyModal} bsStyle="default">Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

VerifySiteModal.propTypes = {
  allScenarios: PropTypes.array,
  errorMessage: PropTypes.string,
  siteToken: PropTypes.string,
  hideVerifyModal: PropTypes.func,
  validateUrl: PropTypes.func,
  getScenarioData: PropTypes.func,
  routeToResults: PropTypes.func,
  isVerifyModalOpen: PropTypes.bool,
};

export default VerifySiteModal;
