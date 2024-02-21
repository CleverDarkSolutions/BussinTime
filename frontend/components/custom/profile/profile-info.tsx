import {UserNewApi} from '@/types/auth';
import EventPopupInfoRow from '@/components/custom/map/popup-content/event-popup-info-row';
import {Block, Description, Edit, Male, PersonAdd, Share} from '@mui/icons-material';
import Hashtags from '@/components/custom/home/event-details/hashtags';

export type ProfileInfoProps = {
  user: UserNewApi
}

const ProfileInfo = (props: ProfileInfoProps) => {
  return (
    <div className="flex flex-row p-4">
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="w-full">
          <img src='https://img.freepik.com/free-photo/happy-young-company-smiling-friends-sitting-park-grass-man-women-having-fun-together_285396-8812.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1698796800&semt=ais'/>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-10 gap-2">
            <div className="col-span-7">
              <h2 className="mb-2 text-xl font-bold">{props.user.username}, {props.user.age}</h2>
            </div>
            {/*<div className="col-span-1">*/}
            {/*  <PersonAdd/>*/}
            {/*</div>*/}
            {/*<div className="col-span-1">*/}
            {/*  <Block/>*/}
            {/*</div>*/}
            {/*<div className="col-span-1">*/}
            {/*  <Share/>*/}
            {/*</div>*/}
          </div>
          <div className="mt-2 flex flex-row">
            <Male/> {props.user.gender}
          </div>
          <div className="mt-2 flex flex-row">
            <Hashtags
              id={props.user.id}
              type='ACCOUNT'/>
          </div>
          <p className="text-gray-700">{props.user.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
