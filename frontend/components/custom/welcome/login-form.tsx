import * as Yup from 'yup';
import valid from 'card-validator';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {capitalizeWords} from '@/lib/utils';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {LoginUser, User, UserNewApi} from '@/types/auth';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {LoginInitialState, setToken} from '@/utils/store/login-reducer';
import {API_URL} from '@/lib/constants';
import {useToast} from '@/components/ui/use-toast';

const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

const initialValues: LoginUser = {
  userName: '',
  password: ''
};

const LoginForm = () => {
  const router = useRouter();
  const {toast} = useToast();

  const handleSubmit = async (values: LoginUser, {resetForm}: any) => {
    axios.post(`${API_URL}/authenticate/signin`, values).then((res) => {
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.account.id);
        router.push('/home');
        toast({
          title: 'Login successful',
          description: 'You have successfully logged in',
        })
      }
    }).catch((err) => {
      toast({
        title: 'Login failed',
        description: 'Please check your username and password',
      })
    });
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="grid gap-4 p-4 ">
            {Object.keys(initialValues).map((field) => (
              <div
                key={field}
                className="py-4">
                <label htmlFor={field}>{capitalizeWords(field)}</label>
                <Field
                  type={(field === 'password') ? 'password': 'text'}
                  as={Input}
                  name={field} />
                <ErrorMessage
                  name={field}
                  component="div"
                  className="error" />
              </div>
            ))}
            <Button type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
