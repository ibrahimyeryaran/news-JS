import Loader from './loader';
import { Endpoints, LoaderOptions } from '../../types';

export default class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', { apiKey: '9b3631ad3932443fbb4be22d973320e5' });
    }

    public getResp<T>(params: { endpoint: Endpoints; options?: LoaderOptions }, callback: (data: T) => void): void {
        super.getResp<T>(params, callback);
    }
}
