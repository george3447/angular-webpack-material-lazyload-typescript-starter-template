import { TransitionService } from "@uirouter/angularjs";
import LoaderService from './loader.service';

function loaderRun($transitions: TransitionService, loaderService: LoaderService) {
    $transitions.onStart({}, () => loaderService.show());
    $transitions.onSuccess({}, () => loaderService.hide());
    $transitions.onError({}, () => loaderService.hide());
}

loaderRun.$inject = ['$transitions', 'LoaderService'];

export default loaderRun;