import * as yup from 'yup';
import axios from 'axios';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Textarea} from '@/components/ui/textarea';
import {capitalizeWords} from '@/lib/utils';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {API_URL, tags} from '@/lib/constants';
import GeocodeComponent from '@/components/custom/discussion/event/geocode-component';
import React, {useEffect, useState} from 'react';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Separator} from '@/components/ui/separator';
import {useToast} from '@/components/ui/use-toast';
import {useRouter} from 'next/router';
import {Checkbox} from '@/components/ui/checkbox';
import TagsInput from '@/components/custom/global/tags-input';
import {FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material';
import {FormControl} from '@mui/base';

export type LocationProps = {
  lat: string,
  lon: string,
  display_name: string,
}

const NewEventForm = () => {
  const [location, setLocation] = useState<LocationProps>();
  const {toast} = useToast();
  const accountId = localStorage.getItem('userId');
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState('PUBLIC');

  const handleVisibilityChange = (event: any) => {
    setVisibility(event.target.value);
  };

  const handleLocationChange = (location: any) => {
    setLocation(location);
    console.log(location);
  }
  const todayAtMidnight = new Date();
  todayAtMidnight.setHours(0, 0, 0, 0)

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required').max(50, 'Name must be less than 50 characters'),
    description: yup.string().required('Description is required').max(200, 'Description must be less than 200 characters'),
    startDate: yup.date().min(todayAtMidnight, 'Date must be in the future').required('Start date is required'),
    startTime: yup.string().required('Start time is required'),
    endDate: yup.date()
      .when('startDate', (startDate, schema) => {
        return startDate
          ? schema.min(startDate, 'End date must be after the start date')
          : schema; // If no start date, don't perform this validation
      })
      .required('End date is required'),
    endTime: yup.string().required('End time is required'),
  });
  const initialValues = {
    name: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  }
  const handleSubmit = (values: any, {resetForm}: any) => {
    const startDateTimeCombined = `${values.startDate.split('T')[0]} ${values.startTime}`;
    const endDateTimeCombined = `${values.endDate.split('T')[0]} ${values.endTime}`;

    if (startDateTimeCombined < endDateTimeCombined) {
      axios.post(`${API_URL}/event?accountId=${accountId}`, {
        name: values.name,
        description: values.description,
        startDate: `${values.startDate}T${values.startTime}`,
        endDate: `${values.endDate}T${values.endTime}`,
        photoPath: 'https://picsum.photos/200/300',
        isActive: true,
        localization: {
          latitude: Number(location?.lat),
          longitude: Number(location?.lon),
          city: location?.display_name.slice(0, 99),
          postalCode: 'Test',
          address: 'Test'
        },
        eventVisibility: visibility
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((res) => {
        const tagRequests = selectedTags.map((tag) => {
          return axios.post(`${API_URL}/hashtag`, {}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: {
              entityId: res.data.id,
              name: tag,
              hashtagEntityType: 'EVENT'
            }
          })
        })
        Promise.all(tagRequests).then(() => {
          toast({
            title: 'Event created',
            duration: 3000,
          })
          router.reload()
        })
      })
    } else {
      toast({
        title: 'Start date and end date are wrong'
      })
    }
    console.log(values)
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form>
          <ScrollArea className='h-[75vh]'>
            <div className="grid grid-cols-2">
              {Object.keys(initialValues).map((field) => (
                <div
                  key={field}
                  className={field === 'startDate' || field === 'startTime' || field=== 'endDate' || field === 'endTime' ? 'col-span-1 p-4' : 'col-span-2 p-4'}>
                  <label htmlFor={field}>{capitalizeWords(field)}</label>
                  <Field
                    type={
                      (field === 'startDate' || field === 'endDate') ? 'date' :
                        (field === 'startTime' || field === 'endTime') ? 'time' :
                          'text'
                    }
                    as={field === 'description' ? Textarea : Input}
                    name={field}
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="error" />
                </div>
              ))}
            </div>
            <div className="grid p-4">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={visibility}
                onChange={handleVisibilityChange}
                name="radio-buttons-group"
              >
                <FormControlLabel value="PUBLIC"
                  control={<Radio />}
                  label="Public" />
                <FormControlLabel value="PRIVATE"
                  control={<Radio />}
                  label="Private" />
              </RadioGroup>
            </div>
            <div className="grid p-2">
              <TagsInput
                selectedOptions={selectedTags}
                onSelectedOptionsChange={setSelectedTags}
              />
            </div>
            <Separator/>
            <GeocodeComponent setData={handleLocationChange}/>
            <div className="col-span-2 p-4">
              {location && <div className="col-span-2 text-lg">Detected location:</div>}
              <div className="col-span-2 text-xl">{location?.display_name}</div>
            </div>
          </ScrollArea>
          <Button
            disabled={!location}
            className="mt-4 p-4"
            type="submit"
            variant="outline">Submit
          </Button>
        </Form>
      </Formik>
    </div>
  )
}
export default NewEventForm
