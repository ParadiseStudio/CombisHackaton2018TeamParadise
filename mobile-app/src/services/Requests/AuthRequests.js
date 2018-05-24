export const login = (data: { email: string, password: string }) => {
    return {
        method: 'post',
        url: '/auth/login',
        data
    }
}

export const register = (data: { username: string, email: string, password: string }) => {
    return {
        method: 'post',
        url: '/auth/register',
        data
    }
}

export const getDonators = () => { 
    return {
        method: 'get',
        url: '/donators/all'
    }
}