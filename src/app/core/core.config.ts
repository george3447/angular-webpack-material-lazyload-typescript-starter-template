import { format, parse, isValid } from 'date-fns';
import { ILocationProvider } from 'angular';

function configure(
    $mdThemingProvider: ng.material.IThemingProvider,
    $mdDateLocaleProvider: ng.material.IDateLocaleProvider,
    $locationProvider: ILocationProvider) {

    const dateFormat = "DD/MM/YYYY";

    // Angular material theme configuration
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('blue-grey', {
            'default': '500' // use shade 200 for default, and keep all other shades the same
        });

    // Angular material datepicker configuration    
    $mdDateLocaleProvider.formatDate = function (date) {
        return date ? format(date, dateFormat) : '';
    };

    $mdDateLocaleProvider.parseDate = function (dateString) {
        var m = parse(dateString);
        return isValid(m) ? m : new Date(NaN);
    };

    $locationProvider.html5Mode(true);
}

configure.$inject = ['$mdThemingProvider', '$mdDateLocaleProvider', '$locationProvider'];

export default configure;