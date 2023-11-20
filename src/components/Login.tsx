import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import NextLink from 'next/link'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleLogin = async () => {
    // Call the login function from the AuthContext
    await login(username, password)
  }

  return (
    <Box p={4} maxW="md" mx="auto" mt={20}>
      <Heading mb={4} textAlign="center">
        Jot Down your Ideas Before they Expire 📝
      </Heading>
    
      <FormControl id="username" isRequired mb={4}>
        <FormLabel>Email</FormLabel>
        <Input type="text" onChange={(e) => setUsername(e.target.value)} />
      </FormControl>
      <FormControl id="password" isRequired mb={6}>
        <FormLabel>Password</FormLabel>
        <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button backgroundColor="black" textColor="white" onClick={handleLogin} mb={4} w="100%">
        Login
      </Button>
      <Text textAlign="center" mb={4}>
        Don&apos;t have an account?{' '}
        <Link
          as={NextLink}
          href="/register"
          passHref
          color="black"
          cursor="pointer"
          fontWeight="bold"
        >
          Register here.
        </Link>
      </Text>
    </Box>
  )
}

export default Login
