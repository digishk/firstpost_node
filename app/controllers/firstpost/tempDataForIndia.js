const fetch   = require('node-fetch');       
       
       exports.tableArr = async function(req,res){

            var url = 'https://xmlns.cricketnext.com/cktnxt/scorecard/olympics/32_india_calendar.json';

            let MainData = await fetch(url).then(res => res.json()).then(data => {
        return data;
    }) 
    .catch(err => {
        console.log("err",err);
    });

  var schedule = [];

    // return MainData.calendar;
    

    for (var day of MainData.calendar ) {

        var dayData=[];


        for(var event of day.events){

            var dateData = {
                sport: event.sport,
                event:event.event_display_name,
                start_time:event.start_time,
                venue:event.venue
                    }


                    dayData.push(dateData);
                    // console.log("day" , dayData);
            }
                     
            schedule.push(day)
            

        }
        // console.log("schedule",schedule)

        return schedule;
    }