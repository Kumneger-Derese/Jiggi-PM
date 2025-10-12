import {create} from 'zustand'

const useAuthStore = create((set) => {
    return {
        user: localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user'))
            : null,

        setCredentials: (data) => {
            localStorage.setItem("user", JSON.stringify(data))
            return set({user: data})
        },

        clearCredentials: () => {
            localStorage.removeItem("user")
            return set({user: null})
        },
    }
})

const useAuth = () => {
    const {user, setCredentials, clearCredentials} = useAuthStore()

    return {user, setCredentials, clearCredentials}
}

export {useAuth}