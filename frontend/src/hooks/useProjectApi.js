import { toast } from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject
} from '../api/projectApi.js'

// hook to get all projects
const useGetProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })
}

// hook to get one project
const useGetProject = projectId => {
  return useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => getProject(projectId)
  })
}

// hook to create project
const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProject,

    onSuccess: async () => {
      toast.success('Project Created.')
      await queryClient.invalidateQueries({ queryKey: ['projects'] })
    },

    onError: error => {
      toast.error(error?.response?.data?.message)
    }
  })
}

//hook to update project
const useUpdateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProject,

    onSuccess: async (data, variables) => {
      toast.success('Project Updated.')
      await queryClient.invalidateQueries({ queryKey: ['projects'] })
      await queryClient.invalidateQueries({
        queryKey: ['projects', variables.projectId]
      })
    },

    onError: error => {
      toast.error(error?.response?.data?.message)
    }
  })
}

//hook to delete project
const useDeleteProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProject,

    onSuccess: async (data, variables) => {
      toast.success('Project Deleted.')
      await queryClient.invalidateQueries({ queryKey: ['projects'] })
      await queryClient.invalidateQueries({ queryKey: ['projects', variables] })
    },

    onError: error => {
      toast.error(error?.response?.data?.message)
    }
  })
}

export {
  useGetProject,
  useGetProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject
}
