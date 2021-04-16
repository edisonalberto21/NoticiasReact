import * as React from 'react';
import { INoticiasProps } from './INoticiasProps';
import { escape } from '@microsoft/sp-lodash-subset';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.min.js';
import { INoticiasState } from './INoticiasState'; 
import * as jQuery from 'jquery';
import { IListItem } from './IListItem';
import pnp, { sp, Item, ItemAddResult, ItemUpdateResult, Items, ConsoleListener } from "sp-pnp-js"; 
import * as moment from 'moment';
import { Categoria } from './Categoria';

export default class Noticias extends React.Component<INoticiasProps, INoticiasState> {

  constructor(props: INoticiasProps, state: INoticiasState) {                     //Se define el constructor
    super(props);
    this.state = {                                                                   //Estado inicial, array items vacio
      items: [],
      searchState: "",
      Categorias:[],
      filtro: ""
     
    };
      
    this.SliderNoti(); 
    this.Categorias(); 
                                                 //Se ejecuta el método de consulta
   }

   public _renderCurrencies(imgitem) {                                                       //Funcion para mostrar la imagen de la lista 
    var img = document.createElement('div');
    img.innerHTML = imgitem;
    return img.getElementsByTagName('img')[0].getAttribute("src");
  }

  private interna(id){

    window.location.href = this.props.siteUrl+"/Paginas/noticias.aspx?Buscar="+id;             //Abre una interna filtrada por la clase especificada
  }

  componentDidMount(){
    this.next();
    this.prev(); 
  }

  

 
  public render(): React.ReactElement<INoticiasProps> {
    const { numero=0 } = this.props
    var pasos = this.props.categoria  ? 'selectoculta'+numero : 'selectmostrar'+numero
    

    moment.locale('es');
   const { titulo="Noticias Recientes", description="Información relacionada con contenido Ambiental" } = this.props
  
    
    var t =0
    const items: JSX.Element[] = this.state.items.map((item: IListItem, i: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
      const fecha =item.Created ? item.Created : ""; 
      var dia = moment(fecha, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('DD');
      var mes = moment(fecha, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('MMMM');
      var miMes = mes.toUpperCase().charAt(0) + mes.substring(1,mes.length);
     
      //var active = i===0 ? "active" : ""; 
      var sa = item.Title ? item.Title : "";
      var ta = item.Descripcion ? item.Descripcion : "";
      var active = t===0 ? "active" : ""; 
      
    var filtro = this.state.filtro == 'Filtar por:' ? "" : this.state.filtro;
    const { categoria= "" } = this.props
   if((sa.toLowerCase().indexOf(this.state.searchState.toLowerCase())!= -1  || ta.toLowerCase().indexOf(this.state.searchState.toLowerCase())!= -1) && (item.Categoria['Title'].toLowerCase().indexOf(filtro.toLowerCase())!= -1) && item.Categoria['Title'].toLowerCase().indexOf(categoria.toLowerCase())!= -1){ 
    t++
    


     return (
        <div className={"carousel-item col-md-5 " + " " + active} style={{cursor:'pointer'}}><a onClick={() => this.interna(item.Id)}>
          <div className="card shadow-sm  bg-white rounded">
            <div className="cont-fecha" style={{background:item.Categoria['Color'] }}><h3>{dia}</h3>{miMes}<br/>
              2020</div>
              <img src={this._renderCurrencies(item.imagen)} className="card-img-top" alt="..."/>
                <div className="card-body entec">
                <h5 className="card-title">{item.Title}</h5>
                <p className="card-text text-secondary">{item.Descripcion}</p>
                </div>
              <div className="card-footer p-0">
                  <h5 className="txtfotter font-16" style={{color:item.Categoria['Color'] }}>{item.Categoria['Title']}</h5>
                </div>
            </div></a>
        </div>
       );
      
    }
    
   });

   ///ini
   const cat: JSX.Element[] = this.state.Categorias.map((item: Categoria, i: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
     
      return(
        <>
        <option>{item.Title}</option>
        
      </>
      )

   });
   //fin

    return (
      
      <>
         <section className="py-5" id="sect-noticias">
      <div className="row m-0">
        <div className="col-12 col-xl-4 pt-5 mt-5 pl-4">
            <h5 className="subtite-section">Información</h5>
             <h3 className="title-section mb-4">{this.props.titulo}</h3>
              <p>{this.props.description}</p>
            <form className="form-inline  my-lg-0">
                <input className="form-control form-control-lg" onChange={e => this.setState({ searchState:e.target.value })} type="search" placeholder="Busqueda Avanzada" aria-label="Search"/>
                <button className="btn btn-primary btn-lg my-sm-0" type="submit">Buscar</button>
              </form>
        </div>


        <div className="col-12 col-xl-8 px-0">
       
       <div className="carousel-noticias">
         <div className={"container " + pasos}>
           <div className="row">
          <div className="form-group col ">
          <select className="form-control col-5 float-right" id="exampleFormControlSelect1" onChange={e => this.setState({ filtro:e.target.value })}>
        <option>Filtar por:</option> 
             {cat}
             </select>

            </div>
          </div>
          </div>
           
          <div id="#myCarouselnot" className="carousel slide" data-ride="carouselnot">
            <div className="carousel-inner row w-100 mx-auto">
                <div className="card-group">
           
           {items}

              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12 text-right mt-4">
                  <a className="btn btn-outline-secondary mx-1 prev" onClick={this.prev} href="javascript:void(0)" title="Previous">
                    <i className="fa fa-lg fa-chevron-left" ></i>
                  </a>
                  <a className="btn btn-outline-secondary mx-1 next" onClick={this.next} href="javascript:void(0)"  title="Next">
                    <i className="fa fa-lg fa-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      
      </div>
      </div>

    </section>
     </>
    );
  }

  

  private next(){
    
   
    jQuery('.next').click(function () {
      jQuery('.carousel').carousel('next');
     // return false;
     
     event.stopPropagation();
    });

  }

  private prev(){
    jQuery('.prev').click(function () {
      jQuery('.carousel').carousel('prev');
   // return false;
   
  });
}

private SliderNoti(){

  
  pnp.sp.web.lists.getByTitle('Noticias')
    .items.select('Descripcion,Title,imagen,Id,Created,Destacado,Categoria/Title,Categoria/Color&$expand=Categoria').orderBy('Created', false).get()    //selecciona los items de la lista 
    .then((items: IListItem[]): void => {
      this.setState({
        items: items
      }); 
  }, (error: any): void => {        //Imprime si existe el error
    console.log(error);
     });
    
}

private Categorias(){
  
  pnp.sp.web.lists.getByTitle('Categorias')
    .items.orderBy('Created', false).get()    //selecciona los items de la lista 
    .then((items: Categoria[]): void => {
      this.setState({
        Categorias: items
      }); 
  }, (error: any): void => {        //Imprime si existe el error
    console.log(error);
     });
    
}
  
}



