import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { PersistenceService, StorageType } from 'angular-persistence';



@Injectable()
export class ServiciosGlobalesActividades {	
	actOpt:number = 0;
	constructor(private persistenceService:PersistenceService){}
}

