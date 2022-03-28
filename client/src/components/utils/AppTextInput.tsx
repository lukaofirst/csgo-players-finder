import { TextField } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
    label: string;
    type?: string;
}

const AppTextInput = (props: Props) => {
    const { field, fieldState } = useController({ ...props, defaultValue: '' });

    return (
        <TextField
            {...field}
            {...props}
            variant='outlined'
            sx={{ my: 1 }}
            type={props.type}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
    );
};

export default AppTextInput;
