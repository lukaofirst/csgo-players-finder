import { Box } from '@mui/material';
import NavLinks from './NavLinks';
import Logo from './Logo';
import Socials from './Socials';

const Navbar = () => {
    return (
        <Box className='navbar'>
            <Logo />
            <NavLinks />
            <Socials />
        </Box>
    );
};

export default Navbar;
