import {
    Modal,
    Backdrop,
    Fade,
    Box,
    Typography,
    ButtonBase,
    Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

interface Props {
    open: boolean;
    type: string;
    itemName: string;
    handleClose: () => void;
    handleDelete: () => void;
}

export default function ModalDelete({
    open,
    type,
    itemName,
    handleClose,
    handleDelete,
}: Props) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Typography variant='h6'>Are you sure?</Typography>
                        <ButtonBase
                            sx={{
                                cursor: 'pointer',
                                padding: '2px',
                                color: 'red',
                                borderRadius: '10px',
                                transition: '0.4s ease-in',
                                '&:hover': {
                                    color: '#a10000',
                                },
                            }}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </ButtonBase>
                    </Box>
                    <Box pt={3} textAlign='center'>
                        <Typography>
                            Delete {type}
                            <Typography
                                component='span'
                                display='block'
                                fontWeight='bold'
                            >
                                {itemName}
                            </Typography>
                        </Typography>
                    </Box>
                    <Box pt={3} textAlign='center'>
                        <Button
                            fullWidth
                            variant='outlined'
                            color='error'
                            onClick={handleDelete}
                        >
                            Delete {type}
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}
