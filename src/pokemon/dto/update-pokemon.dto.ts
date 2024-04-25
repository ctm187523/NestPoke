import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

//al extender de PartialType(cretePokemosDto) estamos diciendo 
//que este dto UpdatePokemonDto va a tener las mismas propiedades que el dto CreatePokemonDto
//pero van a ser opcionales ya que para el update podemos solo actualizar ciertas propiedades
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
