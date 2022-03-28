import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
} from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';
import { Trophy } from '../../models/Trophy';

interface Props extends UseControllerProps {
    label: string;
    trophies: Trophy[];
}

const AppCheckboxInput = (props: Props) => {
    const { field, fieldState } = useController({ ...props, defaultValue: '' });

    return (
        <FormGroup sx={{ my: 2 }}>
            <FormLabel sx={{ textAlign: 'left', mb: 1 }}>
                {props.label}
            </FormLabel>
            {props.trophies.map((trophy) => (
                <FormControlLabel
                    {...field}
                    key={trophy.id}
                    control={
                        <Checkbox
                            onChange={() => {
                                if (!field.value.includes(trophy.id)) {
                                    field.onChange([...field.value, trophy.id]);
                                    return;
                                }
                                const newTopics = field.value.filter(
                                    (topic: any) => topic !== trophy.id
                                );
                                field.onChange(newTopics);
                            }}
                        />
                    }
                    label={trophy.name}
                />
            ))}
            <FormHelperText error={!!fieldState.error}>
                {fieldState.error?.message}
            </FormHelperText>
        </FormGroup>
    );
};

export default AppCheckboxInput;
