import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {acceptInvite, invitedProjects, sendInvite, verifyInvite} from "../api/inviteApi.js";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const useSendInvite = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: sendInvite,
        onSuccess: (result) => {
            toast.success(result.message)
            queryClient.invalidateQueries({queryKey: ['invite']})
        },
        onError: (error) => {
            toast.error(error.response?.data?.message)
        }
    })
}

const useVerifyInvite = (token) => {
    return useQuery({
        queryKey: ['invite', token],
        queryFn: () => verifyInvite(token),
        enabled: !!token
    })
}

const useInvitedProjects = () => {
    return useQuery({
        queryKey: ['invite'],
        queryFn: invitedProjects,
    })
}

const useAcceptInvite = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: acceptInvite,
        onSuccess: async (result, variables) => {
            toast.success(result.message)
            navigate('/projects')
            await queryClient.invalidateQueries({queryKey: ['invite']})
            await queryClient.invalidateQueries({queryKey: ['invite', variables.token]})
        },
        onError: (error) => {
            toast.error(error.response?.data?.message)
        }
    })
}

export {useSendInvite, useVerifyInvite, useAcceptInvite, useInvitedProjects}