$(document).ready(function() {
    // ***************************
    moment.locale('it');
    // ***************************
    var year = 2018;
    // Months = are zero indexed, so January is month 0.
    var month = 0;
    // ***************************
    request(year, month);
    // ***************************
    print(year, month);
    // ***************************
});
// ***************************
// *-------*function*--------*
// ***************************
function request(year, month) {
    $.ajax(
        {
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: "GET",
            data: {
                year : year,
                month : month
            },
            success: function (r) {
                if (r.success) {
                    console.log(r.response);
                    holidays(r.response);
                }
            },
            error: function () {
            }
        }
    );
}
// ***************************
function print(year, month) {
var builderDay = Handlebars.compile($('#day').html());
var builderMonth = Handlebars.compile($('#month').html());
var config_month = {
    'month': moment().month(month).format('MMMM')
    }
$('.month-text').append(builderMonth(config_month));
// Days = Sunday as 0 and Saturday as 6.
var days = moment().year(year).month(month).daysInMonth();
for (var i = 1; i <= days; i++) {
    var config_days = {
        'day': i
        }
    $('.cal-text-col').append(builderDay(config_days));
    }
}
// ***************************
function holidays(resp) {
var builderHolidays = Handlebars.compile($('#holidays').html());
for (var i = 0; i < resp.length; i++) {
    if (moment(resp[i].date).isValid()) {
        for (var x = 0; x < $('.cal-text-col div').length; x++) {
            if (moment(resp[i].date).date() == $('.cal-text-col div').eq(x).attr('data')) {
                $('.cal-text-col div').eq(x).append(builderHolidays(resp[i]));
                $('.cal-text-col div').eq(x).addClass('holiday');
                }
            }
        }
    }
}
// ***************************
