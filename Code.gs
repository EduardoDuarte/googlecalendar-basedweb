/*
*contact  :  eduardoduarte.83@gmail.com
*twitter  :  @duarteedu
*/

/**
 * Serves HTML of the application for HTTP GET requests.
*Var for send e-mail own calendar
*Var for ID Calendar 
 */
var EMAIL = 'eduardoduarte.83@gmail.com'
var ID_Calendar = 'dc24snsn0c9ei1e68a4b864gls@group.calendar.google.com'


function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index.html');


  // Build and return HTML in IFRAME sandbox mode.
  return template.evaluate()
      .setTitle('Web App Window Title')
      .setSandboxMode(HtmlService.SandboxMode.NATIVE);
}
/**
*Funciton for valid times
 */

function valid_date(date, time){

  var year = date[0]+date[1]+date[2]+date[3];

  if (date[5] + date[6] == 01) var month = 'January'
  if (date[5] + date[6] == 02) var month = 'February'
  if (date[5] + date[6] == 03) var month = 'March'
  if (date[5] + date[6] == 04) var month = 'April'
  if (date[5] + date[6] == 05) var month = 'May'
  if (date[5] + date[6] == 06) var month = 'June'
  if (date[5] + date[6] == 07) var month = 'July'
  if (date[5] + date[6] == 08) var month = 'August'
  if (date[5] + date[6] == 09) var month = 'September'
  if (date[5] + date[6] == 10) var month = 'October'
  if (date[5] + date[6] == 11) var month = 'November'
  if (date[5] + date[6] == 12) var month = 'December'

  var day =  date[8] + date[9]
  var hour = time[0] + time[1]+time[2] + time[3]+time[4];
 
  
  var timeGoogleCalerdar = month + ' '+day+','+' '+year+' '+hour+':00'+' '+'GMT-03:00'
  
  return timeGoogleCalerdar;
  
  
}

/**
*Create Event in calendar
*
**/

function test(){
  var time = new Date();
  var V_startTime = new Date(time.getTime() + (4+0) * 60 * 60 * 1000);
  var V_endTime =  new Date(time.getTime() + (4+1) * 60 * 60 * 1000);
  var options = {location: 'Itatiba',description: 'Qualquer coisa', sendInvites: true };
  
  Logger.log(V_startTime);
  var event = CalendarApp.getCalendarById(ID_Calendar);
  
  event.createEvent('Eduardo', V_startTime, V_endTime, options);
}

function calendar(title,StartDate,StartTime,duration, location,description){
  
  var options = {location: location,description: description, sendInvites: true };
  var StartDayTime = valid_date(StartDate, StartTime);
  
  var time = new Date(StartDayTime);
  
  var V_startTime = new Date(time.getTime() + (  0 ) * 60 * 60 * 1000);
  var V_endTime =  new Date(time.getTime() + ( duration ) * 60 * 60 * 1000);
  
  Logger.log(V_startTime);
  Logger.log(StartTime);
  Logger.log(time);
  var event = CalendarApp.getCalendarById(ID_Calendar);
 
  if (time < V_endTime   ){
    event.createEvent(title, V_startTime, V_endTime, options);
    
    MailApp.sendEmail({
      to: EMAIL,
      subject: "Create event on your Calendar: "+ title ,
    
      htmlBody: "The event: " + title+ "<p>"+
      "<p>"+ "Was Create with Sucess: "+"<p>"+
    
      "<p>"+"Start Time: "+ V_startTime +"<p>"+
    
      "<p>"+"End Time: "+ V_endTime +"<p>"+
    
      "<p>"+ "Discription: "+ description+"<p>"+
      "<p>"+ "Location: "+ location+ "<p>"
      
    });
    
    
    
  }

  
}
