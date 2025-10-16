import {toast} from "react-hot-toast";
import {arrayMove} from "@dnd-kit/sortable";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createList, deleteList, getList, getLists, reorderList, updateList} from "../api/listApi.js";

// hook to get specific list by id
const useGetList = (listId) => {
    return useQuery({
        queryKey: ['lists', listId],
        queryFn: () => getList(listId),
        enabled: !!listId,
    })
}

// hook to get all lists
const useGetLists = (projectId) => {
    return useQuery({
        queryKey: ['lists', projectId],
        queryFn: () => getLists(projectId),
        enabled: !!projectId
    })
}

// hook to reorder list
const useReorderList = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reorderList,

        //optimistic update
        onMutate: ({projectId, body}) => {
            queryClient.cancelQueries(['lists', projectId])

            const prevData = queryClient.getQueryData(['lists', projectId])

            queryClient.setQueryData(
                ['lists', projectId],
                (old) => {
                    if (!old) return old;

                    const activeIndex = old.findIndex(list => list.id === body.activeListId);
                    const overIndex = old.findIndex(list => list.id === body.overListId);

                    if (activeIndex === -1 || overIndex === -1) return old;

                    //true reordering in the cache using arrayMove
                    return arrayMove(old, activeIndex, overIndex)
                });
            return {prevData};
        },
        onSuccess: (data, variables) => {
            toast(data?.message);
            queryClient.invalidateQueries({queryKey: ['lists', variables.projectId]});
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message)
        },

    })
}

// hook to create list
const useCreateList = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createList,
        onSuccess: (d, v) => {
            toast.success('List Created.')
            queryClient.invalidateQueries({queryKey: ['lists', v.projectId]})
        },
        onError: error => {
            toast.error(error?.response?.data?.message)
        }
    })
}

// hook to update list
const useUpdateList = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateList,
        onSuccess: (d) => {
            toast.success('List Updated.')
            queryClient.invalidateQueries({queryKey: ['lists', d.projectId]})
        },
        onError: error => {
            toast.error(error?.response?.data?.message)
        }
    })
}

// hook to delete list
const useDeleteList = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteList,
        onSuccess: (d, v) => {
            toast.success('List Deleted.')
            queryClient.invalidateQueries({queryKey: ['lists', v]})
            queryClient.invalidateQueries({queryKey: ['lists', d.projectId]})
        },
        onError: error => {
            toast.error(error?.response?.data?.message)
        }
    })
}

export {useGetList, useGetLists, useCreateList, useUpdateList, useDeleteList, useReorderList}