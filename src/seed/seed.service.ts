import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';


//para hacer la peticion a la web de la pokedex usamos axios
//con -> yarn add axios@0.27.2
//ver la nota de actualizacion de la seccion 8
@Injectable()
export class SeedService {

  //creamos una dependencia de axios en el servicio
  private readonly axios:AxiosInstance = axios;

  //hacemos la peticion a la web pokedex para cargar los pokemons en la base de datos
  async executeSeed() {
    //desestructuramos de la peticion la data, usamos la interface creada en este directorio PokeResponse
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
    
    //results contiene el mame y url de cada uno de los pokemons, los desestructuramos
    //el name no tenemos que modificarlo porque esta como lo usamos pero la url no la usamos y tenemos que ponerla como no que es 
    //como lo usamos, usamos split para segmentar la url en / y lo que necesitamos es el penúltimo  / que es el numero del pokemon nuestro no
    data.results.forEach(({ name,url }) => {
      const segments = url.split('/')
      const no:number = +segments[segments.length - 2]; //si ponemos el signo + hacemos la converion de string a number
      //console.log({ name, no })
    });
    
    return data.results; //de la data nos interesa los results
  }
}
