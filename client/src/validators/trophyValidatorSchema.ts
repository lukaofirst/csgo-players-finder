import * as yup from 'yup';

export const trophyValidatorSchema = yup.object({
    name: yup.string().required(),
    year: yup.number().required().typeError("provide the year's title"),
    isMajor: yup.string().required(),
});
