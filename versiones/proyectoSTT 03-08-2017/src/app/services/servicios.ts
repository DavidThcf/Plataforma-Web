import { Injectable } from '@angular/core';
import { Headers, Http,  RequestOptions, Request, RequestMethod } from '@angular/http';
import { Usuario } from '../model/usuario'
import { Proyecto } from '../model/proyecto'


import 'rxjs/add/operator/toPromise';


@Injectable()
export class Servicios {

	private heroesUrl = 'http://localhost:81';  // URL to web api api/heroes http://localhost:81/	
	private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});	
	private options = new RequestOptions({ headers: this.headers });
    
    
	constructor(private http: Http) { }

	getUsuario(email:string, password:string): Promise<Usuario> {
		const url = `${this.heroesUrl}/${email}/${password}`;		
		return this.http.get(url,this.options)
		.toPromise()
		.then(response => response.json() as Usuario)
		.catch(this.handleError);
	}


	getProyecto(id_usuario:string): Promise<any> {
		const url = `${this.heroesUrl}/${id_usuario}`;		
		return this.http.get(url,this.options)
		.toPromise()
		.then(response => response.json() as Proyecto[])
		.catch();
	}

	private handleError (error: Response | any) {
		console.log("Error In register");

	}
}