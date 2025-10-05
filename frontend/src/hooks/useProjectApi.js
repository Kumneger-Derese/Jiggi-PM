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
    queryFn: () => getProject(projectId),
    enabled: !!projectId
  })
}

// hook to create project
const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProject,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Project Created.')
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

    onSuccess: (data, vaiables) => {
      toast.success('Project Updated.')
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({
        queryKey: ['projects', vaiables.projectId]
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

    onSuccess: (data, vaiables) => {
      toast.success('Project Deleted.')
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['projects', vaiables] })
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
