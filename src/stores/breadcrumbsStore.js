import { autorun, observable, computed} from 'mobx';

class userStore {
	@observable name = 'Anonimo';
	@observable lastName = '';
	@observable imgProfile = '';
	@observable email = '';


	@observable setName(name) {
		this.name = name;
	}

}


export default userStore;