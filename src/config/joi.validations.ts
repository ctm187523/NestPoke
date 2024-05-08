
//hemos instalado el paquete joi --> yarn add joi
//para validaciones, como usamos este paquete no usaremos el archivo
//de este directorio que habiamos creado para las validaciones --> env.config.ts

import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({

    //Colocamos las varaibles del archivo .env para hacer las reglas de validaciones
    MONGODB: Joi.required(),    //MONGODB es requerido obligatorio
    PORT: Joi.number().default(3005),  //PORT es un number si no viene en el archivo .env es 3005 por defecto
    DEFAULT_LIMIT: Joi.number().default(6) //DEFAULT_LIMIT es un number si no viene en el archivo .env es 6  
})