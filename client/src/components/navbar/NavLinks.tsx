import { List, MenuItem, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const navLinks = ['Home', 'Players', 'Teams', 'Trophies'];

const NavLinks = () => {
    return (
        <List className='navbar-ul'>
            {navLinks.map((item) => (
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

export default NavLinks;
