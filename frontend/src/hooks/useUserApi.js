import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile
} from '../api/userApi.js'
import { toast } from 'react-hot-toast'
import { useAuth } from '../store/useAuthStore.js'

// hook to get user profile
const useGetUserProfile = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUserProfile
  })
}

//hook to register user
const useRegisterUser = () => {
  const { setCredentials } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: registerUser,

    onSuccess: data => {
      setCredentials(data)
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(`User ${data.username} is registered`)
    },

    onError: error => {
      toast.error(error?.response?.data?.message)
    }
  })
}

//hook to login user
const useLoginUser = () => {
  const { setCredentials } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: loginUser,

    onSuccess: data => {
      setCredentials(data)
      toast.success(`Welcome, ${data.username}`)
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },

    onError: error => {
      toast.error(error?.response?.data?.message)
    }
  })
}

//hook to update user profile
const useUpdateUserProfile = () => {
  const { setCredentials } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUserProfile,

    onSuccess: data => {
      setCredentials(data)
      toast.success('Profile updated')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },

    onError: error => {
      toast.success(error?.response?.message)
    }
  })
}

export {
  useGetUserProfile,
  useRegisterUser,
  useLoginUser,
  useUpdateUserProfile
}
