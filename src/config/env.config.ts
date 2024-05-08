
//funcion para validar las variables de entorno del archivo .env
export const EnvConfiguration = () => ({  //con las llaves {} retornamos un objeto

    environment: process.env.NODE_ENV || 'dev', //esta variable nos indica si estamos en desarrollo,produccion o testing, no esta en el archivo .env
    mongodb: process.env.MONGODB,  //del archivo .env, no ponemos alternativa para que de error si no se pone esta variable de entorno
    port: process.env.PORT || 3002, //si no mandamos el puerto por defecto es 3002
    defaultlLimit: +process.env.DEFAULT_LIMIT || 7, //si no viene es siete, ponemos el + para que sea un number
})