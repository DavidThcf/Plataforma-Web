import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { PersistenceService, StorageType } from 'angular-persistence';

import * as io from 'socket.io-client';


@Injectable()
export class ServiciosGlobales {	
	

	usuario:Usuario;
	proyecto:any;
	actividad:any;
	actividades:any;
	titulo:string;
	isSelAct:boolean = false;
	servidor:string = "http://192.168.137.1:81/";// URL to web api api/heroes http://10.42.0.1:81  10.0.0.64 http:///knower.udenar.edu.co:81
	isSubActivity:any;	
	tipo:string = 'img';
	socket = io.connect("http://192.168.137.1:81/");

	constructor(private persistenceService:PersistenceService){}

	getUserSession(usuario:Usuario){
		this.persistenceService.set('user',usuario,{type: StorageType.SESSION});
		this.usuario = usuario;
	}

	imagenes: imagen[] = [
	
	]

}

interface imagen {
	titulo: string;
	subtitulo: string;
	url: string;
	isViewMap:boolean;
}