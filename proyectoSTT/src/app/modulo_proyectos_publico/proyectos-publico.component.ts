import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosGlobales } from '../services/servicios-globales';
import { Servicios } from '../services/servicios';

@Component({
	selector: 'proyectos-publico',
	templateUrl: './proyectos-publico.component.html',
	styleUrls: ['./proyectos-publico.component.css']
})

export class ProyectosPublico implements OnInit {
	proyectos: any;
	isSearch: boolean = false;

	constructor(
		private serviciog: ServiciosGlobales,
		private router: Router,
		private servicios: Servicios
	) { };

	ngOnInit(): void {

		this.servicios.getProyectosPublicos(new FormData())
			.then(proyectos=> {				
				this.serviciog.proyectos_publico = proyectos
				this.proyectos = proyectos;
		});

	}

	search(term: string) {		
		if (term != '') {
			this.isSearch = true
		}
		console.log(this.proyectos)
		this.serviciog.proyectos_publico = this.proyectos.filter(
			item => item.nombre.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
				item.descripcion.toLowerCase().indexOf(term.toLowerCase()) !== -1

		);

	}

	entrar(proyect: any) {
		this.serviciog.proyecto_publico = proyect;
		this.serviciog.permisoReporte = proyect.p_reporte;
		this.serviciog.permisoCategorias = proyect.p_categorias;
		this.serviciog.permisoMultimedia = proyect.p_multimedia;
		this.serviciog.permisoMapa = proyect.p_mapa;
		this.serviciog.permisoPorcentajes = proyect.p_porcentajes;
		this.serviciog.permisoEstadisticas = proyect.p_estadisticas;
		
		let link = ['actividadespublico'];
		this.router.navigate(link);
	}
}