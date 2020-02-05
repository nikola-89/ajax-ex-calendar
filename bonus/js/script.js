$(document).ready(function() {
    // ***************************
    moment.locale('it');
    // ***************************
    var year_ = 2018;
    var month_ = 0;
    // ***************************
    var base = moment({year: year_, month: month_});
    checkArrowLeft(base);
    // ***************************
    request(base);
    // ***************************
    print(base);
    // ***************************
    $(document).on('click', '.arrow-left, .arrow-right', function() {
        if ($(this).hasClass('arrow-left')) {
            prevM(base);
        } else {
            nextM(base);
        }
    });
});
// ***************************
// *-------*function*--------*
// ***************************
function request(base) {
    $.ajax(
        {
            url: "https://flynn.boolean.careers/exercises/api/holidays",
            method: "GET",
            data: {
                year : base.year(),
                month : base.month()
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
function print(base) {
var builderDay = Handlebars.compile($('#day').html());
var builderMonth = Handlebars.compile($('#month').html());
$('.month-text').append(builderMonth({'month': base.format('MMMM YYYY')}));
for (var i = 1; i <= base.daysInMonth(); i++) {
    var config_days = {
        'data': i,
        'day' : base.date(i).format('D'),
        'name' : base.date(i).format('dddd')
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
                $('.cal-text-col div').eq(x).append(builderHolidays(resp[i]).replace('Lunedì di', '').replace('Festa del Lavoro', 'festa lavoro').replace('Festa della Repubblica', 'repubblica ita'));
                $('.cal-text-col div').eq(x).addClass('holiday');
                }
            }
        }
    }
}
// ***************************
function prevM(base) {
if (checkArrowLeft(base)) {
    base = base.subtract(1, 'months');
    request(base);
    $('.cal-text-col div').remove();
    $('.month-text h2').remove();
    print(base);
    checkArrowLeft(base);
    }
}
// ***************************
function nextM(base) {
if (checkArrowRight(base)) {
    base = base.add(1, 'months');
    request(base);
    $('.cal-text-col div').remove();
    $('.month-text h2').remove();
    print(base);
    checkArrowRight(base);
    }
}
// ***************************
function checkArrowLeft(base) {
if (base.month() == 0) {
    $('.arrow-left svg').addClass('disabled');
    return false;
} else {
    $('.arrow-right svg').removeClass('disabled');
    return true;
    }
}
// ***************************
function checkArrowRight(base) {
if (base.month() == 11) {
    $('.arrow-right svg').addClass('disabled');
    return false;
} else {
    $('.arrow-left svg').removeClass('disabled');
    return true;
    }
}
// ***************************
function error() {
    console.log('ERROR');
}
// ***************************
