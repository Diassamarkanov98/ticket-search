import Head from 'next/head';
import './globals.css';
import { Roboto } from 'next/font/google';
import { StoreProvider } from '@/redux/services/StoreProvider';
import { Header, Footer } from '@/components';
import { Suspense } from 'react';
import Loading from '@/components/loading/Loading';

export const metadata = {
  title: 'Билетопоиск',
  description: 'My first next js app',
  keywords: 'билетопоиск',
};

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['cyrillic'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <html lang="ru">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="keywords" content={metadata.keywords} />
          <meta name="description" content={metadata.description} />
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any"/>
          <title>{metadata.title}</title>
        </Head>
        <body className={roboto.className}>
          <Suspense fallback={<Loading />}>
            <div className="root-layout" id="modal-root">
              <Header />
              <div className="content">{children}</div>
              <Footer />
            </div>
          </Suspense>
        </body>
      </html>
    </StoreProvider>
  );
}