import React, {useContext, useEffect} from 'react';
import {useRouter} from 'next/router';

interface IsAuthProps {
  children: React.ReactNode;
}

const IsAuth: React.FC<IsAuthProps> = ({ children }) => {
  const router = useRouter();
  const token = localStorage.getItem('token');

  if(token === undefined || token === null) {
    router.push('/welcome');
    return null;
  }
  else {
    return (
      <div>
        {children}
      </div>
    );
  }
};

export default IsAuth;
