import React, { ReactNode } from 'react';

interface PagePaddingProps {
  children: ReactNode;
}

const PagePadding: React.FC<PagePaddingProps> = ({ children }) => {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {children}
    </section>
  );
};

export default PagePadding;
