import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    //importamos el modulo para que moongose  pueda trabajar con nuestras entidades
    //para conectar la entidad creada en entities/pokemon.entity.ts
    //Al extender de Document podemos tener estas propiedades, 
    MongooseModule.forFeature([
      //definimos los modelos y entidades que tengamos creadas
      {
        name: Pokemon.name, //Pokemon.name, el name viene de la extension de Document de la clase no es la propiedad name de la entidad
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
