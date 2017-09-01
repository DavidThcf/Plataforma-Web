import { Injectable } from '@angular/core';
import { Headers, Http,  RequestOptions, Request, RequestMethod } from '@angular/http';
import { Usuario } from '../model/usuario'
import { ServiciosGlobales } from '../services/servicios-globales';


import 'rxjs/add/operator/toPromise';


@Injectable()
export class Servicios {

	private url = this.serviciog.servidor; 
	private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});	
	private headersPost = new Headers({'Content-Type': 'multipart/form-data'});
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http,private serviciog:ServiciosGlobales) { }

	getUsuario(formdata:FormData): Promise<Usuario> {					
		return this.http
		.post(this.url + "getUser",formdata)
		.toPromise()
		.then(response => response.json() as Usuario)
		.catch(err => false);
	}

	getProyecto(id_usuario:string): Promise<any> {			
		return this.http.post(this.url + "getUserProjectList", 'id_usuario=' + id_usuario, this.options)
		.toPromise()
		.then(response => response.json())
		.catch(err => false);
	}

	getActividad(keym:number,id_usuario:number,id_caracteristica:number): Promise<any> {
		var formData = new FormData();

		formData.append('keym',keym+'');
		formData.append('id_usuario',id_usuario+'');
		formData.append('id_caracteristica',id_caracteristica+'');

		//alert(formData);
				
		return this.http.post(this.url + "getActivityList",formData)
		.toPromise()
		.then(response => response.json())
		.catch(err => false);
	}

	createUser(formdata:FormData):Promise<any>{
		return this.http
		.post(this.url + "CreateUser",formdata)
		.toPromise()
		.then(res => JSON.stringify(res)) 
		.catch(err => err.toString());
	}

	createProject(formdata:FormData):Promise<any>{
		return this.http
		.post(this.url + "CreateProject",formdata)
		.toPromise()
		.then(res => res.json()) 
		.catch(err => err.toString());
	}


	createActividad(formdata:FormData):Promise<any>{
		return this.http
		.post(this.url + "CreateActivity",formdata)
		.toPromise()
		.then(res => res.json()) 
		.catch(err => err.toString());
	}

	createMultimedia(formdata:FormData):Promise<any>{
		return this.http
		.post(this.url + "CreateFile",formdata)
		.toPromise()
		.then(res => res.json()) 
		.catch(err => err.toString());
	}

	getMultimedia(formData:FormData): Promise<any> {
		return this.http.post(this.url + "getFileList", formData)
		.toPromise()
		.then(response => response.json())
		.catch(err => false);
	}

	createCategoria(formdata:FormData):Promise<any>{
		return this.http
		.post(this.url + "CreateCategory",formdata)
		.toPromise()
		.then(res => res.json()) 
		.catch(err => err.toString());
	}

	getCategoryList(formdata:FormData): Promise<any> {			
		return this.http.post(this.url + "getCategoryList",formdata)
		.toPromise()
		.then(response => response.json())
		.catch(err => false);
	}

	regPointMap(formdata:FormData): Promise<any>{
		return this.http.post(this.url + "regPointMap",formdata)
		.toPromise()
		.then(response => response.json())
		.catch(err => false);		
	}

	getPointList(formData:FormData): Promise<any> {
		return this.http.post(this.url + "getPointList", formData)
		.toPromise()
		.then(response => response.json())
		.catch(err => false);
	}
	updatePointMap(formData:FormData): Promise<any> {
		return this.http.post(this.url + "updatePointMap", formData)
		.toPromise()
		.then(response => response.json())
		.catch(err => false);
	}

	getVisibleProject():Promise<any>{
		return this.http.post(this.url +"getVisibleProjects",null)
		.toPromise()
		.then(response => response.json())
		.catch(err => false)
	}

	getMarkersListFormCategory(formData:FormData):Promise<any>{
		return this.http.post(this.url +"getMarkersListFromCategory",formData)
		.toPromise()
		.then(response => response.json())
		.catch(err => false)
	}
	updatePercentage(formData:FormData):Promise<any>{
		return this.http.post(this.url +"updatePercentage",formData)
		.toPromise()
		.then(response => response.json())
		.catch(err => false)
	}

	updateCaracteristica(formData:FormData):Promise<any>{
		return this.http.post(this.url +"updateCharacteristic",formData)
		.toPromise()
		.then(response => response.json())
		.catch(err => false)
	}

	getPercentage(formData:FormData):Promise<any>{
		return this.http.post(this.url +"getPercentage",formData)
		.toPromise()
		.then(response => response.json())
		.catch(err => false)
	}

 	getUserList(formData:FormData):Promise<any>{
		return this.http.post(this.url +"getUserList",null)
		.toPromise()
		.then(response => response.json())
		.catch(err => false)
	}

	assignActivityToUser(formData:FormData):Promise<any>{
		return this.http.post(this.url +"assignActivityToUser",formData)
		.toPromise()
		.then(response => response.json())
		.catch(err => false)
	}

} 