//clase adaptadora para el uso de los diferentes servicios para
//peticiones http, como axios,fetch,etc

export interface HttpAdapter {
    //metodo que tiene que implementar la clase que use esta interfaz
    get<T> ( url:string ): Promise<T>;
}