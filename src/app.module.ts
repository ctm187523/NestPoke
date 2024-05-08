import { join } from 'path'; //paquete de Node los paquetes de Node los colocamos al inicio de las importaciones
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validations';

//en la carpeta public hemos creado un archivo html y un archivo css
//para servir una pagina web estática para ello hay que instalar lo necesario
//para poder crear una web estática --> yarn add @nestjs/serve-static

//para la conexión de Nest con Mongo hemos instalado --> yarn add @nestjs/mongoose mongoose
//ver -> https://docs.nestjs.com/techniques/mongodb

@Module({
  imports: [

    //para usar las variables de entorno hemos instalado el paquete -> yarn add @nestjs/config
    //ahora debemos importar ConfigModule.forRoot() para poder usarlas
    //debemos colocarlas al inicio de los imports, las variables de entorno por defecto siempre son Strings
    ConfigModule.forRoot({
      load: [ EnvConfiguration ], //usamos la funcion EnvConfiguration creada en src/config para validar las variables de entorno y controlar que vengan y si no poner valores por defecto
      validationSchema: JoiValidationSchema //usamos el archivo para validaciones creado en config/joi.validation.ts, hace validaciones como el archivo de justo arriba EnvConfiguration, pueden trabajar en conjunto, EnvConfiguration transforma los strings a number
    }),

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
    MongooseModule.forRoot( process.env.MONGODB, {
      dbName: 'pokemonsdb'    //nombre de la base de datos que se creara en railway ver video MongoDB Aprovisonamiento de la seccion 9
    } ), //usamos las variables de entorno del archivo .env
    PokemonModule,
    CommonModule,
    SeedModule 
  ],
  
})
export class AppModule {
  
  constructor(){
    //console.log(process.env)   //muestra las variables de entorno
  }
}
