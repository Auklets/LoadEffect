import React, { PropTypes } from 'react';
import { Button, Modal, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import Clipboard from 'clipboard';
new Clipboard('#copy-button');

const VerifySiteModal = props => {
  const { isVerifyModalOpen, hideVerifyModal, siteToken } = props;

  return (
    <Modal show={isVerifyModalOpen} onHide={hideVerifyModal} closeButton>
      <Modal.Header>
        <Modal.Title className="text-center">
          Your Validation Token
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <FormGroup>
            <InputGroup>
              <FormControl id="site-token" type="text" value={siteToken} className="lead text-center" style={{ color: 'green', 'font-style': 'italic' }} />
              <InputGroup.Button id="copy-button" data-clipboard-target="#site-token">
                <Button><i className="fa fa-files-o" aria-hidden="true" /></Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
        <hr />
        <p>Use this token to help us verify that you own the domains submitted for testing.</p>
        <p>Add this token inside your DNS settings as a new DNS TXT record.</p>
        <p>The token should go in "value" field. Set "@" as the Host/Name.</p>
        <p>Once saved, depending on your provider, it may take up to 1-2 hours to update accordingly, at which point you will be able to check for validation.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={hideVerifyModal} bsStyle="default">Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

VerifySiteModal.propTypes = {
  siteToken: PropTypes.string,
  hideVerifyModal: PropTypes.func,
  isVerifyModalOpen: PropTypes.bool,
};

export default VerifySiteModal;
