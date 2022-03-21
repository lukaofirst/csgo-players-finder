import { Link } from '@mui/material';
import { Box } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';

const Socials = () => {
    return (
        <Box>
            <Link
                href='https://github.com/lukaofirst'
                target='_blank'
                rel='noreferrer'
            >
                <GitHubIcon fontSize='large' sx={IconStyle} />
            </Link>
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
