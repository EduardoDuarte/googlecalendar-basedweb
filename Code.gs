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
function valide2(){
  var time = new Date();
  var V_startTime = new Date(time.getTime() + 0 * 60 * 60 * 1000);
  Logger.log(V_startTime)//Sat May 23 10:39:07 GMT-03:00 2015 - //2015-06-11T12:34
  // June 11, 2015 12:34:00 GMT-03:00
}
function valid_date(time2){
  //var time2 = '2015-06-30T00:46'
  var year = time2[0]+time2[1]+time2[2]+time2[3];

  if (time2[5] + time2[6] == 01) var month = 'January'
  if (time2[5] + time2[6] == 02) var month = 'February'
  if (time2[5] + time2[6] == 03) var month = 'March'
  if (time2[5] + time2[6] == 04) var month = 'April'
  if (time2[5] + time2[6] == 05) var month = 'May'
  if (time2[5] + time2[6] == 06) var month = 'June'
  if (time2[5] + time2[6] == 07) var month = 'July'
  if (time2[5] + time2[6] == 08) var month = 'August'
  if (time2[5] + time2[6] == 09) var month = 'September'
  if (time2[5] + time2[6] == 10) var month = 'October'
  if (time2[5] + time2[6] == 11) var month = 'November'
  if (time2[5] + time2[6] == 12) var month = 'December'

  var day =  time2[8] + time2[9]
  var hour = time2[11] + time2[12]+time2[13] + time2[14]+time2[15];
 
  
  var timeGoogleCalerdar = month + ' '+day+','+' '+year+' '+hour+':00'+' '+'GMT-05:00'
  
  return timeGoogleCalerdar;

  
}

/**
*Create Event in calendar
*
**/
function calendar(title,startTime, duration, location,description){
  
  var options = {location: location,description: description, sendInvites: true };
  var time2 = valid_date(startTime);
  
  var time = new Date(time2);
  
  
  var V_endTime = new Date(time.getTime() + (duration)  * 60 * 60 * 1000); 
  
  
  
  
  var event = CalendarApp.getCalendarById(ID_Calendar);
  Logger.log(time)
  Logger.log(V_endTime)
  if (time < V_endTime   ){
    event.createEvent(title, time, V_endTime, options);
    
    MailApp.sendEmail({
      to: EMAIL,
      subject: "Create event on your Calendar: "+ title ,
    
      htmlBody: "The event: " + title+ "<p>"+
      "<p>"+ "Was Create with Sucess: "+"<p>"+
    
      "<p>"+"Start Time: "+ time +"<p>"+
    
      "<p>"+"End Time: "+ V_endTime +"<p>"+
    
      "<p>"+ "Discription: "+ description+"<p>"+
      "<p>"+ "Location: "+ location+ "<p>"
      
    });
    
    
    
  }

  
}

