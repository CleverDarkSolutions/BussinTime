'use client'
import '@/styles/globals.css'
import Welcome from '@/pages/welcome';
import PagePadding from '@/components/custom/global/page-padding';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

export default function IndexPage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/home');
  }, []);
  return (
    <PagePadding>
      <Welcome/>
    </PagePadding>
  )
}
