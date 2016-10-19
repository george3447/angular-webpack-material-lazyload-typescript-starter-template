import MessageService, { IAlertOptions } from './message.service';
import { HttpSuccessCodes } from './util.service';

class HelperService {

    static $inject: Array<string> = ['MessageService'];
    constructor(private messageService: MessageService) { }

    handleSuccessResponse = (response) => {
        let data;
        if (response && response.status &&
            HttpSuccessCodes[response.status] && response.data) {
            data = response.data.d ? response.data.d : response.data;
        }
        else {
            this.handleErrorResponse(response);
        }
        return data;
    }

    handleErrorResponse = (data) => {
        this.messageService.alert(<IAlertOptions>{
            title: data.status,
            subject: data.statusText
        });
    }

}

export default HelperService; 