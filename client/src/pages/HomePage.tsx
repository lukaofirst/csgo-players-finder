import { Container, Paper } from '@mui/material';
import Greeting from '../components/home/Gretting';
import ExternalSources from '../components/home/ExternalSources';
import UsedTechsAndConcepts from '../components/home/UsedTechsAndConcepts';

interface Props {
    isMobile: boolean;
}

const HomePage = ({ isMobile }: Props) => {
    return (
        <Container maxWidth='lg' sx={{ mt: 2.5, mb: 7.5 }}>
            <Paper elevation={8} sx={{ p: 2.5 }}>
                <Greeting isMobile={isMobile} />
                <ExternalSources />
                <UsedTechsAndConcepts isMobile={isMobile} />
            </Paper>
        </Container>
    );
};

export default HomePage;
