import { Box } from '@mui/material';
import NavLinks from './NavLinks';
import Logo from './Logo';
import Socials from './Socials';
import HamburguerMenu from '../shared/HambuguerMenu';

interface Props {
    isMobile: boolean;
}

const Navbar = ({ isMobile }: Props) => {
    return (
        <Box className='navbar'>
            <Logo />
            {isMobile ? (
                <HamburguerMenu />
            ) : (
                <>
                    <NavLinks />
                    <Socials />
                </>
            )}
        </Box>
    );
};

export default Navbar;
