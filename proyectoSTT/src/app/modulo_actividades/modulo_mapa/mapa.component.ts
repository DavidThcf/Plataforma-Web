import { Component, ElementRef, NgZone, OnInit}  from '@angular/core';

import { NgModule, ViewChild } 		 from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MapsAPILoader } from '@agm/core';

import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../../services/servicios-globales';
import { Servicios }         from '../../services/servicios';

import { ServiciosGlobalesActividades} from '../servicios-globales-actividades';


import { } from 'googlemaps';

@Component({
	selector: 'mapa',
	templateUrl: './mapa.component.html',
	styleUrls: [ './mapa.component.css' ]
})

export class Mapa implements OnInit{
	zoom: number = 16; 
	categorias:any;
	categoria:any;
	http:string = this.serviciog.servidor + "Category/";
	ext:string = ".svg"	
	caracteristica: Caracteristica = new Caracteristica('','','',1);
	id_categoria:string;	
	mark:any;
	files:any;
	archivo = new Archivo('','','','','','img',null);
	public searchControl: FormControl; //variableusada en busqueda direcciones


	@ViewChild("search")
	public searchElementRef: ElementRef;
	
	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios,
		private serviGloAct:ServiciosGlobalesActividades,
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone	  
		){ };

	ngOnInit():void {
		this.categorias = null;
		this.serviGloAct.markers = [];
		this.searchControl = new FormControl();
		this.serviGloAct.categoria = null;
		this.buscarLugar();

		this.caracteristica.keym_car = this.serviciog.proyecto.keym;
		this.caracteristica.id_caracteristica = this.serviciog.proyecto.id_caracteristica;
		this.caracteristica.id_usuario_car = this.serviciog.proyecto.id_usuario;
		
		var formData = new FormData();
		formData.append('caracteristica', JSON.stringify(this.caracteristica));
		this.servicios.getCategoryList(formData)
		.then(categorias => {
			this.categorias = categorias;
			this.serviGloAct.categorias = this.categorias;
			if(categorias[0]){
				this.categoria = categorias[0];
				this.serviGloAct.categoria = this.categoria;
				this.serviGloAct.categoriaColor = this.categoria.color;	
				this.serviGloAct.categoriaNombre = this.categoria.nombre;				
			}						
		});

		var formData = new FormData();
		formData.append('caracteristica', JSON.stringify(this.serviciog.actividad));
		this.servicios.getPointList(formData)
		.then(marcador =>{						
			if(marcador){
				console.log(marcador);
				this.id_categoria = marcador[0].id_categoria;
				this.serviGloAct.markers= marcador;
			}
		});		
	}

	public addMarker(){
		
		this.serviGloAct.isModalShow = false;		
		var marker:any = {				
			keym:this.serviciog.actividad.keym,
			id_caracteristica:this.serviciog.actividad.id_caracteristica,
			id_usuario:this.serviciog.actividad.id_usuario,
			latitud: this.serviGloAct.tempLat,
			longitud: this.serviGloAct.tempLong,
			id_categoria:this.serviGloAct.categoria.id_categoria,
			url:this.http + this.serviGloAct.categoria.id_categoria + '.svg'
		};
		var formData = new FormData();
		formData.append('marcador',JSON.stringify(marker));
		formData.append('files', this.files)
		console.log(this.files)
		this.servicios.regPointMap(formData).
		then(message => {			
			if(!message){
				alert("Error al Registrar");
			}else{
				/*------Subir Imagenes ---------*/				
				this.archivo.keym = this.serviciog.actividad.keym;
				this.archivo.id_usuario = this.serviciog.actividad.id_usuario;
				this.archivo.id_caracteristica = this.serviciog.actividad.id_caracteristica;
				this.archivo.id_usuario_act = this.serviciog.usuario.id_usuario + '';
				this.archivo.id_marcador = message;	
				this.insert_images(0,marker);
				/*-----Fin Subir Imagenes--------*/
												
			}
		});
	}

	insert_images(cont,marker){
		if(cont < this.files.length){
			this.archivo.titulo = this.files[cont].name;
			var formData = new FormData();
			formData.append('archivo',JSON.stringify (this.archivo));
			formData.append('file', this.files[cont]);
			this.servicios.createMultimedia(formData)
			.then(message => {
				this.insert_images(cont+1,marker);
			});
		}else{
			/*Enviamos peticion de alerta*/
			var alerta ={
				nombre: this.serviciog.usuario.nombre + " " + this.serviciog.usuario.apellido,
				id_marcador: this.archivo.id_marcador
			}
			
			this.serviciog.socket.emit('NuevaAlerta',JSON.stringify(alerta) , function (data) {
				if (data) {
					alert(JSON.stringify(data));
					console.log(data);
				} else {
	
				}
			});
			/**Fin peticion alerta**/

			//Almacena Marcador en lista
			this.serviGloAct.markers.push(marker);

		}
	}
	public closeModal(){
		this.serviGloAct.isModalShow = false;
	}
	public categorySelect(categoria){
		this.serviGloAct.categoria = categoria;
		this.serviGloAct.categoriaColor = categoria.color;	
		this.serviGloAct.categoriaNombre = categoria.nombre;

	}

	public imageChange(event){				
		this.files = event.target.files|| event.srcElement.files;
	}


	
	mapClicked($event: any){
		this.serviGloAct.isModalShow = true;
		this.serviGloAct.tempLat = $event.coords.lat;
		this.serviGloAct.tempLong = $event.coords.lng;
	}

	buscarLugar(){
		//this.setCurrentPosition();		
		this.mapsAPILoader.load().then(() => {
			let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
				
			});
			autocomplete.addListener("place_changed", () => {
				this.ngZone.run(() => {
					//get the place result
					let place: google.maps.places.PlaceResult = autocomplete.getPlace();

					//verify result
					if (place.geometry === undefined || place.geometry === null) {
						return;
					}

					this.serviGloAct.tempLat = place.geometry.location.lat();
					this.serviGloAct.tempLong = place.geometry.location.lng();
					this.serviGloAct.lat =  place.geometry.location.lat();
					this.serviGloAct.lng = place.geometry.location.lng();
					this.serviGloAct.isModalShow = true;
					/*var marker:any = {
						id_marcador:  this.id_categoria,
						keym:this.serviciog.actividad.keym,
						id_caracteristica:this.serviciog.actividad.id_caracteristica,
						id_usuario:this.serviciog.actividad.id_usuario,
						latitud: place.geometry.location.lat(),
						longitud: place.geometry.location.lng(),
						id_categoria:this.categoria.id_categoria
					};
					this.serviGloAct.markers.push(marker);
					*/					
					
				});
			});
		});
	}

	setCurrentPosition() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				/*var marker:any = {
					id_marcador:  this.id_categoria,
					keym:this.serviciog.actividad.keym,
					id_caracteristica:this.serviciog.actividad.id_caracteristica,
					id_usuario:this.serviciog.actividad.id_usuario,
					latitud: position.coords.latitude,
					longitud: position.coords.longitude,
					id_categoria:this.categoria.id_categoria
				};

				this.serviGloAct.markers.push(marker);*/
				this.serviGloAct.tempLat = position.coords.latitude;
				this.serviGloAct.tempLong = position.coords.longitude;
				this.serviGloAct.lat = position.coords.latitude;
				this.serviGloAct.lng = position.coords.longitude;
				this.serviGloAct.isModalShow = true;
			});
		}
	}
	/*
	btnCat(category){		
		this.categoria = category;
		this.serviGloAct.categoria = category;	
		this.serviGloAct.categoriaColor = category.color;	
		this.serviGloAct.categoriaNombre = category.nombre;
	}	
	guardarPunto(marker){
		var formData = new FormData();
		formData.append('marcador',JSON.stringify(marker));
		this.servicios.updatePointMap(formData).
		then(message => {
			if(!message){
				alert("Error al actualizar");
			}else{
				this.serviGloAct.markers.push(marker);
			}
		});
	}*/
}


class Caracteristica{
	constructor(	
		public keym_car: string,
		public id_usuario_car: string,
		public id_caracteristica: string,
		public opt:number
		) {  }
}
class Archivo{
	constructor(
		public titulo:string,
		public keym:string,
		public id_usuario:string,
		public id_caracteristica:string,
		public id_usuario_act:string,
		public tipo:string,
		public id_marcador:string

		) {  }
}