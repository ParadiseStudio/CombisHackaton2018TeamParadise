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

// export const login = (data: any) => { 
//     return {
//         method: 'post',
//         url: '/neki/levi/url',
//         headers: {
//             'Authorization': persistenceService.getToken()
//         },
//         data
//     }
// }