
//clase envoltorio, si hubiera algún cambio en Axios solo tenemos
//que canviarlo en esta clase y no en todos los lugares del proyecto
//donde estamos usando Axios, implemeta la interfaz creada en el directorio common

import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter-interface";
import { Injectable } from "@nestjs/common";

//http-adapter-interface que obliga a usar los metodos de la interfaz
@Injectable()   //usamos el decorador Injectable para que pueda ser inyectado en los servicios, en este caso lo usamos en seed.service.ts
export class AxiosAdapter implements HttpAdapter {

    //creamos una dependencia de axios 
    private axios: AxiosInstance = axios;

    //metodo de la interfaz HttpAdapter
    async get<T>(url: string): Promise<T> {

        try {
            //desestructuramos de la peticion la data, la tipamos de tipo genérico(T)
            const { data } = await this.axios.get<T>(url)
            return data;
        } catch (error) {
            throw new Error('This is an error - Check logs')
        }
    }

}