import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

const DemoOnlyModal = props => {
  const { isDemoModalOpen, hideDemoModal } = props;

  return (
    <Modal show={isDemoModalOpen} onHide={hideDemoModal} closeButton>
      <Modal.Header>
        <Modal.Title className="text-center">
          This is a Demo Only
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Thanks for demoing Load Effect — we hope you're enjoying your time here. </p>
        <p className="lead">Running these tests cost money, but please feel free to reach out to us with questions from our <a target="_blank" href="https://github.com/auklets">main github page.</a></p>
        <p className="lead">Cheers!</p>
        <p>— Tai, Chris, Felix, Bill </p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={hideDemoModal} bsStyle="primary">Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

DemoOnlyModal.propTypes = {
  siteToken: PropTypes.string,
  hideDemoModal: PropTypes.func,
  isDemoModalOpen: PropTypes.bool,
};

export default DemoOnlyModal;
