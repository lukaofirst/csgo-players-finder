import { Box } from '@mui/material';
import AnchorTag from '../utils/AnchorTag';

const Footer = () => {
    return (
        <Box className='footer'>
            Developed by{' '}
            <AnchorTag url='https://github.com/lukaofirst'>
                @lukaofirst
            </AnchorTag>
        </Box>
    );
};

export default Footer;
