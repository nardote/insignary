import { observable, action } from 'mobx';
import api from '../api'

class fileDetailStore {

	@observable name = '';
	@observable id = '';
	@observable idReport = '';
	@observable fileDetails = {};
	

	
	@action setFile(node,idReport,token) {
		this.name = node.name;
		this.id = node.id;
		this.idReport = idReport;

		var t = this;
		//traigo los datos del archivo
		api.getResultsByReport(token,this.idReport, this.id)
			.then((response)=>{
				console.log(response)
				t.fileDetails = response
			})
	}



}


export default fileDetailStore;