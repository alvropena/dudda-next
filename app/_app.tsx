import { getServerSession } from 'next-auth/next';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      const session = await getServerSession();

      if (session?.user) {
        router.push('/dashboard'); // Redirect to the dashboard if the user is authenticated
      }
    };

    handleRedirect();
  }, []); // Empty dependency array ensures this runs once after the component mounts

  return (
    <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp;
