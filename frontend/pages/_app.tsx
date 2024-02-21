import RootLayout from '@/app/layout';
import ProvidersCombined from '@/utils/ProvidersCombined';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react';

export default function MyApp({Component, pageProps}: any) {
  const getLayout = Component.getLayout || (
    (page: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined) => (
      <RootLayout>
        {page}
      </RootLayout>
    )
  )

  return getLayout(typeof window !== 'undefined' && (
    <Component {...pageProps}
      supressHydrationWarning />
  ))
}
