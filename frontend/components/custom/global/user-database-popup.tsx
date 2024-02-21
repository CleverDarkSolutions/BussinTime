import {AlertDialog, AlertDialogTrigger} from '@radix-ui/react-alert-dialog';
import {AddComment} from '@mui/icons-material';
import {AlertDialogCancel, AlertDialogContent, AlertDialogFooter} from '@/components/ui/alert-dialog';
import OneOnOneChat from '@/components/custom/global/one-on-one-chat';
import * as React from 'react';
import UserDatabaseComponent from '@/components/custom/global/user-database-component';

const UserDatabasePopup = () => {
  return(
    <AlertDialog>
      <AlertDialogTrigger>
        User database
      </AlertDialogTrigger>
      <AlertDialogContent className="h-[70vh] w-[30vw] max-w-[30vw]">
        <UserDatabaseComponent />
        <AlertDialogFooter>
          <AlertDialogCancel className="absolute right-5 top-5">X</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default UserDatabasePopup;
