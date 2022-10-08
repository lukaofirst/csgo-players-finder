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
    isActive: yup
        .boolean()
        .required()
        .typeError('select if the player is active or not'),
    teamId: yup
        .string()
        .when('isActive', {
            is: 'false',
            then: yup.string().nullable(),
        })
        .when('isActive', {
            is: 'true',
            then: yup
                .string()
                .required('When the player is active, you must provide a Team'),
        }),
    trophies: yup.array().nullable(),
});
