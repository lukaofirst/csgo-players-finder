import * as yup from 'yup';

export const teamValidatorSchema = yup.object({
    name: yup.string().required(),
    location: yup.string().nullable(),
    region: yup.string().nullable(),
    foundedYear: yup.string().notRequired().nullable(),
});
