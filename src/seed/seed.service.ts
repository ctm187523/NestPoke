import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


//para hacer la peticion a la web de la pokedex usamos axios
//con -> yarn add axios@0.27.2
//ver la nota de actualizacion de la seccion 8
@Injectable()
export class SeedService {

  //creamos una dependencia de axios en el servicio
  private readonly axios:AxiosInstance = axios;


  constructor(
    //inyectamos una dependencia de moongose, Model donde hacemos referencia a la entity pokemon
    //Pokemon.name es el nombre del modelo que queremos usar
    @InjectModel(Pokemon.name) 
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter, //usamos el AxiosAdpater creado en common/adapters/axiosAdapter.ts
  ){}

  //hacemos la peticion a la web pokedex para cargar los pokemons en la base de datos
  async executeSeed() {

    //al llamar al método borramos todo lo anterior de la base de datos si tuviera algo insertado
    await this.pokemonModel.deleteMany({});

    //usamos la varaible http creada en el constructor para usar el adaptador de axios, la tipamos con la interfaz que hemos creado PokeResponse
    //recibimos la data, ver common/adapter/axiosAdapter como ya ahy desestructuramos la data y devolvemos la data
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    //definimos un array del tipo de la data a usar, para que al llamar a la api pokemon no se ejecuten todas las peticiones de golpe
    //lo haga por lotes
    const pokemonToInsert: { name:string, no:number}[] = [];


    //results contiene el mame y url de cada uno de los pokemons, los desestructuramos
    //el name no tenemos que modificarlo porque esta como lo usamos pero la url no la usamos y tenemos que ponerla como no que es 
    //como lo usamos, usamos split para segmentar la url en / y lo que necesitamos es el penúltimo  / que es el numero del pokemon nuestro no
    data.results.forEach(({ name,url }) => {
      const segments = url.split('/')
      const no:number = +segments[segments.length - 2]; //si ponemos el signo + hacemos la converion de string a number
      
      //pokemonModel, inyectamos la dependencia en el constructor
      //insertamos de la data recibida ya tratada el name y no en la base de datos de cada uno de los pokemons
      //COMENTAMOS LA LINEA DE ABAJO PORQUE EN LUGAR DE HACER TODA LA PETICION DE LA CREACION DE GOLPE LA QUEREMO HACER
      //POR LOTES
      //const pokemon = await this.pokemonModel.create( { name, no } )
      
      //llamamos al array creado arriba y le damos la definicion de los pokemos que queremos insertar(name,no)
      pokemonToInsert.push( { name, no} );
      
      //console.log({ name, no })
    });
    
   //insertamos los pokemons
   await this.pokemonModel.insertMany(pokemonToInsert)
    
    return 'Seed executed'; //de la data nos interesa los results
  }
}
 