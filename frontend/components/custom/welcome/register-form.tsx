import * as Yup from 'yup';
import valid from 'card-validator';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {capitalizeWords} from '@/lib/utils';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useContext, useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {LoginUser, User} from '@/types/auth';
import {API_URL} from '@/lib/constants';
import {useToast} from '@/components/ui/use-toast';
import {Select, SelectContent, SelectItem, SelectTrigger} from '@/components/ui/select';
import {SelectValue} from '@radix-ui/react-select';

const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters').max(20, 'Username must be at most 20 characters'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  repeatPassword: Yup.string().required('Confirm password').min(8, 'Password must be at least 8 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  age: Yup.number().min(18, 'You must be at least 18 years old').required('Age is required'),
});

const initialValues = {
  userName: '',
  email: '',
  password: '',
  repeatPassword: '',
  gender: '',
  age: 0,
};

const RegisterForm = () => {
  const {toast} = useToast();
  const [selectedGender, setSelectedGender] = useState<string>('');
  const handleSubmit = (values: any, { resetForm }: any) => {
    if(values.password === values.repeatPassword) {
      axios.post(`${API_URL}/authenticate/signup`, {
        userName: values.userName,
        password: values.password,
        email: values.email,
        gender: selectedGender,
        age: values.age,
        country: 'Insert here...',
        city: 'Insert here...',
        description: 'Insert here...',
        photoPath: 'Insert here...',
        address: 'Insert here...',
      })
        .then((res) => {
          console.log(res);
          resetForm();
          toast({
            title: 'Account created successfully',
            description: 'You can now login to your account',
          });
        })
        .catch((err: AxiosError) => {
          console.log(err);
          if (err.response?.status === 409) {
            toast({
              title: 'Error',
              description: 'Username or email already exists',
            })
          } else {
            toast({
              title: 'Error',
              description: 'Something went wrong',
            });
          }
        });
    } else {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
      });
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="grid grid-cols-2 gap-2 p-4">

            <div
              key="userName"
              className="py-4">
              <label htmlFor="userName">Username</label>
              <Field
                type='text'
                as={Input}
                name="userName" />
              <ErrorMessage
                name="userName"
                component="div"
                className="error" />
            </div>
            <div
              key="email"
              className="py-4">
              <label htmlFor="email">Email</label>
              <Field
                type='text'
                as={Input}
                name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error" />
            </div>
            <div
              key="password"
              className="py-4">
              <label htmlFor="password">Password</label>
              <Field
                type='password'
                as={Input}
                name="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error" />
            </div>
            <div
              key="repeatPassword"
              className="py-4">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <Field
                type='password'
                as={Input}
                name="repeatPassword" />
              <ErrorMessage
                name="repeatPassword"
                component="div"
                className="error" />
            </div>

            <div className="py-4">
              <label htmlFor="gender">Gender</label>
              <Select
                value={selectedGender}
                onValueChange={setSelectedGender}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div
              key="age"
              className="col-span-1 py-4">
              <label htmlFor="age">Age</label>
              <Field
                type='number'
                as={Input}
                name="age" />
              <ErrorMessage
                name="age"
                component="div"
                className="error" />
            </div>
            <Button
              type="submit"
              className="col-span-2">
              Register
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
