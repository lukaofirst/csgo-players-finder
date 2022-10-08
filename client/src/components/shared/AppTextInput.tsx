import { TextField } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
    label: string;
    type?: string;
    val?: string | number;
    disabled?: boolean;
}

const AppTextInput = (props: Props) => {
    const { field, fieldState } = useController({
        ...props,
        ...(props.val ? { defaultValue: props.val } : { defaultValue: '' }),
    });

    return (
        <TextField
            {...field}
            {...props}
            variant='outlined'
            sx={{ mb: 1 }}
            type={props.type}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            disabled={props.disabled}
        />
    );
};

export default AppTextInput;
