import { observable, action,computed } from 'mobx';
import api from '../api'

class routerStore {

	@observable router = [];
	

	
	@action setRouter(router) {
		
		var t = this;
		t.router = [];
		var r = [];
		var path = '';
		//recorro para simplificarle a mobx
		router.map((child,k)=> {				
					if(child.title) {
						if(child.path.charAt(0) != '/') {
							//concateno el path actual con el anterior para armar la ruta rlativa al dominio
							path += '/'+child.path
						} else {
							//si ya viene relativa al dominio la pego completa
							path = child.path
						}

						r.push({title :child.title, path:path})	
					}					
				})
		t.router = r;
		
	}

	@action addRouter(title,path) {
		var t = this;
		t.router.push({title :title, path:path})	
	}

	



}


export default routerStore;