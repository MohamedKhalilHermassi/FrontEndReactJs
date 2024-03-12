import * as Yup from 'yup';

export const courseValidator = Yup.object({
    name: Yup.string().matches(/^[a-zA-Z]+$/, 'Name must contain only characters').required('Name is required'),
    hourly_based_price: Yup.string().matches(/^[0-9]+$/, 'Price must contain only numbers').required('Price is required'),
    courseType: Yup.string().oneOf(['Instrument', 'Solfege']).required('course Type is required'),
    file: Yup.mixed()
    .test('fileSize', 'File size must be less than 1 MB', (value) => {
      if (!value) {
        return true; 
      }
      return value.size <= 20000000;
    })
    .test('fileType', 'Only JPG and PNG files allowed', (value) => {
      if (!value) {
        return true; 
      }
      return ['image/jpeg', 'image/png'].includes(value.type);
    }),
    level: Yup.string().oneOf(['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7']).required('Level is required'),
    teacher: Yup.string().required('Teacher is required')
})