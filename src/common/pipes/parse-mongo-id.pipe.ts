import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    
    //console.log({ value, metadata});

    //comprobamos que sea un id de Mongo usando isValidObjectId de moongose
    //si no lo es  lanzamos una excepción 
    if ( !isValidObjectId(value) ){
      throw new BadRequestException(`${ value } is not a valid MongoId`)
    }

    //si lo es devolvemos el valor, hemos comprobado que sea un MongoId, de esta manera
    //nos aseguranos que solo sean ids de Mongo 
    
    return value;
  }
}
