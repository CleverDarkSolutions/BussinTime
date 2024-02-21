import axios from 'axios';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup'
import {Textarea} from '@/components/ui/textarea';
import {capitalizeWords} from '@/lib/utils';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {API_URL} from '@/lib/constants';
import {useToast} from '@/components/ui/use-toast';
import {useRouter} from 'next/router';

export type NewCommentFormProps = {
  postId: number | string
}

const NewCommentForm = (props: NewCommentFormProps) => {
  const {toast} = useToast();
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Content is required').max(50, 'Content must be less than 50 characters'),
  });
  const initialValues = {
    content: '',
  }
  const handleSubmit = (values: any, {resetForm}: any) => {
    axios.post(`${API_URL}/comment`, {
      postId: props.postId,
      accountId: localStorage.getItem('userId'),
      ...values,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(() => {
      toast({
        title: 'Success!',
        description: 'Your comment has been created',
      })
      resetForm();
    }).then( () => router.reload())
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form>
          {Object.keys(initialValues).map((field) => (
            <div
              key={field}
              className="py-4">
              <label htmlFor={field}>{capitalizeWords(field)}</label>
              <Field
                type="text"
                as={ field === 'content' ? Textarea : Input}
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

export default NewCommentForm;
