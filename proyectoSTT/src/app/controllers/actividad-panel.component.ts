import { Component, OnInit}  from '@angular/core';
import { NgModule } 		 from '@angular/core';
import { Router }            from '@angular/router';
import { ServiciosGlobales } from '../services/servicios-globales';
import { Servicios }         from '../services/servicios';
import { AgmCoreModule } from '@agm/core';


@Component({
	selector: 'actividad-panel',
	templateUrl: '../views/actividad-panel.component.html',
	styleUrls: [ '../src/css/actividad-panel.component.css' ]
})

export class ActividadPanel {
	subActivity:boolean = true;
	report:boolean = false;
	multimedia:boolean = false;
	estadistic:boolean = false;
	map:boolean = false;
	isSelAct:boolean = false;
	icon_marker:string = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI1NiwwQzE1My43NTUsMCw3MC41NzMsODMuMTgyLDcwLjU3MywxODUuNDI2YzAsMTI2Ljg4OCwxNjUuOTM5LDMxMy4xNjcsMTczLjAwNCwzMjEuMDM1ICAgIGM2LjYzNiw3LjM5MSwxOC4yMjIsNy4zNzgsMjQuODQ2LDBjNy4wNjUtNy44NjgsMTczLjAwNC0xOTQuMTQ3LDE3My4wMDQtMzIxLjAzNUM0NDEuNDI1LDgzLjE4MiwzNTguMjQ0LDAsMjU2LDB6IE0yNTYsMjc4LjcxOSAgICBjLTUxLjQ0MiwwLTkzLjI5Mi00MS44NTEtOTMuMjkyLTkzLjI5M1MyMDQuNTU5LDkyLjEzNCwyNTYsOTIuMTM0czkzLjI5MSw0MS44NTEsOTMuMjkxLDkzLjI5M1MzMDcuNDQxLDI3OC43MTksMjU2LDI3OC43MTl6IiBmaWxsPSIjMjc1ZTAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=='


	constructor(
		private serviciog:ServiciosGlobales,
		private router:Router,
		private servicios: Servicios	  
		){
		if(!serviciog.usuario){
			//let link = [''];
			//router.navigate(link);
		}else{
			this.servicios.getProyecto(serviciog.usuario.id_usuario + '')
			.then(cadena => this.serviciog.proyecto = cadena);
		}	
	};


	public barChartOptions:any = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	public barChartType:string = 'bar';
	public barChartLegend:boolean = true;

	public barChartData:any[] = [
	{data: [65, 59, 80, 81, 56, 55, 40], label: 'Categoria 1'},
	{data: [28, 48, 40, 19, 86, 27, 90], label: 'Categoria 2'},
	{data: [28, 48, 40, 19, 86, 27, 92], label: 'Categoria 3'}
	];

	public barColor:any[] = [
	{backgroundColor: 'rgba(9,128,1,.8)'},
	{backgroundColor: 'rgba(255,255,1,.8)'}, 
	{backgroundColor: 'rgba(254,0,0,.8)'},
	{backgroundColor: '#4d86dc'}, 
	{backgroundColor: '#f3af37'}
	];



	title: string = 'My first AGM project';
	lat: number = 1.21;
	lng: number = -77.267;
	zoom: number = 14; 

	
	c1(){
		this.subActivity = true;
		this.report = false;
		this.multimedia = false;
		this.estadistic = false;
		this.map = false;
	}
	c2(){
		this.subActivity = false;
		this.report = true;
		this.multimedia = false;
		this.estadistic = false;
		this.map = false;
	}
	c3(){
		this.subActivity = false;
		this.report = false;
		this.multimedia = true;
		this.estadistic = false;
		this.map = false;
	}

	c4(){		
		this.subActivity = false;
		this.report = false;
		this.multimedia = false;
		this.estadistic = true;
		this.map = false;
	}
	c5(){
		this.subActivity = false;
		this.report = false;
		this.multimedia = false;
		this.estadistic = false;
		this.map = true;
	}
	entrar(){

	}

	btnCat1(){
		this.icon_marker = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI1NiwwQzE1My43NTUsMCw3MC41NzMsODMuMTgyLDcwLjU3MywxODUuNDI2YzAsMTI2Ljg4OCwxNjUuOTM5LDMxMy4xNjcsMTczLjAwNCwzMjEuMDM1ICAgIGM2LjYzNiw3LjM5MSwxOC4yMjIsNy4zNzgsMjQuODQ2LDBjNy4wNjUtNy44NjgsMTczLjAwNC0xOTQuMTQ3LDE3My4wMDQtMzIxLjAzNUM0NDEuNDI1LDgzLjE4MiwzNTguMjQ0LDAsMjU2LDB6IE0yNTYsMjc4LjcxOSAgICBjLTUxLjQ0MiwwLTkzLjI5Mi00MS44NTEtOTMuMjkyLTkzLjI5M1MyMDQuNTU5LDkyLjEzNCwyNTYsOTIuMTM0czkzLjI5MSw0MS44NTEsOTMuMjkxLDkzLjI5M1MzMDcuNDQxLDI3OC43MTksMjU2LDI3OC43MTl6IiBmaWxsPSIjMjc1ZTAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=='
		alert("Categoria 1 Seleccionada");
	}

	btnCat2(){
		this.icon_marker = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI1NiwwQzE1My43NTUsMCw3MC41NzMsODMuMTgyLDcwLjU3MywxODUuNDI2YzAsMTI2Ljg4OCwxNjUuOTM5LDMxMy4xNjcsMTczLjAwNCwzMjEuMDM1ICAgIGM2LjYzNiw3LjM5MSwxOC4yMjIsNy4zNzgsMjQuODQ2LDBjNy4wNjUtNy44NjgsMTczLjAwNC0xOTQuMTQ3LDE3My4wMDQtMzIxLjAzNUM0NDEuNDI1LDgzLjE4MiwzNTguMjQ0LDAsMjU2LDB6IE0yNTYsMjc4LjcxOSAgICBjLTUxLjQ0MiwwLTkzLjI5Mi00MS44NTEtOTMuMjkyLTkzLjI5M1MyMDQuNTU5LDkyLjEzNCwyNTYsOTIuMTM0czkzLjI5MSw0MS44NTEsOTMuMjkxLDkzLjI5M1MzMDcuNDQxLDI3OC43MTksMjU2LDI3OC43MTl6IiBmaWxsPSIjZmZjYzAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==';		
		alert("Categoria 2 Seleccionada");	
	}

	btnCat3(){
		this.icon_marker = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI1NiwwQzE1My43NTUsMCw3MC41NzMsODMuMTgyLDcwLjU3MywxODUuNDI2YzAsMTI2Ljg4OCwxNjUuOTM5LDMxMy4xNjcsMTczLjAwNCwzMjEuMDM1ICAgIGM2LjYzNiw3LjM5MSwxOC4yMjIsNy4zNzgsMjQuODQ2LDBjNy4wNjUtNy44NjgsMTczLjAwNC0xOTQuMTQ3LDE3My4wMDQtMzIxLjAzNUM0NDEuNDI1LDgzLjE4MiwzNTguMjQ0LDAsMjU2LDB6IE0yNTYsMjc4LjcxOSAgICBjLTUxLjQ0MiwwLTkzLjI5Mi00MS44NTEtOTMuMjkyLTkzLjI5M1MyMDQuNTU5LDkyLjEzNCwyNTYsOTIuMTM0czkzLjI5MSw0MS44NTEsOTMuMjkxLDkzLjI5M1MzMDcuNDQxLDI3OC43MTksMjU2LDI3OC43MTl6IiBmaWxsPSIjZDQwODJlIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==';
		alert("Categoria 3 Seleccionada");
	}

	btnSelMap(){
		this.isSelAct = !this.isSelAct;
		if(!this.isSelAct){
			alert("Actualización Correcta");
		}
	}

	clickedMarker(label: string, index: number) {
		
	}
	
	mapClicked($event: any){	
		
		this.markers.pop();	
		this.markers.push({
			lat:  $event.coords.lat,
			lng:  $event.coords.lng,
			draggable: false,
			url: this.icon_marker
		});
		alert("Punto Registrado Correctamente");	
	}

	
	markers: marker[] = [
	{
		lat: 1.21,
		lng: -77.264,		
		draggable: true,
		url: this.icon_marker
	},
	]

}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
	url?: string;
	color?:string;
}