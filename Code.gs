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
var ID_Calendar = '7o3elmb8pl4feibiedc3vblja8@group.calendar.google.com'

function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index.html');


  // Build and return HTML in IFRAME sandbox mode.
  return template.evaluate()
      .setTitle('Web App Window Title')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}
/**
*Funciton for valid times
 */

function valid_date(time2){
  
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
 
  
  var timeGoogleCalerdar = month + ' '+day+','+' '+year+' '+hour+':00'+' '+'GMT-03:00'
  return timeGoogleCalerdar;
  
}

/**
*Create Event in calendar
*
**/
function calendar(title, startTime, endTime, location,description,email){
  
  var options = {location: location,description: description,guests: email, sendInvites: true };
  
  var V_startTime = valid_date(startTime)
  var V_endTime = valid_date(endTime)
  
  
  var event = CalendarApp.getCalendarById(ID_Calendar);
   
  if (startTime != 'null'){
    MailApp.sendEmail({
       to: EMAIL,cc: email,
    subject: "Create event on your Calendar: "+ title ,
    
    htmlBody: "The event: " + title+ "<p>"+
      "<p>"+ "Was Create with Sucess: "+"<p>"+
    
    "<p>"+"Start Time: "+new Date(V_startTime)+"<p>"+
    
    "<p>"+"End Time: "+ new Date(V_endTime) +"<p>"+
    
    "<p>"+ "Discription: "+ description+"<p>"+
    "<p>"+ "Location"+"<p>" + location+
      "<p>"+ "Creator: "+ email +" <p>" 
     });
    return event.createEvent(title, new Date(V_startTime), new Date(V_endTime), options);
  }
  
  
 
  
}


