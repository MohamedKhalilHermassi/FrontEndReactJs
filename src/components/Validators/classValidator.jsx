import * as Yup from 'yup';

export const classValidator = Yup.object({
    number: Yup.number().positive().required('Number is required'),
    floor: Yup.number().positive().required('floor is required'),
    type: Yup.string().required('Class Type is required')
})