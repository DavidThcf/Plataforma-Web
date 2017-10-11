import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { ServiciosGlobales } from '../services/servicios-globales';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import {TooltipModule} from "ngx-tooltip";

@Component({
	selector: 'inicio-view',
	templateUrl: './inicio.component.html',
	styleUrls: [ './inicio.component.css' ]
})



export class InicioView implements OnInit{
	visible: boolean = true;
	id_number:number = 0;
	formData: FormData;
	files: UploadFile[];
	uploadInput: EventEmitter<any>;
	humanizeBytes: Function;
	dragOver: boolean;
	percentage:string = "0"

	constructor(private serviciog:ServiciosGlobales){
		this.formData = {
			concurrency: 1,
			autoUpload: false,
			verbose: true
		};
		this.files = []; // local uploading files array
		this.uploadInput = new EventEmitter<any>(); // input events, we use this to emit data to ngx-uploader
		this.humanizeBytes = humanizeBytes;
	}
	ngOnInit(): void {

		//this.valorCumplido = this.calculateValorCumplido(this.id_number,this.kelv[0]);
		//alert(this.valorCumplido);
	}

	onUploadOutput(output: UploadOutput): void {
		
		if (output.type === 'allAddedToQueue') { 
			

		} else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
			this.files.push(output.file);
		} else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
			// update current data in files array for uploading file
			const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
			this.files[index] = output.file;
			this.percentage = output.file.progress.data.percentage + 'uploading ' +output.file.progress.data.speedHuman		} else if (output.type === 'removed') {
			// remove file from array when removed
			this.files = this.files.filter((file: UploadFile) => file !== output.file);
		} else if (output.type === 'dragOver') {
			this.dragOver = true;
		} else if (output.type === 'dragOut') {
			this.dragOver = false;
		} else if (output.type === 'drop') {
			this.dragOver = false;
		}

	}

	startUpload(): void {
		var form = new FormData()		
		const event: UploadInput = {
			type: 'uploadAll',
			url: 'http://ngx-uploader.com/upload',
			method: 'POST',
			data: { foo: 'bar' },
			concurrency: 1,
		};		

		this.uploadInput.emit(event);
		alert(event)
		
	}

	cancelUpload(id: string): void {
		//this.uploadInput.emit({ type: 'cancel', id: id });
	}

	removeFile(id: string): void {
		//this.uploadInput.emit({ type: 'remove', id: id });
	}

	removeAllFiles(): void {
		//this.uploadInput.emit({ type: 'removeAll' });
	}

	
}

interface Tree{
	id:number;
	id_pad?:number;
	porcentaje:number;
	asignado:number;
	cumplido:number;
}
interface FormData {
	concurrency: number;
	autoUpload: boolean;
	verbose: boolean;
}
/*
kelv:Tree[] = [
	{
		id:0,
		id_pad:-1,
		porcentaje:0,
		asignado:40,
		cumplido:0,
	},
	{
		id:1,
		id_pad:0,
		porcentaje:30,
		asignado:80,
		cumplido:10,
	},
	{
		id:2,
		id_pad:1,
		porcentaje:50,
		asignado:0,
		cumplido:50,
	},
	{
		id:3,
		id_pad:1,
		porcentaje:30,
		asignado:0,
		cumplido:25,
	},
	{
		id:4,
		id_pad:0,
		porcentaje:10,
		asignado:10,
		cumplido:5,
	},
	{
		id:5,
		id_pad:4,
		porcentaje:10,
		asignado:0,
		cumplido:10,
	}
	];

	valorCumplido:number=0;

	calculateValorCumplido(id:number,kel:Tree){
		var cont = this.calculateNumberChild(id);
		if(cont > 0){
			var val = 0;			
			for(var i=0; i < this.kelv.length; i++){
				if(this.kelv[i].id_pad == id){
					//alert("aws"+ i +" "+val);
					val=val+this.calculateValorCumplido(this.kelv[i].id,this.kelv[i]);
					//alert("axd"+ i +" "+val);					
				}
			}	
			if(this.id_number != id){
				val = val + kel.cumplido;
				val = kel.porcentaje * val / 100 
			}else{
				val = val + kel.cumplido;
			}

			//alert(val + " " + JSON.stringify(kel));
			return val;			

		}else{		

			return  (kel.porcentaje * (kel.cumplido/100));
		}		
	}

	calculateNumberChild(id:number){
		var cont:number = 0;

		for(var i=0; i < this.kelv.length; i++){
			if(this.kelv[i].id_pad==id){
				cont++;				
			}
		}
		return cont;
	}
	// when all files added in queue
			// uncomment this if you want to auto upload files when added
			// const event: UploadInput = {
				//   type: 'uploadAll',
				//   url: '/upload',
				//   method: 'POST',
				//   data: { foo: 'bar' },
				//   concurrency: 0
				// };
				// this.uploadInput.emit(event);
*/

