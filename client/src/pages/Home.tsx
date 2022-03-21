import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import AnchorTag from '../components/utils/AnchorTag';
import ComputerIcon from '@mui/icons-material/Computer';
import SettingsIcon from '@mui/icons-material/Settings';

const Home = () => {
    return (
        <Container maxWidth='lg' sx={{ mt: 5 }}>
            <Paper elevation={8} sx={{ p: 5 }}>
                <Typography variant='h2' textAlign='center'>
                    CSGOPlayersFinder
                </Typography>
                <Typography variant='subtitle1' textAlign='center' mt={5}>
                    This project was made for educational purposes
                </Typography>
                <Typography variant='subtitle1' textAlign='center' mt={5}>
                    All the info was extracted from{' '}
                    <AnchorTag url='https://hltv.org'>HLTV.org</AnchorTag> and{' '}
                    <AnchorTag url='https://liquipedia.net/counterstrike/Main_Page'>
                        Liquipedia.net
                    </AnchorTag>
                </Typography>
                <Typography variant='h6' textAlign='center' sx={{ m: 5 }}>
                    Technologies and Concepts applied to this project
                </Typography>
                <Stack direction='row' justifyContent='center' spacing={10}>
                    <Box>
                        <Button variant='outlined' sx={{ color: '#299cdd' }}>
                            <ComputerIcon sx={{ margin: '0 5px 5px 0' }} />
                            Front-end
                        </Button>
                        <Stack direction='column' textAlign='center' my={2}>
                            <Typography variant='subtitle1' paddingY={1}>
                                Lorem 1
                            </Typography>
                            <Typography variant='subtitle1' paddingY={1}>
                                Lorem 2
                            </Typography>
                            <Typography variant='subtitle1' paddingY={1}>
                                Lorem 3
                            </Typography>
                        </Stack>
                    </Box>
                    <Box>
                        <Button variant='outlined' sx={{ color: '#299cdd' }}>
                            <SettingsIcon sx={{ margin: '0 5px 5px 0' }} />
                            Back-end
                        </Button>
                        <Stack direction='column' textAlign='center' my={2}>
                            <Typography variant='subtitle1' paddingY={1}>
                                Lorem 1
                            </Typography>
                            <Typography variant='subtitle1' paddingY={1}>
                                Lorem 2
                            </Typography>
                            <Typography variant='subtitle1' paddingY={1}>
                                Lorem 3
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
};

export default Home;
