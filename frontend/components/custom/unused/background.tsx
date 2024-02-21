import { Parallax } from 'react-parallax';
import React, {ReactNode, useEffect} from 'react';

type BackgroundProps = {
  children: ReactNode;
};

const Background = ({children}: BackgroundProps) => {
  useEffect(() => {
    // Perform client-side initialization or any other logic here
    // This code will only run in the browser environment
  }, []);
  if (typeof window !== 'undefined')
    return(
      <Parallax
        blur={3}
        bgImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80"
        bgImageAlt="the cat"
        strength={200}
      >
        {children}
      </Parallax>
    )
  else return <div/>
};

export default Background;
