import Loader from './loader';
import { Endpoints, LoaderOptions } from '../../types';

export default class AppLoader extends Loader {
    constructor() {

        super('https://newsapi.org/v2/', { apiKey: 'b99cd6c90b45475781384b6b58c50962' });
    }

    public getResp<T>(params: { endpoint: Endpoints; options?: LoaderOptions }, callback: (data: T) => void): void {
        super.getResp<T>(params, callback);
    }
}
