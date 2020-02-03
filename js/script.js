$(document).ready(function() {
    // ***************************
    var year = 2018;
    // Months = are zero indexed, so January is month 0.
    var month = 0;
    // ***************************
    var url_api = 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=' + month;
    request(url_api);
    response = [];
    // ***************************
    builderDay = Handlebars.compile($('#day').html());
    // ***************************
    print(year, month);
    // ***************************
});
// ***************************
// *-------*function*--------*
// ***************************
function request(url) {
    $.ajax(
        {
            url: url,
            method: "GET",
            success: function (r) {
                if (r.success) {
                    $.each(r.response, function(key, value) {
                        response.push(value);
                    });
                    console.log(response);
                    holidays(response);
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
function print(year, month) {
// Days = with Sunday as 0 and Saturday as 6.
var days = moment().year(year).month(month).daysInMonth();
for (var i = 1; i <= days; i++) {
    var config = {
        'data': i,
        'day' : moment([year, month, i]).format('dddd D MMMM YYYY')
        }
    $('.month').append(builderDay(config));
    }
}
// ***************************
function holidays(array) {
for (var i = 0; i < array.length; i++) {
    if (moment(array[i].date).isValid()) {
        for (var x = 0; x < $('.month li').length; x++) {
            if (moment(array[i].date).date() == $('.month li').eq(x).attr('data')) {
                $('.month li').eq(x).addClass('holiday');
                }
            }
        }
    }
}
// ***************************
function error() {
    console.log('da inserire fun errore');
}
// ***************************
