import { Box } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';
import AnchorTag from '../shared/AnchorTag';

const Socials = () => {
    return (
        <Box>
            <AnchorTag
                url='https://github.com/lukaofirst'
                children={<GitHubIcon fontSize='large' sx={IconStyle} />}
            />
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
