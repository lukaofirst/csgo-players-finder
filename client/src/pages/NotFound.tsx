import { Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const pagesOptions: string[] = ['home', 'players', 'teams', 'trophies'];

const NotFound = () => {
    const navigate = useNavigate();

    const handleClick = ({
        currentTarget: { textContent },
    }: React.MouseEvent<HTMLButtonElement>) => {
        if (textContent === 'home') {
            return navigate('/');
        }

        navigate(`/${textContent}`);
    };

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant='h4' textAlign='center' sx={{ my: 5 }}>
                Sorry, page not found...
            </Typography>
            <Typography variant='h6' textAlign='center' sx={{ my: 5 }}>
                Choose between these options
            </Typography>
            <Grid container spacing={2} textAlign='center'>
                {pagesOptions.map((page) => (
                    <Grid key={crypto.randomUUID()} item xs={12} md={3}>
                        <Button
                            sx={{ py: 2, px: 4, width: '100%' }}
                            color='inherit'
                            variant='outlined'
                            onClick={(e) => handleClick(e)}
                        >
                            {page}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default NotFound;
