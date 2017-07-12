interface IMessageOptions {
    title: string;
    subject: string;
    okButtonLabel?: string;
}

export interface IAlertOptions extends IMessageOptions {
    afterClosed?: () => any;
}

export interface IConfirmOptions extends IMessageOptions {
    okButtonLabel?: string;
    cancelButtonLabel?: string;
    successCallback?: () => any;
    errorCallback?: () => any;
}

class MessageService {

    static $inject: Array<string> = ['$mdDialog'];

    constructor(private $mdDialog:angular.material.IDialogService) { }

    alert(options: IAlertOptions) {
        let alert = this.$mdDialog.alert()
            .title(options.title)
            .textContent(options.subject)
            .ok(options.okButtonLabel || "Ok");

        this.$mdDialog
            .show(alert)
            .then(options.afterClosed);
    }

    confirm(options: IConfirmOptions) {
        let confirm = this.$mdDialog.confirm()
            .title(options.title)
            .textContent(options.subject)
            .ok(options.okButtonLabel || "Yes")
            .cancel(options.cancelButtonLabel || "No");

        this.$mdDialog
            .show(confirm)
            .then(options.successCallback, options.errorCallback);
    }

}

export default MessageService;