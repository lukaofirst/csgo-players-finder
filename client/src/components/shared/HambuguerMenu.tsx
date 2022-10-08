import {
    Box,
    List,
    ListItem,
    ListItemText,
    Button,
    Drawer,
} from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

type Anchor = 'right';

const HamburguerMenu = () => {
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

    const handleClick = ({
        currentTarget: { textContent },
    }: React.MouseEvent<HTMLDivElement>) => {
        if (textContent === 'HOME') {
            return navigate('/');
        }

        navigate(`/${textContent}`);
    };

    const list = (anchor: Anchor) => (
        <Box
            role='presentation'
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List sx={{ position: 'relative', top: '80%' }}>
                {['Home', 'Players', 'Teams', 'Trophies'].map((text) => (
                    <ListItem
                        button
                        key={text}
                        sx={{
                            paddingX: 10,
                            paddingY: 2.5,
                            textAlign: 'center',
                        }}
                        onClick={(e) => handleClick(e)}
                    >
                        <ListItemText primary={text.toUpperCase()} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            {(['right'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)} sx={{ p: 0 }}>
                        <MenuIcon sx={{ color: 'white', fontSize: '2.5rem' }} />
                    </Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </>
    );
};

export default HamburguerMenu;
