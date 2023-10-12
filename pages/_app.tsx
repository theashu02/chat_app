import { Center, ChakraProvider, Spinner } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseconfig' 
import Login from '@/components/Login';

export default function App({ Component, pageProps }: AppProps) {

  const [user, loading, error] = useAuthState(auth);

  if(loading){
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      </ChakraProvider>
    );
    
  }

  if(!user){
     return(
      <ChakraProvider>
        <Login />
      </ChakraProvider>
     )
  }

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
