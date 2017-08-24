import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { PersistenceService, StorageType } from 'angular-persistence';



@Injectable()
export class ServiciosGlobales {	
	
	usuario:Usuario;
	proyecto:any;
	actividad:any;
	actividades:any;
	titulo:string;
	isSelAct:boolean = false;
	servidor:string = "http://localhost:81/";
	isSubActivity:any;	
	tipo:string = 'img';

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