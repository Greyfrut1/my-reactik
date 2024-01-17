import { useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import {useNewsLetterSubscriberQuery} from "../../services/api.js";
import './Popup.scss';

export default function
    Popup({ activationButton,content }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const bodyRef = useRef(document.body);

    const {data} = useNewsLetterSubscriberQuery();
    const background = data?.data?.field_image?.image_style_uri?.['width_862'];
    const openModal = () => {
        setIsModalOpen(true);
        disableBodyScroll(bodyRef.current);
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            MaxWidth: '90%',
            padding: '0',
            marginRight: '-50%',
            background: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            transform: 'translate(-50%, -50%)',
            borderRadius: '0',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };

    const closeModal = () => {
        setIsModalOpen(false);
        enableBodyScroll(bodyRef.current);
    };

    return (
        <>
            <div className="modal-button" onClick={openModal}>
                {activationButton}
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles}>
                <>
                    <div className="modal-window">
                        <button
                            className="modal-window__close"
                            aria-label="close"
                            type="button"
                            onClick={closeModal}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        {content}
                    </div>
                </>
            </Modal>
        </>
    );
}

Popup.propTypes = {
    activationButton: PropTypes.oneOfType([PropTypes.string, PropTypes.node.isRequired]),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node.isRequired]),
};
