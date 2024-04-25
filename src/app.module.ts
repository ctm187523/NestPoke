import { join } from 'path'; //paquete de Node los paquetes de Node los colocamos al inicio de las importaciones
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

//en la carpeta public hemos creado un archivo html y un archivo css
//para servir una pagina web estática para ello hay que instalar lo necesario
//para poder crear una web estática --> yarn add @nestjs/serve-static

//para la conexión de Nest con Mongo hemos instalado --> yarn add @nestjs/mongoose mongoose
//ver -> https://docs.nestjs.com/techniques/mongodb

@Module({
  imports: [
    //ver anotacion de arriba importacion para servir web estática
    //una vez importado con --> yarn add @nestjs/serve-static
    //devemos indicarle a nest donde se ubica el path del directorio donde tenemos la carpeta public
    //con la página estática a servir, para acceder a la web estática ponemos --> localhost:3000
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),

    //referencia a la base de datos Mongo hemos instalado un paquete para la conexion ver arriba
    //indicamos la url de la base de datos, es la misma para acceder a TablePlus o MongoCompass
    //Si la base de datos no esta arriba(docker) no funcionara el backend, no levanta la aplicacion
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokemonModule,
    CommonModule,
    SeedModule 
  ],
  
})
export class AppModule {}
