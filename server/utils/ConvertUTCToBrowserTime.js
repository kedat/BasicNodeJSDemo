import moment from 'moment';

const ConvertUTCToBrowserTime = function (
    timeUTC,
    format = 'DD-MM-YYYY',
) {
    if (timeUTC) {
        const timeZoneBrowser =
            Intl.DateTimeFormat().resolvedOptions().timeZone;
        const convertTime = new Date(timeUTC).toLocaleString('en-US', {
            timeZone: timeZoneBrowser,
        });

        return moment(new Date(convertTime)).format(format);
    }
    return '';
};

export default ConvertUTCToBrowserTime;
