import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  //@HttpCode( HttpStatus.OK ) //con el decorador HttpCode podemos regresar el codigo que queramos por defecto la creacion es el codigo 201 pero podemos poner que retorne 200, usamos en su lugar HttpStatus.OK que seria 200, HttpStatus es un enum con los diferentes codigos, lo comentamos no lo usamos
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':terminoBusqueda') //accedemos al valor de la url que viene despues de pokemon ej:localhost:3000/api/v2/pokemon/1, o si es por name -> localhost:3000/api/v2/pokemon/charmander o por MongoId -> localhost:3000/api/v2/pokemon/66193b15430104fbd3280dc9
  findOne(@Param('terminoBusqueda') terminoBusqueda: string) {
    return this.pokemonService.findOne(terminoBusqueda);
  }

  //podemos actualizar por name o no
  @Patch(':terminoBusqueda')
  update(@Param('terminoBusqueda') terminoBusqueda: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(terminoBusqueda, updatePokemonDto);
  }

  //Queremos que para borrar un pokemon solo se pueda borrar si le pasamos el mongoid, queremos hacerlo de esta manera para aprender a manejar los pipes
  //los Pipes transforman fisicamente la data, un mongo id sigue siendo un string pero habiendo pasado por una validación previa
  //no existe un ParseMongoIdPipe asi como si existe por ejemplo el ParseIntPipe que coge el id y lo intenta pasar a un numero
  //por ello tenemos que crear un pipe customizado, custom pipe
  //lo creamos en la carpeta llamada common del src, creada mediante la linea de comando(CLI) con --> nest g mo common
  //para que sea comun al proyecto, ahora dentro de common creamos la carpeta pipes donde crearemos el pipe
  //usamos la CLI para crearla con --> nest g pi common/pipes/parseMongoIdPipe --no-spec
  //parseMongoId es el nombre del pipe que creamos --no-spec para que no cree la carpeta de pruebas
  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) { //usamos el pipe creado ParseMongoIdPipe
    return this.pokemonService.remove(id);
  }
}
