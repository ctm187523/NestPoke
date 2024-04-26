import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  //en la variable app tenemos la aplicación de Nest
  const app = await NestFactory.create(AppModule);

  //con la instrucción de abajo añadimos un prefijo a la url de esta manera
  //hacemos que sea localhost:3000/api/v2/pokemon
  app.setGlobalPrefix('api/v2');

  //usamos los Pipes de validacion de manera global, para que sirva para toda la aplicación
  //usamos ValidationPipe que es el pipe que trabaja con class-validator 
  //instalado con  -> yarn add class-validator class-transformer
  //lo usamos en pokemon.controller en @Post ya que usamos el DTO createPokemonDTO y usa class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //whitelist solo deja pasar la data que esperamos y hay informacion adicional la descarta, pero no marca error por recibir informacion que no toca
      forbidNonWhitelisted: true, }) //forbidNonWhitelisted da error si se manda informacion que no toca
  );
  
  //puerto por donde escuha la app
  await app.listen(3000);
}
bootstrap();