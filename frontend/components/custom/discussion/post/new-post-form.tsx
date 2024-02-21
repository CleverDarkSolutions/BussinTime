import axios from 'axios';
import {capitalizeWords} from '@/lib/utils';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import * as Yup from 'yup';
import {API_URL} from '@/lib/constants';
import NewEventForm from '@/components/custom/home/tabs/new-event-form';
import {EventNewApi} from '@/types/event';
import {useToast} from '@/components/ui/use-toast';
import {useRouter} from 'next/router';
import Hashtags from '@/components/custom/home/event-details/hashtags';
import TagsInput from '@/components/custom/global/tags-input';
import {useState} from 'react';
import {HashTag} from '@/types/tags';

export type NewPostFormProps = {
  event: EventNewApi
}

const NewPostForm = (props: NewPostFormProps) => {
  const {toast} = useToast();
  const accountId = localStorage.getItem('userId');
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').max(50, 'Title must be less than 50 characters'),
    content: Yup.string().required('Content is required').max(250, 'Content must be less than 250 characters')
  });

  const initialValues = {
    title: '',
    content: '',
  }

  const handleSubmit = (values: any, {resetForm}: any) => {
    axios.post(`${API_URL}/post`, {
      accountId: accountId,
      eventId: props.event.id,
      ...values,
      photoPath: 'https://picsum.photos/200/300',
    },
    {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
      .then((res) => {
        const tagRequests = selectedTags.map((tag) => {
          return axios.post(`${API_URL}/hashtag`, {}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: {
              entityId: res.data.id,
              name: tag,
              hashtagEntityType: 'POST'
            }
          })
        })
        Promise.all(tagRequests).then(() => {
          toast({
            title: 'Success!',
            description: 'Your post has been created',
            duration: 3000,
          })
          router.reload()
        })
      })
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
                as={ field === 'content' ? Textarea : Input}
                name={field} />
              <ErrorMessage
                name={field}
                component="div"
                className="error" />
            </div>
          ))}
          <TagsInput
            selectedOptions={selectedTags}
            onSelectedOptionsChange={setSelectedTags}
          />
          <Button
            type="submit"
            variant="outline">Submit
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default NewPostForm
