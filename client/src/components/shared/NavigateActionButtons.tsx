import { Stack } from '@mui/material';
import { ReactNode } from 'react';
import BackButton from './BackButton';

interface INavigateActionButtons {
    children?: ReactNode;
}

const NavigateActionButtons = ({ children }: INavigateActionButtons) => {
    return (
        <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
        >
            <BackButton />
            {children}
        </Stack>
    );
};

export default NavigateActionButtons;
