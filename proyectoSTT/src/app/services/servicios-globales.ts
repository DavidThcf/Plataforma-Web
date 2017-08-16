import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { PersistenceService, StorageType } from 'angular-persistence';



@Injectable()
export class ServiciosGlobales {	
	
	usuario:Usuario;
	proyecto:any;
	actividad:any;
	actividades:any;
	isSelAct:boolean = false;


	constructor(private persistenceService:PersistenceService){}

	getUserSession(usuario:Usuario){
		this.persistenceService.set('user',usuario,{type: StorageType.SESSION});
		this.usuario = usuario;
	}
}