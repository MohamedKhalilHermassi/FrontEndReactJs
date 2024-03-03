import * as Yup from 'yup';

export const courseValidator = Yup.object({
    name: Yup.string().matches(/^[a-zA-Z]+$/, 'Name must contain only characters').required('Name is required'),
    price: Yup.string().matches(/^[0-9]+$/, 'Price must contain only numbers').required('Price is required'),
    courseType: Yup.string().oneOf(['Instrument', 'Solfege']).required('course Type is required'),
    level: Yup.string().oneOf(['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7']).required('Level is required'),
})