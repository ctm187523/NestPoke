import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule ,  //importamos ConfigModule usado en pokemon.service.ts, usado para cargar las variables de entorno, configuracion, importado de app.module.ts ver video ConfigurationService seccion 9
    
    //importamos el modulo para que moongose  pueda trabajar con nuestras entidades
    //para conectar la entidad creada en entities/pokemon.entity.ts
    //Al extender de Document podemos tener estas propiedades, 
    MongooseModule.forFeature([
      //definimos los modelos y entidades que tengamos creadas
      {
        name: Pokemon.name, //Pokemon.name, el name viene de la extension de Document de la clase no es la propiedad name de la entidad, viene de Pokemon.entity.ts
        schema: PokemonSchema, //PokemonSchema es el esquema creado al final en pokemon.entity.ts
      }
    ])
  ],
  //exportamos para que pueda ser consumido en otro módulo lo usamos en seed.service.ts
  exports: [
    MongooseModule  //exportamos el módulo, seria nuestro pokemon module
  ]
})
export class PokemonModule {}
