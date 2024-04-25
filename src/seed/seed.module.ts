import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';


//hemos creado el servicio seed para llenar la base de datos
//lo hemos creado con el comando -->nest g res seed --no-spec
//hemos borrado las carpetas que se crean de DTO y entities ya que no la 
//vamos a usar y del seed.service y seed.controler solo usamos el metodo creado --> executeSeed()
@Module({
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
