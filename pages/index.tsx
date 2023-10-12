import { Inter } from 'next/font/google'
// import Login from '../components/Login'
import { Box } from '@chakra-ui/react'
import Sidebar from '@/components/Sidebar';
import Chat from './chat/[id]'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Box h="100vh">
     <Sidebar />
    </Box>
  );
}
