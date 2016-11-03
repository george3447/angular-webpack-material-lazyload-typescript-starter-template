import { IQService } from 'angular';
import { Transition } from 'angular-ui-router';

import LoaderService from './loader/loader.service';

export function loadLazyState(callback: (resolve: angular.IQResolveReject<{}>, $ocLazyLoad: any) => void) {
    return (transition: Transition) => {
        let injector = transition.injector();
        let $ocLazyLoad = injector.get('$ocLazyLoad');
        let $q: IQService = injector.get('$q');
        let loaderService: LoaderService = injector.get('LoaderService');
        if (loaderService && loaderService.show) { loaderService.show(); }
        return $q((resolve) => callback(resolve, $ocLazyLoad));
    };
}

export function resolveLazyState(lazyModule: any, resolve: angular.IQResolveReject<{}>, $ocLazyLoad: any) {
    if (lazyModule && lazyModule.default) {
        $ocLazyLoad.load({ name: lazyModule.default });
        resolve(lazyModule);
    }
}

export enum HttpSuccessCodes {
    // CONTINUE = 100,
    // SWITCHING_PROTOCOLS = 101,
    // PROCESSING = 102,
    // HEURISTIC_EXPIRATION = 113,
    // MISCELLANEOUS_WARNING = 199,

    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    ALREADY_REPORTED = 208,
    TRANSFORMATION_APPLIED = 214,
    IM_USED = 226,
    MISCELLANEOUS_PERSISTENT_WARNING = 299

    // MULTIPLE_CHOICES = 300,
    // MOVED_PERMANENTLY = 301,
    // FOUND = 302,
    // SEE_OTHER = 303,
    // NOT_MODIFIED = 304,
    // USE_PROXY = 305,
    // UNUSED = 306,
    // TEMPORARY_REDIRECT = 307,
    // PERMANENT_REDIRECT = 308,
    // TOO_MANY_REDIRECTS = 310,

    // BAD_REQUEST = 400,
    // UNAUTHORIZED = 401,
    // PAYMENT_REQUIRED = 402,
    // FORBIDDEN = 403,
    // NOT_FOUND = 404,
    // METHOD_NOT_ALLOWED = 405,
    // NOT_ACCEPTABLE = 406,
    // PROXY_AUTHENTICATION_REQUIRED = 407,
    // REQUEST_TIMEOUT = 408,
    // CONFLICT = 409,
    // GONE = 410,
    // LENGTH_REQUIRED = 411,
    // PRECONDITION_FAILED = 412,
    // PAYLOAD_TOO_LARGE = 413,
    // URI_TOO_LONG = 414,
    // UNSUPPORTED_MEDIA_TYPE = 415,
    // RANGE_NOT_SATISFIABLE = 416,
    // EXPECTATION_FAILED = 417,
    // IM_A_TEAPOT = 418,
    // MISDIRECT_REQUEST = 421,
    // UNPROCESSABLE_ENTITY = 422,
    // LOCKED = 423,
    // FAILED_DEPENDENCY = 424,
    // UNORDERED_COLLECTION = 425,
    // UPGRADE_REQUIRED = 426,
    // PRECONDITION_REQUIRED = 428,
    // TOO_MANY_REQUEST = 429,
    // REQUEST_HEADER_FIELDS_TOO_LARGE = 431,

    // INTERNAL_SERVER_ERROR = 500,
    // NOT_IMPLEMENTED = 501,
    // BAD_GATEWAY = 502,
    // SERVICE_UNAVAILABLE = 503,
    // GATEWAY_TIMEOUT = 504,
    // HTTP_VERSION_NOT_SUPPORTED = 505,
    // VARIANT_ALSO_NEGOTIATES = 506,
    // INSUFFICIENT_STORAGE = 507,
    // LOOP_DETECTED = 508,
    // NOT_EXTENDED = 510,
    // NETWORK_AUTHENTICATION_REQUIRED = 511
}
