import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';


//hemos creado el servicio seed para llenar la base de datos
//lo hemos creado con el comando -->nest g res seed --no-spec
//hemos borrado las carpetas que se crean de DTO y entities ya que no la 
//vamos a usar y del seed.service y seed.controler solo usamos el metodo creado --> executeSeed()
@Module({
  controllers: [SeedController],
  providers: [SeedService],
  //importamos el módulo de Pokemon para que pueda ser consumido en seed.module.ts
  //ver como lo exportamos en Pokemon.module.ts
  imports: [
    PokemonModule,
    CommonModule, //importamos el CommonModule para usar el adapter de axios, adapters/axios.adapters.ts
  ]
})
export class SeedModule {}
