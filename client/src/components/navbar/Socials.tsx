import { Box } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';
import AnchorTag from '../utils/AnchorTag';

const Socials = () => {
    return (
        <Box>
            <AnchorTag url='https://github.com/lukaofirst'>
                <GitHubIcon fontSize='large' sx={IconStyle} />
            </AnchorTag>
        </Box>
    );
};

const IconStyle = {
    color: 'white',
    transition: '0.2s ease-in',
    '&:hover': {
        color: '#299CDD',
    },
};

export default Socials;
