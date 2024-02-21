import * as Yup from 'yup';
import axios from 'axios';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {capitalizeWords} from '@/lib/utils';
import {Textarea} from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {CommentNewApi, PostCommentType} from '@/types/post';
import {API_URL} from '@/lib/constants';
import {useToast} from '@/components/ui/use-toast';
import {useRouter} from 'next/router';

export type EditCommentFormProps = {
  comment: CommentNewApi
}

const EditCommentForm = (props: EditCommentFormProps) => {
  const router = useRouter()
  const {toast} = useToast();
  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Content is required').max(50, 'Content must be less than 50 characters'),
  });
  const initialValues = {
    content: props.comment.content,
  }
  const handleSubmit = (values: any, {resetForm}: any) => {
    axios.put(`${API_URL}/comment/${props.comment.id}`, values,
      { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
      .then(() => {
        toast({
          title: 'Success!',
          description: 'Your comment has been updated',
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

export default EditCommentForm;
