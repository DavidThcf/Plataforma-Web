import { Component,OnInit } from '@angular/core';
import { Usuario } from './model/usuario';
import { Modallogin } from './modulo_login/modal-login.component'
import { ServiciosGlobales } from './services/servicios-globales';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit {
	
	constructor(private serviciog:ServiciosGlobales,private persistenceService:PersistenceService,private router:Router){}	

	ngOnInit(){
		this.serviciog.usuario = this.persistenceService.get('user', StorageType.SESSION);
	}
	
	logout(){
		this.persistenceService.remove('user', StorageType.SESSION);
		this.serviciog.usuario = this.persistenceService.get('user', StorageType.SESSION);
		let link = [''];
		this.router.navigate(link);
	}
}
