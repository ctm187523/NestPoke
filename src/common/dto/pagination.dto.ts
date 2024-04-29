import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";


//validamos los query parameters recibidos en la url
//los usamos para la paginacion de los pokemons recibidos
//recibimos 2 query parametres limit(limite de pokemons a mostrar por gagina)
//y offset para indicar desde donde empiezan los nuevos pokemons a mostrar en la paginacion
//los query parameteres los recibimos siempre como String
//en el archivo main.ts añadimos en ValidationPipe, transform y transformOptions para que haga  la conversion del string a number
export class  PaginationDto{

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset?: number;

}