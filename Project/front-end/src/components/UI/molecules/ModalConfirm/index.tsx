import React from 'react';
import './styles.scss';
import Modal from '@mui/material/Modal';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import CustomButton from '../../atoms/CustomButton';

interface simpleModalProps {
    title?: string;
    description?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    textBtnConfirm?:string;
    widthBtnConfirm?: string;
    textBtnCancel?: string;
    widthBtnCancel?: string;
    onClickBtnConfirm?(): void;
    onCLickBtnCancel?(): void;
    size?:number;
    loading?:boolean;
}

export const ModalConfirm: React.FC<simpleModalProps> =({ 
    title,
    description,
    open,
    setOpen,
    textBtnConfirm = 'Konfime',
    // widthBtnConfirm = "150px",
    textBtnCancel = "Anile",
    widthBtnCancel = "150px",
    onClickBtnConfirm,
    onCLickBtnCancel,
    size = 600,
    loading = false,
}) => {

    // const useStyles = makeStyles((theme) =>({
    //     paper: {
    //         position: 'absolute',
    //         top: '50%',
    //         left: '50%',
    //         backgroundColor: theme.palette.background.paper,
    //         boxShadow: theme.shadows[5],
    //         padding: theme.spacing(5, 4, 5)

    //     }
    // }));

    // const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };


    const body = (
        <div className={`simple_modal_container`} style={{
            position: 'absolute',
            top: '50%',
            left:'50%',
            transform: 'translate(-50%, -50%)',
            width: size,
            backgroundColor: '#f5f5f5',
            borderRadius: '5px',
            textAlign: 'center',
            verticalAlign: 'center',
            border: '1px solid #BEBEBE',
            boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
            padding: '20px 16px 16px',

        }}>

            <div className="simple_modal_content">
                <h2 id="simple-modal-title" className="title"> {title}<AiOutlineQuestionCircle color='#f50057'/></h2>
                <p id="simple-modal-description" className="description">{description}</p>
            </div>
            <div className="simple_modal_buttons">
                <CustomButton
                    type='button' 
                    variant='outlined'
                    color='secondary'
                    width={widthBtnCancel}
                    onClick={() => {
                        setOpen(false);
                        onCLickBtnCancel && onCLickBtnCancel() //to verify
                    }}
                >
                {textBtnCancel}

                </CustomButton>

                <CustomButton
                    size='medium'
                    type="button"
                    color='primary'
                    backgroundColor='#EC4256'
                    width={widthBtnCancel}
                    onClick={() => {
                        setOpen(false);
                        onClickBtnConfirm && onClickBtnConfirm() //to verify
                    }}
                    isLoading= {loading}
                >
                    {textBtnConfirm}
                </CustomButton>

            </div>
        </div>
    )
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    >
        {body}
    </Modal>
  )
}

export default ModalConfirm;