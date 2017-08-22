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
	servidor:string = "http://localhost:81/";	

	constructor(private persistenceService:PersistenceService){}

	getUserSession(usuario:Usuario){
		this.persistenceService.set('user',usuario,{type: StorageType.SESSION});
		this.usuario = usuario;
	}

	imagenes: imagen[] = [
	{
		titulo: "imagen 1",
		subtitulo: "Imagen Transito",
		url: "http://knower.udenar.edu.co/imgSTT/95-1-5.jpg",
		isViewMap: false
	},
	{
		titulo: "imagen 2",
		subtitulo: "Imagen Transito",
		url: "http://knower.udenar.edu.co/imgSTT/95-2-5.jpg",
		isViewMap: false
	},
	{
		titulo: "imagen 8",
		subtitulo: "Imagen Transito",
		url: "http://knower.udenar.edu.co/imgSTT/95-3-5.jpg",
		isViewMap: false
	},
	{
		titulo: "imagen 3",
		subtitulo: "Imagen Transito",
		url: "http://knower.udenar.edu.co/imgSTT/95-4-5.jpg",
		isViewMap: true
	},
	{
		titulo: "imagen 4",
		subtitulo: "Imagen Transito",
		url: "http://knower.udenar.edu.co/imgSTT/95-5-5.jpg",
		isViewMap: false
	},
	{
		titulo: "imagen 5",
		subtitulo: "Imagen Transito",
		url: "http://knower.udenar.edu.co/imgSTT/95-6-5.jpg",
		isViewMap: false
	},
	{
		titulo: "imagen 6",
		subtitulo: "Imagen Transito",
		url: "http://knower.udenar.edu.co/imgSTT/95-7-5.jpg",
		isViewMap: false
	},
	{
		titulo: "imagen 7",
		subtitulo: "Imagen Transito",
		url: "http://knower.udenar.edu.co/imgSTT/95-1-5.jpg",
		isViewMap: false
	}
	]

}

interface imagen {
	titulo: string;
	subtitulo: string;
	url: string;
	isViewMap:boolean;
}