//Mongo trabaja con documentos extendemos la clase de Document perteneciente al
//paquete instalado de Mongo para la conexion con Nest 

/* 
    Mongoose es una librería para Node.js que nos permite escribir consultas
     para una base de datos de MongooDB, con características como validaciones, 
     construcción de queries, middlewares, conversión de tipos y algunas otras, 
     que enriquecen la funcionalidad de la base de datos.
     La parte central del uso de Mongoose está en la definición de un esquema donde
     se indica la configuración de los documentos para una colección de MongoDB. 
     Y aunque MongoDB es una base de datos nosql, donde los documentos se almacenan 
     sin un esquema predefinido, el uso de un esquema te permite normalizar tu información, 
     sin sacrificar la flexibilidad. Además, hace que la transición de sql a nosql, sea más sencilla.
*/
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()   //decorador esquema, indicamos que es un schema de base de datos
export class Pokemon extends Document{

    // id: string   //Mongo de manera automática genera el MongoId
    
    //definimos las propiedades de name, debe ser el nombre unico y es un indice
    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    //definimos las propiedades de no, debe ser el numero del pokemon unico y es un indice
     @Prop({
        unique: true,
        index: true,
    })
    no:number;     //numero del pokemon
}


//exportamos el esquema donde hemos definido las reglas,columnas etc
export const PokemonSchema = SchemaFactory.createForClass( Pokemon );