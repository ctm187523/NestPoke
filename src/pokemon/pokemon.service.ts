import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';  //creado por Nest para manejar mongoose
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  constructor(
    //inyectamos una dependencia de moongose, Model donde hacemos referencia a la entity pokemon
    //Pokemon.name es el nombre del modelo que queremos usar
    @InjectModel(Pokemon.name) 
    private readonly pokemonModel: Model<Pokemon>,
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase(); //lo ponemos en minusculas
    
    //manejamos posibles errores, por ejemplo si queremos insertar en la base de datos un elemento ya insertado anteriormente
    try {
      //hacemos una insercion en la base de datos usando la inyeccion de dependencias creada en el constructor
      //mandamos el parametro recibido createPokemonDto a la base de datos
      const pokemon = await this.pokemonModel.create( createPokemonDto );
    
      return pokemon; //retornamos la variable pokemon para saber los valores del objeto y poder hacer validaciones
    } catch (error) {
        
      //llamamos a la función creada abajo
      this.handleExceptions( error );
    }

  }

  //mostramos los pokemons con paginacion recibimos un objeto de tipo PaginationDto
  //que contiene los query parameters validados
  findAll( paginationDto: PaginationDto) {

    //desestructuramos  las propiedades de paginationDto 
    //que contienen los query parameters como son opcionales
    //si no vienen por defecto ponemos el limit en 10 y offset en 0
    const { limit = 10, offset = 0} = paginationDto;

    return this.pokemonModel.find()
        .limit( limit ) //metodo de Find para poner el limite de los pokemons a mostrar, paginacion
        .skip( offset ) //skip salta a los siguientes pokemons
        .sort({
          no: 1      //ordenamos la columna no de manera ascendente
        })
        .select( '-__v' )   //en el select como tiene el guión menos decimos que no muestre la version __v que muestra por defecto 
  }

  //el parametro termino de busqueda puede ser el MongoId, el name o el no
  async findOne(terminoBusqueda: string) {
    
    let pokemon: Pokemon; //tipo de la entity Pokemon

    //comprobamos que sea un numero, Nan significa Not A Number, por lo tanto negamos ! para comprobar que si sea un numero, ya que el no en la entity es number
    //le ponemos +terminoBusqueda ya que por parametro recibimos un string y queremos saber si ese string es un numero
    if( !isNaN( +terminoBusqueda ) ){
      //en la variable pokemon recibimos el pokemon con ese no(termino de busqueda)
      pokemon = await this.pokemonModel.findOne({ no: terminoBusqueda })
    }

    //ahora miramos que el termino de busqueda sea por el MongoId para ello usamos isValidObjectId de Moongose para saber si es un id de MongoId lo que recibmos como termino de busqueda
    //evaluamos primero si el pokemon no ha sido encontrado en caso contrario ya no evalua y asi optimizamos
    if ( !pokemon && isValidObjectId( terminoBusqueda) ){
      pokemon = await this.pokemonModel.findById( terminoBusqueda );
    }

    // si no tenemos ningun pokemon a estas altureas lo buscamos por el name
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: terminoBusqueda.toLocaleLowerCase().trim() }) //con trim eliminamos espacios delante y detras 
    }


    //si no encontramos el pokemon por el termino de busqueda
    if ( !pokemon ) throw new NotFoundException(`Pokemon with id, namer or no "${ terminoBusqueda  }" not found.`);

    return pokemon;
  }

  //recibimos 2 parametros el terminoBusqueda para buscar el objeto en la base de datos y el updatePokemonDto que es el objeto actualizado a reemplazar
  async update(terminoBusqueda: string, updatePokemonDto: UpdatePokemonDto) {
    
    //buscamos si existe el pokemon por el terminoBusqueda, usando el metodo credo arriba  que puede ser el name o id
    const pokemon = await this.findOne(terminoBusqueda);
    
    //si recibimos el nombre lo pasamos a minusculas
    if ( updatePokemonDto.name ){
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    //manejamos con un try catch los errores por ejemplo si queremos actualizar un pokemon con un name o no que ya existen puesto que en las entity hemos puesto que tienen que ser unicos(unique)
    try {
      //registramos en la base de datos le pasamos el updatePokemonDto recibido por parametro, el objeto actualizado a remplazar
      await pokemon.updateOne( updatePokemonDto)
    
      return  {  ...pokemon.toJSON(), ...updatePokemonDto }; //para que devuelva el pokemon actualizado sobreescribimos las propiedades del pokemon con las del updatePokemonDto que es el que recibimos por parametro actualizado como queremos que quede la actualizacion
      
    } catch (error) {
        
      //llamamos a la función creada abajo
      this.handleExceptions( error );
    }

    
  }

  async remove(id: string) {
    
    //comprobamos si el id existe, COMENTAMOS LAS 2 LINEAS SIGUIENTES PORQUE USAMOS UN CUSTOM PIPE
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();

    //COMENTAMOS LA SIGUIENTE LINEA DE CODIGO PORQUE BORRABA EL POKEMON PERO NO COMPRUEBA SI UN MONGO ID EXIDTE EN LA BASE DE DATOS 
    //LO QUE SI PONES UN MONGO ID QUE NO ESTA EN LA BASE DE DATOS NO DA ERROR PERO NO BORRA NADA YA QUE NO ESTA, FALSO POSITIVO
    //const result = await this.pokemonModel.findByIdAndDelete(id);
    

    //En caso de que se mande un mongo id que no existe en la base de datos devuelve esto --> {"acknowledged": true,"deletedCount": 0}
    //de esta manera solo hacemos una consulta a la base datos
    //desestructuramos el deleteCount si es 0 quiere decir que no se ha borrado nada de la base de datos ya que ese mongo id no existe
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    //usamos el deleteCount si es cero en ese caso mandamo una excepcion ya que no se borro nada de la base de datos por mandar un mongoid que no existe
    if ( deletedCount === 0 ){
      throw new BadRequestException(`Pokemon with id "${ id }" not found`);
    }
    return;
  }

  //metodo para manejar los errores
  private handleExceptions ( error: any) {

      //sabemos que el numero de error es 11000 porque si ejecutamos la accion de insertar un nuevo elemento ya insertado
      //por consola muestra el error 11000 que hace referencia a este tipo de error
      if (error.code === 11000){
        throw new BadRequestException(`Pokemon exist in db ${ JSON.stringify( error.keyValue )}`);
      }
      //tenenos otro tipo de error si no es code === 11000, lo mostramos
      console.log(error)
      throw new InternalServerErrorException(`Can´t create Pokemon - Check server logs`);
  }
}
