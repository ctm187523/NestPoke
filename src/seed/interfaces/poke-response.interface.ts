//de la peticion de seed.servive.ts usando axios --> const { data } = await this.axios.get('https://pokeapi.co/api/v2/pokemon?limit=650')
//obtenemos la data en postman lo ejecutamos y copiamos la respuesta 
//usamos Paste Json as Code para crear el tipado, le ponemos el nombre en Paste JSON as Caode de PokeResponse
export interface PokeResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];
}

export interface Result {
    name: string;
    url:  string;
}
