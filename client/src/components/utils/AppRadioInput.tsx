import {
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
    FormLabel,
    Box,
} from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
    label?: string;
    textposition?: string;
    onClick?: (e: any) => void;
    val?: boolean | string;
}

const AppRadioInput = (props: Props) => {
    const { field, fieldState } = useController({
        ...props,
        ...(props.val ? { defaultValue: props.val } : { defaultValue: '' }),
    });

    return (
        <Box display='flex' flexDirection='column' mb={1}>
            {props.label && (
                <FormLabel error={!!fieldState.error}>{props.label}</FormLabel>
            )}
            {props.onClick ? (
                <RadioGroup
                    sx={{ display: 'inline-block' }}
                    {...field}
                    {...props}
                    value={props.val}
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
            ) : (
                <RadioGroup
                    sx={{ display: 'inline-block' }}
                    {...field}
                    {...props}
                    value={props.val}
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
            )}
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
