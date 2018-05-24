// @flow

import { decorate, observable, computed, autorun } from 'mobx'

class NotificationStore {
	@observable notificationInstance: ?string

    constructor() {
        autorun(
            () => console.log(this.notificationInstance)
        )
    }

	@computed get notification(): ?string {
    	return this.notificationInstance
    }

    //Actions
    setNotification(notificationInstance: string) {
		this.notificationInstance = notificationInstance
    }
    
	clearNotification() {
		this.notificationInstance = null
	}
}
const store = new NotificationStore()
export default store