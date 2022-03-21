import { Box } from '@mui/material';
import NavbarLinks from './NavbarLinks';
import Logo from './Logo';
import Socials from './Socials';

const Navbar = () => {
    return (
        <Box className='navbar'>
            <Logo />
            <NavbarLinks />
            <Socials />
        </Box>
    );
};

export default Navbar;
