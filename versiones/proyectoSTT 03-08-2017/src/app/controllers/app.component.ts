import { Component } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Modallogin } from '../controllers/modal-login.component';
import { ServiciosGlobales } from '../services/servicios-globales';

@Component({
	selector: 'app-root',
	templateUrl: '../views/app.component.html',
	styleUrls: [ '../src/css/app.component.css' ]
})

export class AppComponent {	
	constructor(private serviciog:ServiciosGlobales){}	
}
