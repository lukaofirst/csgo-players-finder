import * as yup from 'yup';

export const trophyValidatorSchema = yup.object({
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
    year: yup
        .number()
        .required()
        .typeError("provide the year's title")
        .min(
            2013,
            "Invalid year! The CSGO's competitive scene has started in 2013"
        ),
    isMajor: yup
        .boolean()
        .required()
        .typeError("provide if it's a major or not"),
});
