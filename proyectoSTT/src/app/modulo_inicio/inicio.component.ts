import { Component, OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import { ServiciosGlobales } from '../services/servicios-globales';


@Component({
	selector: 'inicio-view',
	templateUrl: './inicio.component.html',
	styleUrls: [ './inicio.component.css' ]
})


export class InicioView implements OnInit{
	constructor(private serviciog:ServiciosGlobales){}
	ngOnInit(): void {
    	
  	}
}