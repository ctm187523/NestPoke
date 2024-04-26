import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
    
    providers: [ AxiosAdapter ],
    exports: [ AxiosAdapter ] //exportamos el AxiosAdapter creado para que pueda ser usado fuera de este modulo
})
export class CommonModule {}
