import { Injectable } from '@angular/core';
import { Headers, Http,  RequestOptions, Request, RequestMethod } from '@angular/http';
import { Usuario } from '../model/usuario'


import 'rxjs/add/operator/toPromise';


@Injectable()
export class Servicios {

	private url = 'http://localhost:81'; // URL to web api api/heroes http://10.42.0.1:81  10.0.0.64 http:///knower.udenar.edu.co:81
	private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});	
	private headersPost = new Headers({'Content-Type': 'multipart/form-data'});
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http) { }

	getUsuario(formdata:FormData): Promise<Usuario> {					
		return this.http
		.post(this.url + "/getUser",formdata)
		.toPromise()
		.then(response => response.json() as Usuario)
		.catch(err => false);
	}

	getProyecto(id_usuario:string): Promise<any> {			
		return this.http.post(this.url + "/getUserProjectList", 'id_usuario=' + id_usuario, this.options)
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
				
		return this.http.post(this.url + "/getActivityList",formData)
		.toPromise()
		.then(response => response.json())
		.catch(err => false);
	}

	private handleError (error: Response | any) {
		console.log("Error In register");
	}

	createUser(formdata:FormData):Promise<any>{
		return this.http
		.post(this.url + "/CreateUser",formdata)
		.toPromise()
		.then(res => JSON.stringify(res)) 
		.catch(err => err.toString());
	}

	createProject(formdata:FormData):Promise<any>{
		return this.http
		.post(this.url + "/CreateProject",formdata)
		.toPromise()
		.then(res => res.json()) 
		.catch(err => err.toString());
	}


	createActividad(formdata:FormData):Promise<any>{
		return this.http
		.post(this.url + "/CreateActivity",formdata)
		.toPromise()
		.then(res => res.json()) 
		.catch(err => err.toString());
	}

	createMultimedia(formdata:FormData):Promise<any>{
		return this.http
		.post(this.url + "/CreateFile",formdata)
		.toPromise()
		.then(res => res.json()) 
		.catch(err => err.toString());
	}

	getMultimedia(formData:FormData): Promise<any> {
		return this.http.post(this.url + "/getFileList", formData)
		.toPromise()
		.then(response => response.json())
		.catch(err => false);
	}

	createCategoria(formdata:FormData):Promise<any>{
		return this.http
		.post(this.url + "/CreateCategory",formdata)
		.toPromise()
		.then(res => res.json()) 
		.catch(err => err.toString());
	}

	getCategoryList(formdata:FormData): Promise<any> {			
		return this.http.post(this.url + "/getCategoryList",formdata)
		.toPromise()
		.then(response => response.json())
		.catch(err => false);
	}

	regPointMap(formdata:FormData): Promise<any>{
		return this.http.post(this.url + "/regPointMap",formdata)
		.toPromise()
		.then(response => response.json())
		.catch(err => false);		
	}

	getPointList(formData:FormData): Promise<any> {
		return this.http.post(this.url + "/getPointList", formData)
		.toPromise()
		.then(response => response.json())
		.catch(err => false);
	}
	updatePointMap(formData:FormData): Promise<any> {
		return this.http.post(this.url + "/updatePointMap", formData)
		.toPromise()
		.then(response => response.json())
		.catch(err => false);
	}
} 