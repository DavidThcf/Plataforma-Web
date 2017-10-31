import { Component,OnInit} from '@angular/core';
import { Servicios }         from '../services/servicios';
import { AgmCoreModule } from '@agm/core';
import { ServiciosGlobales } from '../services/servicios-globales';



import {
	BrowserModule
} from '@angular/platform-browser';



@Component({
	selector: 'mapa',
	templateUrl: './mapa.component.html',
	styleUrls: [ './mapa.component.css' ]
})

export class Mapa  implements OnInit{
	lat: number = 1.2144293922395473;
	lng: number = -77.27847844362259;

	//lat: number = 0.9076
	//lng: number = -77.7601667


	zoom: number = 16;	

	proyectos:any = [];
	proyectoSelect:any;
	categorias:any=[];
	marcadores:any=[];
	marcador:any;
	http:string = this.serviciog.servidor + "Category/";
	ext:string = ".svg"

	tipo:string = "img";

	archivos:any = [];
	imagenes:any =[];

	caracteristica: Caracteristica = new Caracteristica('','','',1);

	constructor(
		private serviciog:ServiciosGlobales,
		private servicios: Servicios
		){ };

	ngOnInit():void {
		this.servicios.getVisibleProject ()
		.then(proyectos =>{
			if(proyectos){
				this.proyectos = proyectos;
			}
		});
	}

	clickCategoria(categoria){
		var formData = new FormData();
		formData.append("id_categoria",categoria.id_categoria);
		this.servicios.getMarkersListFormCategory(formData)
		.then(marcadores => {
			if(marcadores){
				this.marcadores = marcadores;
			}
		})
	}

	clickTodasCategoria(){
		this.servicios.getMarkersListFormCategory(null)
		.then(marcadores => {
			if(marcadores){
				this.marcadores = marcadores;
			}
		})
	}

	getMultimediaMarker(marcador){
		this.marcador = marcador;
		this.getArchivo();
	}

	markerClicks(marcador){

		/*----------Consigue las imagenes que muestran al inicio-----------*/
		var formData = new FormData();
		//alert(JSON.stringify(this.serviciog.actividad));
		formData.append('keym',marcador.keym);
		formData.append('id_caracteristica',marcador.id_caracteristica);
		formData.append('id_usuario',marcador.id_usuario);
		formData.append('id_marcador',marcador.id_marcador);
		formData.append('tipo',this.tipo);
		formData.append('flag', "false")

		this.servicios.getMultimedia(formData)
		.then(imagenes => {			
			if(imagenes){
				this.imagenes = imagenes
			}else{
				this.imagenes = []
			}
		});	
		/*---------------------------------FIN----------------------------------*/		
	}

	cambioProyecto(value){
		this.caracteristica.keym_car = this.proyectoSelect.keym;
		this.caracteristica.id_caracteristica = this.proyectoSelect.id_caracteristica;
		this.caracteristica.id_usuario_car = this.proyectoSelect.id_usuario;
		
		var formData = new FormData();
		formData.append('caracteristica', JSON.stringify(this.caracteristica));
		/*var formData = new FormData();
		formData.append("caracteristica",JSON.stringify(this.proyectoSelect));*/
		this.servicios.getCategoryList(formData)
		.then(categorias =>{
			if(categorias){				
				this.categorias = categorias
			}
		})
	}

	cambio($event){
		this.getArchivo();
	}

	getArchivo(){
		/*---Consigue TODA la informacion Multimedia de la de la actividad que pertence el punto--*/
		this.archivos=[];
		var formData = new FormData();

		formData.append('keym',this.marcador.keym);
		formData.append('id_caracteristica',this.marcador.id_caracteristica);
		formData.append('id_usuario',this.marcador.id_usuario);
		formData.append('tipo',this.tipo);

		this.servicios.getMultimedia(formData)
		.then(archivos => {
			if(archivos){
				this.archivos = archivos
			}
		})
		/*------------------------------------FIN----------------------------------------------------*/
	}
}
class Caracteristica{
	constructor(	
		public keym_car: string,
		public id_usuario_car: string,
		public id_caracteristica: string,
		public opt:number
		) {  }
}