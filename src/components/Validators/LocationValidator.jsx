import * as Yup from 'yup';

export const locationValidator = Yup.object({
    state: Yup.string().required('State is required'),
    city : Yup.string().required('city is required'),
    numberOfFloors : Yup.number().positive()
})