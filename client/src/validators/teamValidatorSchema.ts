import * as yup from 'yup';

export const teamValidatorSchema = yup.object({
    name: yup
        .string()
        .required()
        .min(
            5,
            'Please fill this field with at least 5 and max. 70 characters long'
        )
        .max(
            70,
            'Please fill this field with at least 5 and max. 70 characters long'
        ),
    location: yup.string().notRequired(),
    region: yup.string().notRequired(),
    foundedYear: yup
        .number()
        .notRequired()
        .nullable()
        .min(
            2013,
            "Invalid year! The CSGO's competitive scene has started in 2013"
        )
        .typeError('provider a year'),
});
