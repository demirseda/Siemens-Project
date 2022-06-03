const months = [
    { 'id': 1, 'name': 'Jan' },
    { 'id': 2, 'name': 'Feb' },
    { 'id': 3, 'name': 'Mar' },
    { 'id': 4, 'name': 'Apr' },
    { 'id': 5, 'name': 'May' },
    { 'id': 6, 'name': 'Jun' },
    { 'id': 7, 'name': 'Jul' },
    { 'id': 8, 'name': 'Aug' },
    { 'id': 9, 'name': 'Sep' },
    { 'id': 10, 'name': 'Oct' },
    { 'id': 11, 'name': 'Nov' },
    { 'id': 12, 'name': 'Dec' },
];
var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth() + 1;
var staticMonth = new Date().getMonth() + 1;



function letsCheck(year, month) {
    var daysInMonth = new Date(year, month, 0).getDate();
    var firstDay = new Date(year, month, 01).getUTCDay();
    var array = {
        daysInMonth: daysInMonth,
        firstDay: firstDay
    };
    return array;
}


function makeCalendar(year, month) {
    var getChek = letsCheck(year, month);
    getChek.firstDay === 0 ? getChek.firstDay = 7 : getChek.firstDay;
    monthName = months.find(x => x.id === month).name;
    monthID = months.find(x => x.id === month).id;
    currentMonthID = months.find(x => x.id === staticMonth).id;
    $('#calendarList').empty();
    for (let i = 1; i <= getChek.daysInMonth; i++) {
        if (i === 1) {
            var div = `<li id="${i}" style="grid-column-start:${getChek.firstDay};">1<div data_id="${currentYear + "_" +monthName + "_" +i}"><button class="btn showEvent"><i class="bx bx-info-circle"></i></button><span></span><button class="btn deleteEvent"><i class="bx bx-trash"></i></button></div></li>`;
        } else {
            var div = `<li id="${i}"><span>${i}</span><div data_id="${currentYear + "_" +monthName + "_" +i}"><button class="btn showEvent"><i class="bx bx-info-circle"></i></button><button class="btn deleteEvent"><i class="bx bx-trash"></i></button></div></li>`;
        }
        $('#calendarList').append(div);
    }
    
    

    $('#calendarList').attr('data_month_name',monthName);
    if(monthID < currentMonthID){
        $('#calendarList li').addClass("disabled");
    }
    $('#year_month').text(year + ' ' + monthName);
    SIEMENSSHOP.View.Schedule.updateScheduleView();

}

makeCalendar(currentYear, currentMonth);


function nextMonth() {
    currentMonth = currentMonth + 1;
    if (currentMonth > 12) {
        currentYear = currentYear + 1;
        currentMonth = 1;
    }
    $('#calendarList').empty();
    $('#year_month').text(currentYear + ' ' + currentMonth);
    makeCalendar(currentYear, currentMonth);
}


function prevMonth() {
    currentMonth = currentMonth - 1;
    if (currentMonth < 1) {
        currentYear = currentYear - 1;
        currentMonth = 12;
    }
    $('#calendarList').empty();
    $('#year_month').text(currentYear + ' ' + currentMonth);
    makeCalendar(currentYear, currentMonth);
}