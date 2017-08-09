export class Proyecto{

  constructor(
  	public keym: number,
  	public id_usuario:number,
  	public id_caracteristica:number,    
    public nombre: string,
    public descripcion: string ,
    public estado: string,
    public porcentaje: string   
  ) {  }
}