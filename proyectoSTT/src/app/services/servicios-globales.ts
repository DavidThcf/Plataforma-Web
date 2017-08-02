import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Proyecto } from '../model/proyecto';


@Injectable()
export class ServiciosGlobales {
	usuario:Usuario;
	proyecto:Proyecto[]; 
	constructor(){}	
}