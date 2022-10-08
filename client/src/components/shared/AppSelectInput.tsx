import { FormHelperText, Select } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';
import { Team } from '../../models/Team';

interface Props extends UseControllerProps {
    label?: string;
    teams: Team[];
    val?: string | number;
}

const AppSelectInput = (props: Props) => {
    const { field, fieldState } = useController({
        ...props,
        ...(props.val ? { defaultValue: props.val } : { defaultValue: '' }),
    });
    return (
        <>
            <Select
                {...field}
                {...props}
                value={props.val}
                error={!!fieldState.error}
                native
                sx={{ textAlign: 'left' }}
            >
                <option value=''>Team</option>
                {props.teams.map((team) => (
                    <option key={team.id} value={team.id!}>
                        {team.name}
                    </option>
                ))}
            </Select>
            <FormHelperText error={!!fieldState.error}>
                {fieldState.error?.message}
            </FormHelperText>
        </>
    );
};

export default AppSelectInput;
