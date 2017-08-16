
import { Component, OnInit}  from '@angular/core';
import { NgModule } 		 from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../../services/servicios-globales';
import { Servicios }         from '../../services/servicios';

@Component({
	selector: 'multimedia',
	templateUrl: './multimedia.component.html',
	styleUrls: [ './multimedia.component.css' ]
})

export class Multimedia implements OnInit{

	isMapSelected:boolean =false;
	imagenEditView:imagen[] = [];

	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios	  
		){ };

	ngOnInit():void {
		var formData = new FormData();
		alert(JSON.stringify(this.serviciog.actividad));
		formData.append('keym',this.serviciog.actividad.keym);
		formData.append('id_caracteristica',this.serviciog.actividad.id_caracteristica);
		formData.append('id_usuario',this.serviciog.actividad.id_usuario);

		this.servicios.getMultimedia(formData)
		.then(x => {
			alert(JSON.stringify(x));
		})

	}

	checked(imagen){
		var img = imagen;

		img.isViewMap = !img.isViewMap;	
		var sss = this.imagenEditView.findIndex(x => x === img);

		if(sss => 0){				
			this.imagenEditView.splice(sss,1)		
		}else{
			this.imagenEditView.push(img);
		}		

	}

	envioCambios(){
		this.isMapSelected = false;
		if(this.imagenEditView.length > 0){
			alert("Cambios Actualizados");
		}else{
			alert("No se realizaron Cambios");
		}
		
	}

	btnAddImgMap(){
		this.isMapSelected = true;
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

