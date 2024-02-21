import {Input} from '@/components/ui/input';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {MyLocation} from '@mui/icons-material';
import {formatAddress} from '@/lib/utils';

const GeocodeComponent = ({setData}: any) => {
  const [location, setLocation] = useState('');

  const geocode = async () => {
    const Nominatim = require('nominatim-geocoder')
    const geocoder = new Nominatim()

    geocoder.search( { q: location } )
      .then((response: any) => {
        console.log(response[0].display_name)
        setData({
          lat: response[0].lat,
          lon: response[0].lon,
          display_name: formatAddress(response[0].display_name.slice(0, 99))
        })
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  return (
    <div className='grid grid-cols-6 gap-4 p-4'>
      <div className='col-span-6 text-2xl'>
        Set up location
      </div>
      <div className='col-span-4'>
        <Input
          type="text"
          name="location"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className='col-span-2'>
        <Button
          type="button"
          onClick={geocode}
          variant="outline">
          <MyLocation/>
        </Button>
      </div>
    </div>
  )
}

export default GeocodeComponent
