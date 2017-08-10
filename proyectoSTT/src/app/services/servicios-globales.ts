import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Proyecto } from '../model/proyecto';
import { PersistenceService, StorageType } from 'angular-persistence';



@Injectable()
export class ServiciosGlobales {	
	
	usuario:Usuario;
	proyecto:Proyecto;
	actividades:any;
	constructor(private persistenceService:PersistenceService){}

	getUserSession(usuario:Usuario){
		this.persistenceService.set('user',usuario,{type: StorageType.SESSION});
		this.usuario = usuario;
	}


}