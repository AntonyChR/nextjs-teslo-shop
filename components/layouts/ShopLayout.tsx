import Head from 'next/head';
import { FC } from 'react';
import { Navbar, SideMenu } from '../ui';

interface Props {
  title: string;
  pageDescription: string;
  imageUrl?: string;
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageUrl }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Head>
      <nav>
        <Navbar/>
      </nav>
      <SideMenu/>
      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0px 30px',
        }}
      >
        {children}
      </main>
      <footer></footer>
    </>
  );
};
