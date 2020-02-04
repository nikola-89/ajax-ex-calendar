$(document).ready(function() {
    // ***************************
    var year = 2018;
    // Months = are zero indexed, so January is month 0.
    var month = 11;
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
            url: "https://flynn.boolean.careers/exercises/api/holidays",
            method: "GET",
            data: {
                year : year,
                month : month
            },
            success: function (r) {
                if (r.success) {
                    console.log(r.response);
                    holidays(r.response);
                } else {
                    error();
                }
            },
            error: function () {
                error();
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
$('.month').append(builderMonth(config_month));
// Days = Sunday as 0 and Saturday as 6.
var days = moment().year(year).month(month).daysInMonth();
for (var i = 1; i <= days; i++) {
    var config_days = {
        'data': i,
        'day' : moment([year, month, i]).format('dddd D YYYY')
        }
    $('.days').append(builderDay(config_days));
    }
}
// ***************************
function holidays(resp) {
for (var i = 0; i < resp.length; i++) {
    if (moment(resp[i].date).isValid()) {
        for (var x = 0; x < $('.days li').length; x++) {
            if (moment(resp[i].date).date() == $('.days li').eq(x).attr('data')) {
                $('.days li').eq(x).addClass('holiday');
                }
            }
        }
    }
}
// ***************************
function error() {
    console.log('ERR_');
}
// ***************************
