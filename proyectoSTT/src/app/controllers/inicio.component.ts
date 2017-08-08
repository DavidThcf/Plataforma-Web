import { Component, OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import { ServiciosGlobales } from '../services/servicios-globales';


@Component({
	selector: 'inicio-view',
	templateUrl: '../views/inicio.component.html',
	styleUrls: [ '../src/css/inicio.component.css' ]
})


export class InicioView implements OnInit{
	constructor(private serviciog:ServiciosGlobales){}
	ngOnInit(): void {
    	
  	}
}