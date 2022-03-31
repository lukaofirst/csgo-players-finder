import {
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
    FormLabel,
    Box,
} from '@mui/material';
import { ChangeEvent } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
    label?: string;
    textposition?: string;
    onClick?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AppRadioInput = (props: Props) => {
    const { field, fieldState } = useController({ ...props, defaultValue: '' });

    return (
        <Box display='flex' flexDirection='column' my={1}>
            {props.label && (
                <FormLabel error={!!fieldState.error}>{props.label}</FormLabel>
            )}
            <RadioGroup
                sx={{ display: 'inline-block' }}
                {...field}
                {...props}
                onClick={(e: any) => props.onClick!(e)}
            >
                <FormControlLabel
                    value='true'
                    control={<Radio />}
                    label='True'
                />
                <FormControlLabel
                    value='false'
                    control={<Radio />}
                    label='False'
                />
            </RadioGroup>
            <FormHelperText
                sx={{
                    textAlign: `${
                        props.textposition ? props.textposition : 'left'
                    }`,
                }}
                error={!!fieldState.error}
            >
                {fieldState.error?.message}
            </FormHelperText>
        </Box>
    );
};

export default AppRadioInput;
