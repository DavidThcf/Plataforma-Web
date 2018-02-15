import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { PersistenceService, StorageType } from 'angular-persistence';

import * as io from 'socket.io-client';


@Injectable()
export class ServiciosGlobales {
	usuario:Usuario;
	proyecto:any;
	proyectos_publico:any;
	proyecto_publico:any;
	actividad:any;
	actividades:any;
	titulo:string;
	isSelAct:boolean = false;
	servidor:string = "http://190.254.4.45:81/";// URL to web api api/heroes http://190.254.4.45:81  10.0.0.64 http:///knower.udenar.edu.co:81
	isSubActivity:any;	
	tipo:string = 'img';
	socket = io.connect("http://190.254.4.45:81/");
	alertCont:number = 0;
	alert:any = 0;
	marcadorAlerta:any;
	isAlertShow:boolean = false;
	alertMessage:string = "";
	alertM:string = "";
	

	/*--------Variables Actividades Permisos ----------*/
	permisoPublicar:boolean = false;
	permisoReporte:boolean = false;
	permisoCategorias:boolean = false;
	permisoMultimedia:boolean = false;
	permisoMapa:boolean = false;
	permisoPorcentajes:boolean = false;
	permisoEstadisticas:boolean = false;
	/* ----------Fin Variables Actividades Permisos ----------*/


	/*-------------Variables Desarrollo------------------------*/
	showModalLogin:boolean = false;
	showModalRegistro:boolean = false;
	showModalRegistroProyecto:boolean = false;
	showModalRegistroActividad:boolean = false;
	showModalRegistroMultimedia:boolean= false;
	showModalRestart:boolean = false;
	/*-------------Fin Variables Desarrollo---------------------*/

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