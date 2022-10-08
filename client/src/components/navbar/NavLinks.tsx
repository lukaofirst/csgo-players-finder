import { ButtonBase, List, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const navLinks = ['home', 'players', 'teams', 'trophies'];

const NavLinks = () => {
    return (
        <List className='navbar-ul'>
            {navLinks.map((item) => (
                <ButtonBase key={item}>
                    <NavLink
                        to={item === 'home' ? '/' : `/${item}`}
                        className={({ isActive }) =>
                            isActive ? 'navbar-li active' : 'navbar-li'
                        }
                    >
                        <Typography variant='h6'>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </Typography>
                    </NavLink>
                </ButtonBase>
            ))}
        </List>
    );
};

export default NavLinks;
