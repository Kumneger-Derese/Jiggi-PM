import {toast} from "react-hot-toast";
import {arrayMove} from "@dnd-kit/sortable";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createCard, deleteCard, getCard, getCards, moveCard, reorderCard, updateCard} from "../api/cardApi.js";

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
const useMoveCard = (activeCard) => {
    const queryClient = useQueryClient();
    const oldListId = activeCard?.listId;

    return useMutation({
        mutationFn: moveCard,
        onMutate: async (variables) => {
            const {activeCardId, newListId} = variables;

            let oldListId = null;
            let cardToMove = null;

            // Find the list the card is currently in. We check all cached 'cards' queries.
            const cardsQueryKeys =
                queryClient.getQueryCache().findAll(['cards']).map(query => query.queryKey);

            for (const queryKey of cardsQueryKeys) {
                const listId = queryKey[1]; // Assuming queryKey structure is ['cards', listId]
                const cardsData = queryClient.getQueryData(queryKey);

                if (cardsData) {
                    const card = cardsData.find(c => c.id === activeCardId);
                    if (card) {
                        oldListId = listId;
                        cardToMove = card;
                        break;
                    }
                }
            }

            if (!oldListId || !cardToMove) {
                // Cannot perform optimistic update without knowing the old list
                return {};
            }

            // 2. Cancel any outgoing refetches for both old and new lists
            await queryClient.cancelQueries({queryKey: ['cards', oldListId]});
            await queryClient.cancelQueries({queryKey: ['cards', newListId]});

            // 3. Create context to store the previous state for rollback
            const previousCardsData = {
                oldList: queryClient.getQueryData(['cards', oldListId]),
                newList: queryClient.getQueryData(['cards', newListId]),
            };

            // 4. Optimistically update the OLD list (remove the card)
            queryClient.setQueryData(['cards', oldListId], (old) =>
                old ? old.filter(card => card.id !== activeCardId) : []
            );

            // 5. Optimistically update the NEW list (add the card)
            queryClient.setQueryData(['cards', newListId], (old) => {
                const newCard = {
                    ...cardToMove,
                    listId: newListId,
                    // You might set a temporary position here if needed, but invalidation will fix it
                };
                return old ? [...old, newCard].sort((a, b) => a.position - b.position) : [newCard];
            });

            // Return context object to be used by onError
            return {previousCardsData};
        },
        onSuccess: (result, variables) => {
            toast(result.message);
            queryClient.invalidateQueries({queryKey: ['cards', variables?.activeCardId]});
            queryClient.invalidateQueries({queryKey: ['cards', variables?.newListId]});
            queryClient.invalidateQueries({queryKey: ['cards', oldListId]});
        },
        onError: (error, variables, context) => {
            toast.error(error?.response?.data?.message);

            // Rollback: Revert the UI state using the cached context
            if (context?.previousCardsData) {
                const {oldList, newList} = context.previousCardsData;

                if (oldList) {
                    queryClient.setQueryData(['cards', oldListId], oldList)
                }

                if (newList) {
                    queryClient.setQueryData(['cards', variables.newListId], newList)
                }
            }
        },
    })
}

// hook to reorder card
const useReorderCard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reorderCard,

        //optimistic update
        onMutate: async (variables) => {
            const {activeCardId, overCardId, listId} = variables

            await queryClient.cancelQueries({queryKey: ['cards', listId]})

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