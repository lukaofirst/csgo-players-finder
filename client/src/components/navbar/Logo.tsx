import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to='/' className='link'>
            <Typography variant='h6'>CSGOPlayersFinder</Typography>
        </Link>
    );
};

export default Logo;
