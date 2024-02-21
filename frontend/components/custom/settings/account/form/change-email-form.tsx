import * as Yup from 'yup';
import axios from 'axios';
import {User, UserNewApi} from '@/types/auth';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {capitalizeWords} from '@/lib/utils';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {API_URL} from '@/lib/constants';

export type ChangeEmailFormProps = {
  user: UserNewApi
}
const ChangeEmailForm = (props: ChangeEmailFormProps) => {
  const validationSchema = Yup.object().shape({
    oldEmail: Yup.string().email('Invalid email').required('Old email is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const initialValues = {
    oldEmail: props.user.email,
    email: '',
  }

  const handleSubmit = (values: any, {resetForm}: any) => {
    axios.put(`${API_URL}`, values)
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          {Object.keys(initialValues).map((field) => (
            <div
              key={field}
              className="py-4">
              <label htmlFor={field}>{capitalizeWords(field)}</label>
              <Field
                type="text"
                as={Input}
                name={field} />
              <ErrorMessage
                name={field}
                component="div"
                className="error" />
            </div>
          ))}
          <Button
            type="submit"
            variant="outline">Submit
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default ChangeEmailForm
