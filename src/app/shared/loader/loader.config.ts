import {
    IQService,
    ICacheFactoryService,
    ITimeoutService,
    ILogService,
    IHttpInterceptor,
    IRequestConfig,
    IPromise
} from 'angular';

import LoaderService from './loader.service';

export interface ICustomRequestConfig extends IRequestConfig {
    ignoreLoadingBar?: boolean;
    isCached?: boolean;
}

function loaderConfigure($httpProvider) {

    const loaderInterceptor = function ($q:IQService, $cacheFactory:ICacheFactoryService, $timeout:ITimeoutService, $log:ILogService, loaderService:LoaderService): IHttpInterceptor {

        let loaderTimeout;

        const latencyThreshold = 100;

        const config: IHttpInterceptor = {
            request: request,
            response: response,
            responseError: responseError
        };

        return config;

        function request(config: ICustomRequestConfig): ICustomRequestConfig {
            $log.info('Interceptor activated');
            if (!config.ignoreLoadingBar && !isCached(config)) {
                $log.info('Initiated logger service with ' + latencyThreshold + ' ms');
                loaderTimeout = $timeout(() => {
                    loaderService.show();
                    $log.info('Loader is visible now');
                }, latencyThreshold);
            }
            return config;
        }

        function response(response: any): any {
            if (!response || !response.config) {
                $log.error('Config object not supplied in response');
                return response;
            }
            setComplete();
            return response;
        }

        function responseError(rejection): IPromise<any> {
            if (!rejection || !rejection.config) {
                $log.error('Config object not supplied in rejection');
                return $q.reject(rejection);
            }

            if (!rejection.config.ignoreLoadingBar && !isCached(rejection.config)) {
                setComplete();
            }
            return $q.reject(rejection);
        }

        function isCached(config: ICustomRequestConfig): boolean {
            let cache;
            let defaultCache = $cacheFactory.get('$http');
            let defaults = $httpProvider.defaults;

            if ((config.cache || defaults.cache) && config.cache !== false &&
                (config.method === 'GET' || config.method === 'JSONP')) {
                cache = angular.isObject(config.cache) ? config.cache
                    : angular.isObject(defaults.cache) ? defaults.cache
                        : defaultCache;
            }

            let cached = cache !== undefined ?
                cache.get(config.url) !== undefined : false;

            if (config.isCached !== undefined && cached !== config.isCached) {
                return config.isCached;
            }
            config.isCached = cached;
            return cached;
        }

        function setComplete(): void {
            $timeout.cancel(loaderTimeout);
            loaderService.hide();
            $log.info('Loader is hidden now');
        }

    };

    loaderInterceptor.$inject = ['$q', '$cacheFactory', '$timeout', '$log', 'LoaderService'];

    $httpProvider.interceptors.push(loaderInterceptor);
}

loaderConfigure.$inject = ['$httpProvider'];

export default loaderConfigure;