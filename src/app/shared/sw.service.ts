import { IWindowService } from 'angular';
import { install, InstallOptions, applyUpdate } from 'offline-plugin/runtime';

import MessageService from './message.service';

let isProductionBuild: boolean = __ENV !== "build";

export default class SWService {

    static $inject: Array<string> = ['$window', 'MessageService'];

    constructor(
        private $window: IWindowService,
        private messageService: MessageService) { }

    init() {

        const serviceEvents: InstallOptions = {
            onInstalled: this.onInstalled,
            onUpdated: this.onUpdated,
            onUpdateFailed: this.onUpdateFailed,
            onUpdateReady: this.onUpdateReady,
            onUpdating: this.onUpdating
        }

        if (isProductionBuild) {

            install(serviceEvents);
        }

    }

    private onUpdating = () => {
        console.log("Downloading updates.....");
    }

    private onUpdateReady = () => {
        console.log("Updates available and ready to install");
        applyUpdate();
    }

    private onInstalled = () => {
        console.log("App installed and ready to use. :)");
    }

    private onUpdated = () => {
        this.messageService.alert({
            title: "Update Installed",
            subject: "A new update has been installed, please click OK to reload the application.",
            afterClosed: () => this.$window.location.reload()
        });
        console.log("App successfully updated.");
    }

    private onUpdateFailed = () => {
        console.log("App updation failed. :(");
    }
}