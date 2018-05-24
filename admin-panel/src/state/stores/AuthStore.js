// @flow

import { decorate, observable, computed, autorun } from 'mobx'

type User = {
    email: string,
    token: string
}
class AuthStore {
	@observable user: User

    constructor() {
        autorun(
            () => console.log(this.user)
        )
    }

	@computed get User(): User {
    	return this.user
    }
    
    @computed get isLoggedIn(): boolean {
    	return !!this.user
    }

    //Actions
	setUser(user: User) {
		this.user = user
	}
}
const store = new AuthStore()
export default store