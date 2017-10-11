import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { PersistenceService, StorageType } from 'angular-persistence';



@Injectable()
export class ServiciosGlobalesActividades {	
	actOpt:number = 0;
	subActividades:any = [];
	lastActividad:any;



	/*Variables para modulo mapa actividades */
	isModalShow:boolean=false;
	lat: number = 1.2144293922395473;
	lng: number = -77.27847844362259;
	tempLat: number = 0;
	tempLong:number =0;
	categoria:any;
	categorias:any;
	markers:Marker[] = [];
	categoriaColor:any="#555";
	categoriaNombre:any ="";
	nombreDireccion:string;
	/*Fin Variables para modulo mapa actividades*/



	constructor(private persistenceService:PersistenceService){}
}

interface Marker{
	keym:string,
	id_caracteristica:string,
	id_usuario:string,
	latitud: number,
	longitud: number,
	id_categoria:string
}

