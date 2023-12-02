import React from 'react';
import './styles.scss';
import Modal from '@mui/material/Modal';
import CustomButton from '../../atoms/CustomButton';

interface CustomModalProps {
    title: string; // Add the title prop
    open: boolean;
    setOpen?: any
    textBtnConfirm?: string;
    widthBtnConfirm?: string;
    textBtnCancel?: string;
    widthBtnCancel?: string;
    onClickBtnConfirm?(): void;
    onClickBtnCancel?(): void;
    loading?: boolean;
    children: React.ReactNode;
    sender_value?: string;
    received_value?:string;
}

export const CustomModal: React.FC<CustomModalProps> = ({
    title,
    open,
    setOpen,
    textBtnConfirm = 'Confirmer',
    widthBtnConfirm = '150px',
    textBtnCancel = 'Annuler',
    widthBtnCancel = '150px',
    onClickBtnConfirm,
    onClickBtnCancel,
    loading = false,
    children,
    received_value,
    sender_value
}) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{
                    border: 'none'
                }}
            >
                <div
                    className={`__modal_container`}
                    style={{
                        border:'none',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 350,
                        backgroundColor: '#f5f5f5',
                        borderRadius: '5px',
                        textAlign: 'center',
                        verticalAlign: 'center',
                        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
                        padding: '20px 16px 16px',
                    }}
                >
                    <h2 id="__modal-title" className="title">
                        {title} 
                        {/* <AiOutlineQuestionCircle color="#f50057" /> */}
                    </h2>
                    <div className='__description'>
                        {children}
                    </div>
                    <div className="simple_modal_buttons">
                        <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '16px'}}>
                            <h3 style={{color: "gray"}}>{sender_value}</h3>
                            <h4 style={{color: "#E56121"}}>{received_value}</h4>
                        </div>
                        <CustomButton
                            type="button"
                            variant="outlined"
                            color="secondary"
                            width={widthBtnCancel}
                            onClick={() => {
                                setOpen(false);
                                onClickBtnCancel && onClickBtnCancel();
                            }}
                        >
                            {textBtnCancel}
                        </CustomButton>
                        {
                            onClickBtnConfirm &&
                        <CustomButton
                            // disabled={!sender_value}
                            type="button"
                            color="primary"
                            backgroundColor="#EC4256"
                            width={widthBtnConfirm}
                            onClick={() => {
                                onClickBtnConfirm && onClickBtnConfirm();
                            }}
                            isLoading={loading}
                        >
                            {textBtnConfirm}
                        </CustomButton>

                        }
                    </div>
                </div>
            </Modal>
        </div>
    );
};