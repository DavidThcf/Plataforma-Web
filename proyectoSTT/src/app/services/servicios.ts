import { Injectable } from '@angular/core';
import { Headers, Http,  RequestOptions, Request, RequestMethod } from '@angular/http';
import { Usuario } from '../model/usuario'
import { Proyecto } from '../model/proyecto'


import 'rxjs/add/operator/toPromise';


@Injectable()
export class Servicios {

	private heroesUrl = 'http://localhost:81';  // URL to web api api/heroes http://localhost:81/	
	private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});	
	private headersPost = new Headers({'Content-Type': 'multipart/form-data'});
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

	createUser(usuario:Usuario):Promise<any>{
		

		var options = new RequestOptions({ headers: this.headers});
		return this.http
		.post(this.heroesUrl + "/CreateUser",'json=' + JSON.stringify(usuario) ,options)
		.toPromise()
		.then(res => res.json().data as Usuario)
		.catch(this.handleError);
	}
}
/*
createUser(usuario:Usuario):Promise<any>{
		var user = JSON.stringify(	{
			password: usuario.pass,
			administrador: false,
			email: usuario.e_mail,
			nombre: usuario.nombre,
			apellido: usuario.apellido,
			genero: usuario.genero,
			cargo: usuario.cargo,
			telefono: usuario.telefono,
			entidad: usuario.entidad,
			imagen: '',
			diponible: true
		});
		alert(user);

		var options = new RequestOptions({ headers: this.headers});

		return this.http
		.post(this.heroesUrl + "/CreateUser",'json=' + user, options )
		.toPromise()
		.then(res => res.json().data as Usuario)
		.catch(this.handleError);
	}*/