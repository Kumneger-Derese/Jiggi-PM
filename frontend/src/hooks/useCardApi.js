import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createCard, deleteCard, getCard, getCards, moveCard, reorderCard, updateCard} from "../api/cardApi.js";
import {toast} from "react-hot-toast";
import {arrayMove} from "@dnd-kit/sortable";

// hook to get a specific card
const useGetCard = (cardId) => {
    return useQuery({
        queryKey: ['cards', cardId],
        queryFn: () => getCard(cardId),
        enabled: !!cardId,
    })
}

// hook to all cards
const useGetCards = (listId) => {
    return useQuery({
        queryKey: ['cards', listId],
        queryFn: () => getCards(listId),
        enabled: !!listId,
    })
}

// hook to create card
const useCreateCard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCard,
        onSuccess: (result) => {
            toast.success('Card created successfully.');
            queryClient.invalidateQueries({queryKey: ['cards', result.id]});
            queryClient.invalidateQueries({queryKey: ['cards', result.listId]});
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message);
        }
    })
}

// hook to move card between lists
const useMoveCard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: moveCard,
        onSuccess: (result, variables) => {
            toast.success(result.message);
            queryClient.invalidateQueries({queryKey: ['cards', variables.activeId]});
            queryClient.invalidateQueries({queryKey: ['cards', variables.newListId]});
        },
        onError: (error, vars, context) => {
            console.log({vars, context})
            // if (context?.prevData) {
            //     queryClient.setQueryData(['cards', vars.listId], context.prevData);
            // }
            toast.error(error?.response?.data?.message);
        }
    })
}

// hook to reorder card
const useReorderCard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reorderCard,

        //optimistic update
        onMutate: (result) => {
            const {activeCardId, overCardId, listId} = result

            queryClient.cancelQueries(['cards', listId])

            const prevData = queryClient.getQueryData(['cards', listId])

            queryClient.setQueryData(
                ['cards', listId],
                (old) => {
                    if (!old) return old;

                    const activeCardIndex = old.findIndex(card => card.id === activeCardId);
                    const overCardIndex = old.findIndex(card => card.id === overCardId);

                    if (activeCardIndex === -1 || overCardIndex === -1) return old;

                    return arrayMove(old, activeCardIndex, overCardIndex)
                });
            return {prevData}
        },
        onSuccess: (result, vars) => {
            toast(result.message);
            queryClient.invalidateQueries({queryKey: ['cards', vars.activeCardId]});
            queryClient.invalidateQueries({queryKey: ['cards', vars.listId]});
        },
        onError: (error, vars, context) => {
            if (context?.prevData) {
                queryClient.setQueryData(['cards', vars.listId], context.prevData);
            }
            toast.error(error?.response?.data?.message);
        }
    })
}

// hook to create card
const useUpdateCard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCard,
        onSuccess: (result) => {
            toast.success('Card updated.');
            queryClient.invalidateQueries({queryKey: ['cards', result.id]});
            queryClient.invalidateQueries({queryKey: ['cards', result.listId]});
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message);
        }
    })
}

// hook to delete card
const useDeleteCard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCard,
        onSuccess: (result, vars) => {
            console.log({result});
            console.log({vars});
            toast.success('Card deleted.');
            queryClient.invalidateQueries({queryKey: ['cards', vars]});
            queryClient.invalidateQueries({queryKey: ['cards', result.listId]});
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message);
        }
    })
}

export {useGetCard, useGetCards, useCreateCard, useUpdateCard, useDeleteCard, useReorderCard, useMoveCard}