
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { Router } from '@angular/router';
import { ServiciosGlobales } from '../services/servicios-globales';
import { Servicios } from '../services/servicios';
import { ServiciosGlobalesActividades } from './servicios-globales-actividades'
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';

import { Mapa } from './modulo_mapa/mapa.component';

@Component({
	selector: 'actividad-panel',
	templateUrl: './actividad-panel.component.html',
	styleUrls: ['./actividad-panel.component.css']
})

export class ActividadPanel implements OnInit {
	miPorcentaje: number = 100;
	porcentajeAsignado: number = 0;
	flag: boolean = true;
	isEditar: boolean = false;
	isSubActivity: any = [];
	subActivity: any = 0;
	usuarios: any = []
	isSearch: boolean = false;
	actividades: any;
	porcentaje_ejecutado: number;
	http: string = this.serviciog.servidor + "Category/";
	nombreUsuario: string = "";
	public nombreDireccion: string = "";
	documentName: string = "Cargar Archivo PDF";
	documentNameValid: string;
	files: any;
	reporte:Reporte = new Reporte('','','');
	reportdir:string;
	url:SafeResourceUrl;

	constructor(
		private serviciog: ServiciosGlobales,
		private serviGloAct: ServiciosGlobalesActividades,
		private router: Router,
		private servicios: Servicios,
		private mapa: Mapa,
		public sanitizer:DomSanitizer
	) {
	};




	ngOnInit(): void {
		this.nombreUsuario = this.serviciog.usuario.nombre + " " + this.serviciog.usuario.apellido;
		this.serviciog.actividades = [];
		this.serviciog.actividad = null;
		this.serviciog.isSelAct = false;
		this.serviciog.isSubActivity = null;
		this.serviciog.isSelAct = false;
		this.serviGloAct.actOpt = 0;


		if (this.serviciog.proyecto) {
			this.serviciog.titulo = this.serviciog.proyecto.nom_pro;
			var keym = this.serviciog.proyecto.keym;
			var id_usuario = this.serviciog.proyecto.id_usuario;
			var id_caracteristica = this.serviciog.proyecto.id_caracteristica;

			this.servicios.getActividad(keym, id_usuario, id_caracteristica)
				.then(actividades => {
					if (actividades) {
						this.serviciog.actividades = actividades;
						this.calculateValue(this.serviciog.actividades);
					}
				});
		} else {
			let link = ['administrador'];
			this.router.navigate(link);
		}
	}

	actualizarActividad(actividad) {
		var isUpdatePercentage = false;
		this.isEditar = !this.isEditar;
		////se comprueba si ubieron cambios en el porcentaje ejecutado
		if (this.porcentaje_ejecutado != actividad.porcentaje_cumplido) {
			this.porcentaje_ejecutado = actividad.porcentaje_cumplido - this.porcentaje_ejecutado;
			//this.porcentaje_ejecutado = this.porcentaje_ejecutado * (actividad.porcentaje/100);

			isUpdatePercentage = true;
			console.log(this.porcentaje_ejecutado);
			alert("entra cambios")
		}

		var formData = new FormData();
		formData.append("actividad", JSON.stringify(actividad));
		formData.append("porcentaje_cumplido", JSON.stringify(this.porcentaje_ejecutado));
		formData.append("isUpdatePercentage", JSON.stringify(isUpdatePercentage));

		this.servicios.updateCaracteristica(formData)
			.then(message => {
				alert(JSON.stringify(message));
			});
	}

	editarClick(actividad) {
		this.isEditar = !this.isEditar;
		this.porcentaje_ejecutado = actividad.porcentaje_cumplido;
	}

	onSelectActivity(activity) {

		this.miPorcentaje = 100;
		this.porcentajeAsignado = 0;
		this.serviciog.actividad = activity;
		this.serviciog.isSelAct = true;
		this.serviGloAct.actOpt = 1;
		this.serviGloAct.subActividades = [];

		var keym = activity.keym;
		var id_usuario = activity.id_usuario;
		var id_caracteristica = activity.id_caracteristica;
		this.serviciog.permisoPublicar = activity.public;
		this.serviciog.permisoReporte = activity.p_reporte;
		this.serviciog.permisoCategorias = activity.p_categorias;
		this.serviciog.permisoMultimedia = activity.p_multimedia;
		this.serviciog.permisoMapa = activity.p_mapa;
		this.serviciog.permisoPorcentajes = activity.p_porcentajes;
		this.serviciog.permisoEstadisticas = activity.p_estadisticas;


		this.servicios.getActividad(keym, id_usuario, id_caracteristica)
			.then(actividades => {
				if (actividades) {
					this.serviGloAct.subActividades = actividades;
					this.calculateValue(actividades);
				}
			});
	}

	search(term: string) {
		if (term != '') {
			this.isSearch = true
		}
		this.actividades = this.serviciog.actividades.filter(
			item => item.nom_act.toLowerCase().indexOf(term.toLowerCase()) !== -1
		);
	}


	valPor(flag, i) {
		if (flag) {
			if (this.serviciog.actividades[i].porcentaje < 0) {
				this.serviciog.actividades[i].porcentaje = 0;
				this.calculateValue(this.serviciog.actividades);
			} else if (this.serviciog.actividades[i].porcentaje > 100) {
				this.serviciog.actividades[i].porcentaje = 100;
				this.calculateValue(this.serviciog.actividades);
			} else {
				this.calculateValue(this.serviciog.actividades);
			}
		} else {
			this.calculateValue(this.serviGloAct.subActividades);
		}
	}

	tituloClick() {
		if (!this.serviciog.isSubActivity) {
			this.serviciog.isSelAct = false;
			this.serviGloAct.actOpt = 0;

			this.serviciog.permisoPublicar = this.serviciog.proyecto.public;
			this.serviciog.permisoReporte = this.serviciog.proyecto.p_reporte;
			this.serviciog.permisoCategorias = this.serviciog.proyecto.p_categorias;
			this.serviciog.permisoMultimedia = this.serviciog.proyecto.p_multimedia;
			this.serviciog.permisoMapa = this.serviciog.proyecto.p_mapa;
			this.serviciog.permisoPorcentajes = this.serviciog.proyecto.p_porcentajes;
			this.serviciog.permisoEstadisticas = this.serviciog.proyecto.p_estadisticas;

			this.serviciog.actividad = null;
			this.calculateValue(this.serviciog.actividades);
		} else {
			this.serviciog.actividad = this.serviciog.isSubActivity;

			this.serviciog.permisoPublicar = this.serviciog.actividad.public;
			this.serviciog.permisoReporte = this.serviciog.actividad.p_reporte;
			this.serviciog.permisoCategorias = this.serviciog.actividad.p_categorias;
			this.serviciog.permisoMultimedia = this.serviciog.actividad.p_multimedia;
			this.serviciog.permisoMapa = this.serviciog.actividad.p_mapa;
			this.serviciog.permisoPorcentajes = this.serviciog.actividad.p_porcentajes;
			this.serviciog.permisoEstadisticas = this.serviciog.actividad.p_estadisticas;

			this.calculateValue(this.serviciog.actividades);
		}
	}

	sendPercentage() {
		var formData = new FormData();
		if (!this.serviciog.isSelAct) {
			formData.append("actividades", JSON.stringify(this.serviciog.actividades))
		}
		else {
			formData.append("actividades", JSON.stringify(this.serviGloAct.subActividades))
		}

		this.servicios.updatePercentage(formData)
			.then(message => {
				alert(JSON.stringify(message));
			});

	}

	inicio() {
		this.serviciog.titulo = this.serviciog.proyecto.nom_pro;
		var keym = this.serviciog.proyecto.keym;
		var id_usuario = this.serviciog.proyecto.id_usuario;
		var id_caracteristica = this.serviciog.proyecto.id_caracteristica;
		this.serviciog.isSubActivity = null;
		this.serviciog.isSelAct = false;
		this.serviGloAct.actOpt = 0;
		this.serviciog.actividad = null;
		this.servicios.getActividad(keym, id_usuario, id_caracteristica)
			.then(actividad => this.serviciog.actividades = actividad);
	}

	entrarACtividad(actividad) {
		this.serviGloAct.lastActividad.push(this.serviciog.isSubActivity);

		this.subActivity = [];
		this.serviciog.actividades = [];
		this.serviciog.actividad = actividad;
		this.serviciog.isSubActivity = actividad;
		var keym = actividad.keym;
		var id_usuario = actividad.id_usuario;
		var id_caracteristica = actividad.id_caracteristica;

		this.serviciog.permisoPublicar = actividad.public;
		this.serviciog.permisoReporte = actividad.p_reporte;
		this.serviciog.permisoCategorias = actividad.p_categorias;
		this.serviciog.permisoMultimedia = actividad.p_multimedia;
		this.serviciog.permisoMapa = actividad.p_mapa;
		this.serviciog.permisoPorcentajes = actividad.p_porcentajes;
		this.serviciog.permisoEstadisticas = actividad.p_estadisticas;

		this.serviciog.titulo = actividad.nom_act;
		this.serviGloAct.actOpt = 1;


		this.servicios.getActividad(keym, id_usuario, id_caracteristica)
			.then(actividad => {
				if (actividad) {
					this.serviciog.actividades = actividad;
				}
			});
	}

	regresar() {
		var lastActividad = this.serviGloAct.lastActividad.pop();

		if (lastActividad != this.serviciog.isSubActivity && lastActividad) {
			this.subActivity = [];
			this.serviciog.actividades = [];
			this.serviciog.actividad = lastActividad;
			this.serviciog.isSubActivity = lastActividad;
			var keym = lastActividad.keym;
			var id_usuario = lastActividad.id_usuario;
			var id_caracteristica = lastActividad.id_caracteristica;

			this.serviciog.permisoPublicar = lastActividad.public;
			this.serviciog.permisoReporte = lastActividad.p_reporte;
			this.serviciog.permisoCategorias = lastActividad.p_categorias;
			this.serviciog.permisoMultimedia = lastActividad.p_multimedia;
			this.serviciog.permisoMapa = lastActividad.p_mapa;
			this.serviciog.permisoPorcentajes = lastActividad.p_porcentajes;
			this.serviciog.permisoEstadisticas = lastActividad.p_estadisticas;

			this.serviciog.titulo = lastActividad.nom_act;
			this.serviGloAct.actOpt = 1;

			this.servicios.getActividad(keym, id_usuario, id_caracteristica)
				.then(actividad => {
					if (actividad) {
						this.serviciog.actividades = actividad;
					}
				});
		} else {
			this.inicio();
		}
	}

	getUsers() {
		this.servicios.getUserList(null)
			.then(usuarios => {
				if (usuarios) {
					this.usuarios = usuarios;
				}
			})
	}

	asignarUsuario(usuario) {
		this.serviciog.actividad.usr_nom = usuario.nombre;
		this.serviciog.actividad.usr_ape = usuario.apellido;
		this.serviciog.actividad.e_mail = usuario.e_mail;
		var formData = new FormData();
		formData.append("keym", "0");
		formData.append("usuario", JSON.stringify(usuario));
		formData.append("caracteristica", JSON.stringify(this.serviciog.actividad));
		this.servicios.assignActivityToUser(formData)
			.then(message => {
				alert(JSON.stringify(message));
			})
	}

	c0() {
		this.serviGloAct.actOpt = 0;

	}

	c1() {
		this.serviGloAct.actOpt = 1;
	}

	c2() {
		this.serviGloAct.actOpt = 2;
	}

	c3() {
		this.reportdir = this.serviciog.servidor+"reportes/"+this.serviciog.actividad.keym+"-"+this.serviciog.actividad.id_caracteristica+"-"+this.serviciog.actividad.id_usuario+".pdf";
		this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.reportdir)		
		this.serviGloAct.actOpt = 3;	
	}

	c4() {
		this.serviGloAct.actOpt = 4;
	}

	c5() {
		this.serviGloAct.actOpt = 5;
	}
	c6() {
		this.serviGloAct.actOpt = 6;
	}
	c7() {
		this.serviGloAct.actOpt = 7;
	}
	c8() {
		this.serviGloAct.actOpt = 8;
	}
	c9() {
		this.serviGloAct.actOpt = 9;
	}

	///Calcula los porcentajes
	calculateValue(actividades) {
		var percent = 0;
		for (let i = 0; i < actividades.length; i++) {
			percent = percent + Number(actividades[i].porcentaje);
		}
		this.porcentajeAsignado = percent;
		this.miPorcentaje = 100 - this.porcentajeAsignado;
	}

	//////// Eventos  cambio de switch ////////
	chkEvent(opt) {

		var formData = new FormData();
		if (this.serviciog.actividad) {
			formData.append('keym', this.serviciog.actividad.keym);
			formData.append('id_usuario', this.serviciog.actividad.id_usuario);
			formData.append('id_caracteristica', this.serviciog.actividad.id_caracteristica);
			formData.append('opcion', opt);

			switch (opt) {
				case 1: {
					this.serviciog.actividad.public = !this.serviciog.actividad.public;
					this.serviciog.permisoPublicar = this.serviciog.actividad.public;
					formData.append('permiso', this.serviciog.actividad.public);
					break;
				}
				case 2: {
					this.serviciog.actividad.p_categorias = !this.serviciog.actividad.p_categorias;
					this.serviciog.permisoCategorias = this.serviciog.actividad.p_categorias;
					formData.append('permiso', this.serviciog.actividad.p_categorias);
					break;

				}
				case 3: {
					this.serviciog.actividad.p_reporte = !this.serviciog.actividad.p_reporte;
					this.serviciog.permisoReporte = this.serviciog.actividad.p_reporte;
					formData.append('permiso', this.serviciog.actividad.p_reporte);
					break;
				}
				case 4: {
					this.serviciog.actividad.p_multimedia = !this.serviciog.actividad.p_multimedia;
					this.serviciog.permisoMultimedia = this.serviciog.actividad.p_multimedia;
					formData.append('permiso', this.serviciog.actividad.p_multimedia);
					break;
				}
				case 5: {
					this.serviciog.actividad.p_mapa = !this.serviciog.actividad.p_mapa;
					this.serviciog.permisoMapa = this.serviciog.actividad.p_mapa;
					formData.append('permiso', this.serviciog.actividad.p_mapa);
					break;
				}
				case 6: {
					this.serviciog.actividad.p_porcentajes = !this.serviciog.actividad.p_porcentajes;
					this.serviciog.permisoPorcentajes = this.serviciog.actividad.p_porcentajes;
					formData.append('permiso', this.serviciog.actividad.p_porcentajes);
					break;

				}
				case 7: {
					this.serviciog.actividad.p_estadisticas = !this.serviciog.actividad.p_estadisticas;
					this.serviciog.permisoEstadisticas = this.serviciog.actividad.p_estadisticas;
					formData.append('permiso', this.serviciog.actividad.p_estadisticas);
					break;

				}
			}
		} else {

			formData.append('keym', this.serviciog.proyecto.keym);
			formData.append('id_usuario', this.serviciog.proyecto.id_usuario);
			formData.append('id_caracteristica', this.serviciog.proyecto.id_caracteristica);
			formData.append('opcion', opt);


			switch (opt) {
				case 1: {
					this.serviciog.proyecto.public = !this.serviciog.proyecto.public;
					this.serviciog.permisoPublicar = this.serviciog.proyecto.public;
					formData.append('permiso', this.serviciog.proyecto.public);
					break;
				}
				case 2: {
					this.serviciog.proyecto.p_categorias = !this.serviciog.proyecto.p_categorias;
					this.serviciog.permisoCategorias = this.serviciog.proyecto.p_categorias;
					formData.append('permiso', this.serviciog.proyecto.p_categorias);
					break;

				}
				case 3: {
					this.serviciog.proyecto.p_reporte = !this.serviciog.proyecto.p_reporte;
					this.serviciog.permisoReporte = this.serviciog.proyecto.p_reporte;
					formData.append('permiso', this.serviciog.proyecto.p_reporte);

					break;
				}
				case 4: {
					this.serviciog.proyecto.p_multimedia = !this.serviciog.proyecto.p_multimedia;
					this.serviciog.permisoMultimedia = this.serviciog.proyecto.p_multimedia;
					formData.append('permiso', this.serviciog.proyecto.p_multimedia);
					break;
				}
				case 5: {
					this.serviciog.proyecto.p_mapa = !this.serviciog.proyecto.p_mapa;
					this.serviciog.permisoMapa = this.serviciog.proyecto.p_mapa;
					formData.append('permiso', this.serviciog.proyecto.p_mapa);
					break;
				}
				case 6: {
					this.serviciog.proyecto.p_porcentajes = !this.serviciog.proyecto.p_porcentajes;
					this.serviciog.permisoPorcentajes = this.serviciog.proyecto.p_porcentajes;
					formData.append('permiso', this.serviciog.proyecto.p_porcentajes);
					break;

				}
				case 7: {
					this.serviciog.proyecto.p_estadisticas = !this.serviciog.proyecto.p_estadisticas;
					this.serviciog.permisoEstadisticas = this.serviciog.proyecto.p_estadisticas;
					formData.append('permiso', this.serviciog.proyecto.p_estadisticas);
					break;

				}
			}
		}

		this.servicios.updatePublicCaracteristica(formData)
			.then(message => {
				// alert(message);
			});
	}
	/////// Fin eventos cambios switch ////////


	// EVENTOS REPORTE////////////////////////
	documentChangeMult(event) {
		this.documentName = event.target.files[0].name || event.srcElement.files[0].name;
		// if(this.document.titulo  == ''){
		// 	this.document.titulo = this.documentName;
		// }
		this.documentNameValid = this.documentName;
		this.files = event.target.files[0] || event.srcElement.files[0];

	}

	onSubmitFile() {
		
		var formData = new FormData();
		this.reporte.keym = this.serviciog.actividad.keym;
		this.reporte.id_usuario = this.serviciog.actividad.id_usuario;
		this.reporte.id_caracteristica = this.serviciog.actividad.id_caracteristica;

		//this.reporte.id_usuario_act = this.serviciog.usuario.id_usuario + '';

		//formData.append('id_usuario',JSON.stringify (this.serviciog.usuario.id_usuario));
		formData.append('reporte', JSON.stringify(this.reporte));
		
		if (this.files) {
			formData.append('file', this.files);
		}

		
		this.servicios.createNewReport(formData)
			.then(message => {
				this.url = null;
				alert("" + message);
				this.reportdir = this.serviciog.servidor+"reportes/"+this.serviciog.actividad.keym+"-"+this.serviciog.actividad.id_caracteristica+"-"+this.serviciog.actividad.id_usuario+".pdf";
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.reportdir)		
				this.serviGloAct.actOpt = 3;
			});
	}
	//FIN EVENTOS REPORTE
}

class Reporte{
	constructor(
		public keym:string,
		public id_usuario:string,
		public id_caracteristica:string
		) {  }
}
