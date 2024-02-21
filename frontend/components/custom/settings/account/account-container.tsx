import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import Header from '@/components/custom/settings/header';
import {Divider} from '@mui/material';
import ChangeEmailForm from '@/components/custom/settings/account/form/change-email-form';
import {User} from '@/types/auth';
import {useEffect, useState} from 'react';
import axios from 'axios';
import ChangePasswordForm from '@/components/custom/settings/account/form/change-password-form';
import ChangeAddressForm from '@/components/custom/settings/account/form/change-address-form';

const AccountContainer = () => {
  const [user, setUser] = useState<User>()
  useEffect( () => {
    axios.get('http://localhost:8000/users/1')
      .then( (res) => {
        setUser(res.data)
      })
  },[])
  const userDataAccordions = [
    {
      name: 'Change Email',
      component: <ChangeEmailForm user={user!}/>
    },
    {
      name: 'Change Password',
      component: <ChangePasswordForm user={user!}/>,
    },
    {
      name: 'Change Address',
      component: <ChangeAddressForm user={user!}/>,
    },
    {
      name: 'Cancel subscription',
      component: <div>Coming soon...</div>
    },
    {
      name: 'Close your account',
      component: <div>Coming soon...</div>
    },
  ]
  return(
    <div className="w-[80vw] p-8">
      <Header text="Manage account"/>
      <Divider/>
      <div className="py-5">
        {userDataAccordions.map( (item) => {
          return (
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="text-2xl">{item.name} </div>
                </AccordionTrigger>
                <AccordionContent>
                  {item.component}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        })}
      </div>
    </div>
  )
}

export default AccountContainer
