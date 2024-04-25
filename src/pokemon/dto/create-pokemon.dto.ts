//DTO --> Data Transfer Objext
//Es una clase que nos dice como luce la información, "tipado"
//definimos la información que tenemos que recibir en un POST 
//la diferencia con si hubieramos usado una interfaz es que con el DTO
//nos permite hacer validaciones de la data

//hemos instalado --> yarn add class-validator class-transformer
//para usar los decoradores que contiene para poder validar la data

//importaciones para validaciones de lo anterior instalado class-validator
import { IsString, IsPositive, MinLength, IsInt, Min} from "class-validator"

export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    @MinLength(1)
    @IsString()
    name: string;
}
