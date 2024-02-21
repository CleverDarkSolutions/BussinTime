import * as Yup from 'yup';
import axios from 'axios';
import {User} from '@/types/auth';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {capitalizeWords} from '@/lib/utils';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

export type ChangePasswordFormProps = {
  user: User
}
const ChangePasswordForm = (props: ChangePasswordFormProps) => {
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string().required('Password is required'),
    repeatPassword: Yup.string().required('Confirm password'),
  });

  const initialValues = {
    oldPassword: props.user.password,
    newPassword: '',
    repeatPassword: '',
  }

  const handleSubmit = (values: any, {resetForm}: any) => {
    axios.put(`http://localhost:8000/users/${props.user.userId}`, values)
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

export default ChangePasswordForm
