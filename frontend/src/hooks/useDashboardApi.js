import { toast } from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  changeRole,
  getDashboardData,
  removeTeamMember
} from '../api/dashboardApi.js'

// get models 'count' for dashboard and get lists of 'team'
const useGetDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData
  })
}

//change 'role' of team member
const useChangeRole = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: changeRole,
    onSuccess: (data, variables) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['invite'] })
      queryClient.invalidateQueries({
        queryKey: ['projects', variables.projectId]
      })
    },
    onError: error => {
      toast.error(error?.response?.data?.message)
    }
  })
}

// Remove team member
const useRemoveTeamMember = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeTeamMember,
    onSuccess: (data, variables) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['invite'] })
      queryClient.invalidateQueries({
        queryKey: ['projects', variables.projectId]
      })
    },
    onError: error => {
      toast.error(error?.response?.data?.message)
    }
  })
}

export { useGetDashboardData, useChangeRole, useRemoveTeamMember }
