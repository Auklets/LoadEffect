import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

const VerifySiteModal = props => {
  const { isVerifyModalOpen, hideVerifyModal, siteToken, allScenarios, validateUrl } = props;
  const unverifiedSites = allScenarios.filter(site => !site.isVerifiedOwner);

  return (
    <Modal show={isVerifyModalOpen} onHide={hideVerifyModal} closeButton>
      <Modal.Header>
        <Modal.Title className="text-center">
          <h2>Verify Your Websites</h2>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h3>Unique Token: </h3>
        <p className="lead">{siteToken}</p>
        <hr />
        <h3 className="text-center">Websites requiring verification:</h3>
        {
          unverifiedSites.map((site, i) => {
            const handleUrlClick = () => validateUrl(site.targetURL, site.id);
            return (
              <div>
                <Button onClick={handleUrlClick} bsStyle="info">Validate</Button> {' '}
                <span key={i}>{site.targetURL}{' '}</span>
              </div>
            );
          })
        }
        <hr />
        <p>To verify, create a new DNS TXT record, using '@" as Host and the provided token as the value.</p>
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
