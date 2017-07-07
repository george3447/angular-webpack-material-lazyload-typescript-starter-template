import { install, InstallOptions, applyUpdate } from 'offline-plugin/runtime';

export function initServiceWorker() {

    console.log("hi offline invoked");

    let isProductionBuild: boolean = __ENV !== "build";

    const serviceEvents: InstallOptions = {
        onInstalled: onInstalled,
        onUpdated: onUpdated,
        onUpdateFailed: onUpdateFailed,
        onUpdateReady: onUpdateReady,
        onUpdating: onUpdating
    }

    if (isProductionBuild) {

        install(serviceEvents);
    }

    function onInstalled() {
        console.log("App install and ready to use. :(");
    }

    function onUpdated() {
        window.location.reload();
        console.log("App successfully updated.");
    }

    function onUpdateFailed() {
        console.log("App updation failed. :(");
    }

    function onUpdateReady() {
        console.log("Updates available and ready to install");
        applyUpdate();
    }

    function onUpdating() {
        console.log("Downloading updates.....");
    }
}