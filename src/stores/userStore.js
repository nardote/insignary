import { observable, action, computed } from 'mobx';
import api from '../api'

class userStore {
	@observable id = '';
	@observable name = '';
	@observable image_thumb = '';
	@observable image_medium = '';
	@observable email = '';
	@observable access_token ='';
	@observable token_type ='';
	@observable expires_in ='';
	@observable refresh_token ='';

	@computed get displayName() {
		return `${this.name} ${this.lastName}`;
	}

	@action setName(name) {
		this.name = name;
	}

	@action setUserProfile(profile) {
		this.id = profile.id;
		this.name = profile.email;
		this.image_thumb = profile.image_thumb;
		this.image_medium = profile.image_medium;
		this.email = profile.email;
	}

	@action setSession(session) {
		this.access_token = session.access_token;
		this.token_type = session.token_type;

		localStorage.setItem('session', JSON.stringify(session))

		api.getUserProfile(this.access_token)
              .then((response)=>{

                  this.setUserProfile(response);
                  this.setUserProfile(response.response);

              })
	}

	getValidSession() {
		return new Promise((resolve, reject) => {
			let storageSession = {};
			if(localStorage.getItem('session')){
				storageSession = JSON.parse(localStorage.getItem('session'))
				const now = Date.now();
				const expiration = (storageSession.created_at+storageSession.expires_in)*1000
				if(now > expiration){
					api.refreshToken(storageSession.refresh_token)
					.then((response)=>{
						if(response.error) reject()

						resolve(response)
					})
				} else {
					this.setSession(storageSession)
					resolve()
				}
				

			} else {
				reject()
			}
		})
	}

}


export default userStore;