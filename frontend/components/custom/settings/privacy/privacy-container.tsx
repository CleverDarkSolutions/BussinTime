import Header from '@/components/custom/settings/header';
import {Divider} from '@mui/material';
import {Card, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {Select, SelectContent, SelectItem, SelectLabel, SelectTrigger} from '@/components/ui/select';
import {SelectGroup, SelectValue} from '@radix-ui/react-select';
import {useEffect, useState} from 'react';
import {User} from '@/types/auth';
import axios from 'axios';

const PrivacyContainer = () => {
  const [user, setUser] = useState<User>()
  useEffect( () => {
    axios.get('http://localhost:8000/users/1')
      .then( (res) => {
        setUser(res.data)
      })
  },[])
  const switchSettings = [
    {
      name: 'GPS Location',
      description: 'Allow or prohibit your location being used by the application',
      checked: user?.gps,
      property: 'gps'
    },
    {
      name: 'Share your data',
      description: 'We might use your data to improve your experience in the future',
      checked: user?.shareUsageData,
      property: 'shareUsageData'
    },
    {
      name: 'Private profile',
      description: 'Set up visibility of your profile',
      checked: user?.privateProfile,
      property: 'privateProfile'
    },
    {
      name: 'Chat online status',
      description: 'Show online status in chat to other users',
      checked: true,
      property: 'chatOnlineStatus'
    },
    {
      name: 'Chat online status',
      description: 'Show online status in chat to other users',
      checked: true,
      property: 'chatOnlineStatus'
    },
  ]

  const handleChangeOption = (value: User) => {
    return(
      axios.put(`http://localhost:8000/users/${user?.userId}`, value)
    )
  }
  return(
    <div className="w-[80vw] p-8">
      <Header text="Privacy"/>
      <Divider/>
      <div className="py-5">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {switchSettings.map( (item) => {
            return(
              <Card className="w-[30vw]">
                <CardHeader>
                  <CardTitle>
                    {item.name}&nbsp; &nbsp;
                    <Switch
                      id="airplane-mode"
                    />
                  </CardTitle>
                  <CardDescription>
                    <Label htmlFor="airplane-mode">{item.description}</Label>
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
          <Card className="w-[30vw]">
            <CardHeader>
              <CardTitle>
                Direct message restriction
              </CardTitle>
              <CardDescription>
                <Select>
                  <SelectTrigger className="w-[15vw]">
                    <SelectValue
                      defaultValue={user?.directMessages}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="everyone">Everyone</SelectItem>
                      <SelectItem value="friends">Friends only</SelectItem>
                      <SelectItem value="none">No one</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Label htmlFor="airplane-mode">Who can send you a message</Label>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PrivacyContainer;
