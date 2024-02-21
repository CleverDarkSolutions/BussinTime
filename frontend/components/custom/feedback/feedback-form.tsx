import {capitalizeWords} from '@/lib/utils';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Input} from '@/components/ui/input';
import * as Yup from 'yup';
import {toast, useToast} from '@/components/ui/use-toast';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';

const FeedbackForm = () => {
  const {toast} = useToast();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').max(30, 'Title must be less than 30 characters'),
    description: Yup.string().required('Description is required').max(300, 'Description must be less than 300 characters'),
  });

  const initialValues = {
    title: '',
    description: ''
  }
  const handleSubmit = (values: any, {resetForm}: any) => {
    // Handle form submission here (e.g., send data to an API)
    console.log('Form submitted with values:', values);
    resetForm();
    toast({
      title: 'Success!',
      description: 'Your feedback has been sent to the dev team.',
      duration: 5000,
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
          <div className="grid gap-4">
            {Object.keys(initialValues).map((field) => (
              <div
                key={field}
                className="py-4">
                <label htmlFor={field}>{capitalizeWords(field)}</label>
                <Field
                  type="text"
                  as={ field === 'description' ? Textarea : Input}
                  name={field} />
                <ErrorMessage
                  name={field}
                  component="div"
                  className="error" />
              </div>
            ))}
          </div>
          <Button>
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default FeedbackForm
