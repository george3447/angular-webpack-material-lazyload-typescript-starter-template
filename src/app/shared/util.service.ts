import { Transition, StateService, StateDeclaration } from '@uirouter/angularjs';

export function loadLazyState(importModule) {
    return ($transition$: Transition) => {
        let $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
        return importModule()
            .then(mod => $ocLazyLoad.load({ name: mod.default }));
    }
}

export function preloadState(transition: Transition, parentState: string) {
    let $state: StateService = transition.router.stateService;
    let lazyStates: Array<StateDeclaration> = $state.get().filter(state => state.lazyLoad && state.parent === parentState);
    lazyStates.forEach(state => $state.lazyLoad(state));
}

export enum HttpSuccessCodes {
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
    MISCELLANEOUS_PERSISTENT_WARNING = 299,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_ALSO_NEGOTIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511
}
