import * as yup from 'yup';

export const playerValidatorSchema = yup.object({
    nickname: yup.string().required(),
    name: yup.string().required(),
    age: yup
        .number()
        .positive()
        .integer()
        .min(15)
        .required('age has a minimum age of 15 years old')
        .typeError('age must be a number type'),
    nationality: yup.string().notRequired(),
    isActive: yup.string().required(),
    teamId: yup.number().notRequired().typeError('pick up a team'),
    trophies: yup.array().nullable(),
});
