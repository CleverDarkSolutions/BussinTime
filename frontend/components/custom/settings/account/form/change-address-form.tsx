import {User} from '@/types/auth';
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {capitalizeWords} from '@/lib/utils';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import axios from 'axios';

export type ChangeAddressFormProps = {
  user: User
}

const ChangeAddressForm = (props: ChangeAddressFormProps) => {
  const validationSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
  });

  const initialValues = {
    address: props.user.address,
  }
  const handleSubmit = (values: any, {resetForm}: any) => {
    // Handle form submission here (e.g., send data to an API)
    axios.put(`http://localhost:8000/users/${props.user.userId}`, values)
      .then( (res) => {
        console.log('Data changed',res.data)
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

export default ChangeAddressForm
