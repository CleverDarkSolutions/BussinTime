import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {capitalizeWords} from '@/lib/utils';
import {User, UserNewApi} from '@/types/auth';
import {useEffect} from 'react';
import axios, {AxiosError} from 'axios';
import {useToast} from '@/components/ui/use-toast';
import {API_URL} from '@/lib/constants';
import {useRouter} from 'next/router';

type ProfileFormProps = {
  user: UserNewApi
}

const ProfileForm = (props: ProfileFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    country: Yup.string().required('Country is required').max(30, 'Country must be at most 30 characters').min(3, 'Country must be at least 3 characters'),
    city: Yup.string().required('City is required').max(30, 'City must be at most 30 characters').min(3, 'City must be at least 3 characters'),
    description: Yup.string().required('Description is required').max(100, 'Description must be at most 100 characters'),
    address: Yup.string().required('Address is required').max(100, 'Address must be at most 100 characters').min(3, 'Address must be at least 3 characters'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const initialValues = {
    userName: props.user.username,
    country: props.user.country,
    city: props.user.city,
    description: props.user.description,
    address: props.user.address,
    email: props.user.email,
  };

  const handleSubmit = (values: any, {resetForm}: any) => {
    // Handle form submission here (e.g., send data to an API)
    axios.put(`${API_URL}/account/updateAccountDetails/${props.user.id}`, values)
      .then( (res) => {
        console.log('Data changed',res.data)
        toast({
          title: 'Success!',
          description: 'Your profile has been updated.',
          duration: 5000,
          type: 'foreground',
        })
        router.reload()
      }).catch((err: AxiosError) => {
        if(err.response?.status === 409){
          toast({
            title: 'Error',
            description: 'Username or email already exists',
            duration: 5000,
            type: 'foreground',
          })
        }
        else{
          toast({
            title: 'Error',
            description: 'Something went wrong',
            duration: 5000,
            type: 'foreground',
          })
        }
      })
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="grid grid-cols-2">
            {Object.keys(initialValues).map((field) => (
              <div
                key={field}
                className="col-span-1 py-4 pr-4">
                <label htmlFor={field}>{capitalizeWords(field)}</label>
                <Field
                  type={field === 'age' ? 'number' : 'text'}
                  as={Input}
                  disabled={field === 'username'}
                  name={field} />
                <ErrorMessage
                  name={field}
                  component="div"
                  className="error" />
              </div>
            ))}
          </div>
          <Button
            type="submit"
            variant="outline">Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ProfileForm;
