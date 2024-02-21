import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {capitalizeWords} from '@/lib/utils';
import valid from 'card-validator';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  creditCard: Yup.string().test(
    'test-number',
    'Credit Card number is invalid',
    value => valid.number(value).isValid
  ),
  cvc: Yup.number().min(3).max(3).required(),
  expDate: Yup.string().required() // TODO xx/xx pattern
});

const initialValues = {
  name: '',
  cardNumber: '',
  cvc: '',
  expDate: ''
};

const BillingForm = () => {
  const handleSubmit = (values: any, {resetForm}: any) => {
    // Handle form submission here (e.g., send data to an API)
    console.log('Form submitted with values:', values);
    resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
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
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default BillingForm;
