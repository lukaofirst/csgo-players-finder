import { List, MenuItem, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const navbarLinks = ['Home', 'Players', 'Teams', 'Trophies'];

const NavbarLinks = () => {
    return (
        <List className='navbar-ul'>
            {navbarLinks.map((item) => (
                <MenuItem key={item}>
                    <NavLink
                        to={item === 'Home' ? '/' : `/${item}`}
                        className={({ isActive }) =>
                            isActive ? 'navbar-li active' : 'navbar-li'
                        }
                    >
                        <Typography variant='h6'>{item}</Typography>
                    </NavLink>
                </MenuItem>
            ))}
        </List>
    );
};

export default NavbarLinks;
