import * as Yup from 'yup';

export const courseValidator = Yup.object({
    name: Yup.string().matches(/^[a-zA-Z]+$/, 'Name must contain only characters').required('Name is required'),
    price: Yup.string().matches(/^[0-9]+$/, 'Price must contain only numbers').required('Price is required'),
    courseType: Yup.string().oneOf(['Instrument', 'Solfege']).required('course Type is required'),
    file: Yup.mixed()
    .required('File is required')
    .test('fileSize', 'File size must be less than 1 MB', (value) => {
      if (!value) {
        return true; // Skip validation if no file is selected
      }
      return value.size <= 1000000; // 1 MB in bytes
    })
    .test('fileType', 'Only JPG and PNG files allowed', (value) => {
      if (!value) {
        return true; // Skip validation if no file is selected
      }
      return ['image/jpeg', 'image/png'].includes(value.type);
    }),
    level: Yup.string().oneOf(['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7']).required('Level is required'),
})