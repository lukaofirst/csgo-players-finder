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
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { deleteTrophyAsync, setTrophyList } from '../../store/trophiesSlice';

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
    handleClose: () => void;
}

export default function TrophyModalDelete({ open, handleClose }: Props) {
    const dispatch = useAppDispatch();
    const { trophy } = useAppSelector((state) => state.trophies);

    const deleteTrophy = async (id: number, name: string) => {
        handleClose();

        try {
            await dispatch(deleteTrophyAsync({ id, name }));
            dispatch(setTrophyList(id));
        } catch (error) {
            console.log(error);
        }
    };

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
                            Delete trophy
                            <Typography
                                component='span'
                                display='block'
                                fontWeight='bold'
                            >
                                {trophy!.name}
                            </Typography>
                        </Typography>
                    </Box>
                    <Box pt={3} textAlign='center'>
                        <Button
                            fullWidth
                            variant='outlined'
                            color='error'
                            onClick={() =>
                                deleteTrophy(trophy!.id, trophy!.name)
                            }
                        >
                            Delete Trophy
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}
