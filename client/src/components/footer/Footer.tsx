import { Box, Typography } from '@mui/material';
import AnchorTag from '../utils/AnchorTag';

interface Props {
    isMobile: boolean;
}

const Footer = ({ isMobile }: Props) => {
    return (
        <Box className='footer' paddingY={isMobile ? '5px' : '15px'}>
            <Typography variant={isMobile ? 'body1' : 'h5'}>
                Developed by{' '}
                <AnchorTag url='https://github.com/lukaofirst'>
                    @lukaofirst
                </AnchorTag>
            </Typography>
        </Box>
    );
};

export default Footer;
