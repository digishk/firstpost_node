const fetch   = require('node-fetch');       
       
       exports.tableArr = async function(req,res){

            var url = 'https://xmlns.cricketnext.com/cktnxt/scorecard/olympics/32_calendar.json';

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

            // console.log("event", event.sport);
            // console.log("event:event.event_display_name",event.event_display_name);
            // console.log("event.start_time",event.start_time);
            // console.log("event.venue",event.venue)

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

        

 



// exports.tableArr= function(){
//     let data =
//    [[{sport:"Opening Ceremony",event:"Opening Ceremony",start_time:"4:30 pm",venue:"Olympic Stadium"},
//        {sport:"Archery",event:"Women's Individual Ranking Round",start_time:"5:30 am",venue:"Yumenoshima Park Archery Field"},
//        {sport:"Archery",event:"Men's Individual Ranking Round",start_time:"9:30 am",venue:"Yumenoshima Park Archery Field"},
//        {sport:"Rowing",event:"Men's Single Sculls Heats",start_time:"5:00 am",venue:"Sea Forest Waterway"},
//        {sport:"Rowing",event:"Women's Single Sculls Heats",start_time:"5:00 am",venue:"Sea Forest Waterway"},
//        {sport:"Rowing",event:"Men's Double Sculls Heats",start_time:"5:00 am",venue:"Sea Forest Waterway"},
//        {sport:"Rowing",event:"Women's Double Sculls Heats",start_time:"5:00 am",venue:"Sea Forest Waterway"},
//        {sport:"Rowing",event:"Men's Quadruple Sculls Heats",start_time:"5:00 am",venue:"Sea Forest Waterway"},
//        {sport:"Rowing",event:"Women's Quadruple Sculls Heats",start_time:"5:00 am",venue:"Sea Forest Waterway"}],
//        [{sport:"3x3 Basketball",event:"Women's Pool round, ROC* vs Japan",start_time:"6:45 am",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Women's Pool round, China vs Romania",start_time:"6:45 am",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Men's Pool round, Poland vs Latvia",start_time:"6:45 am",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Men's Pool round, China vs Serbia",start_time:"6:45 am",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Women's Pool round, ROC* vs China",start_time:"10:30 am",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Women's Pool round, Romania vs Japan",start_time:"10:30 am",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Men's Pool round, ROC* vs China",start_time:"10:30 am",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Men's Pool round, Serbia vs Netherlands",start_time:"10:30 am",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Women's Pool round, Italy vs Mongolia",start_time:"2:00 pm",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Women's Pool round, United States vs France",start_time:"2:00 pm",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Men's Pool round, Latvia vs Belgium",start_time:"2:00 pm",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Men's Pool round, Japan vs Poland",start_time:"2:00 pm",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Women's Pool round, Mongolia vs United States",start_time:"5:30 pm",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Women's Pool round, France vs Italy",start_time:"5:30 pm",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Men's Pool round, Netherlands vs ROC*",start_time:"5:30 pm",venue:"Aomi Urban Sports Park"},
//        {sport:"3x3 Basketball",event:"Men's Pool round, Belgium vs Japan",start_time:"5:30 pm",venue:"Aomi Urban Sports Park"},
//        {sport:"Archery",event:"Mixed Team 1/8 Eliminations",start_time:"6:00 am",venue:"Yumenoshima Park Archery Field"}
//    ],
//    [{sport:"3x3 Basketball",event:"Women's Pool round, Japan vs Mongolia",start_time:"6:45 am",venue:"Aomi Urban Sports Park"},
// {sport:"3x3 Basketball",event:"Women's Pool round, Romania vs Italy",start_time:"6:45 am",venue:"Aomi Urban Sports Park"},
// {sport:"3x3 Basketball",event:"Men's Pool round, ROC* vs Belgium",start_time:"6:45 am",venue:"Aomi Urban Sports Park"},
// {sport:"3x3 Basketball",event:"Men's Pool round, Poland vs Serbia",start_time:"6:45 am",venue:"Aomi Urban Sports Park"},
// {sport:"Archery",event:"Women's Team 1/8 Eliminations",start_time:"6 am",venue:"Yumenoshima Park Archery Field"},
// {sport:"Artistic Gymnastics",event:"Women's Qualification",start_time:"6:30 am",venue:"Yumenoshima Park Archery Field"},
// {sport:"Badminton",event:"Men's Singles Group Play Stage",start_time:"6:30 am",venue:"Musashino Forest Sport Plaza"},
// {sport:"Baseball/Softball",event:"Softball Opening Round, Australia vs United States",start_time:"6:30 am",venue:" Yokohama Baseball Stadium"},
// {sport:"Baseball/Softball",event:"Softball Opening Round, Canada vs Japan",start_time:"6:30 am",venue:" Yokohama Baseball Stadium"},
// {sport:"Basketball",event:"Men's Preliminary Round Group A, Islamic Rep. of Iran vs Winner of Olympic Qualifying Tournament in Victoria(Canada)",start_time:"6:30 am",venue:"Saitama Super Arena"},
// {sport:"Beach Volleyball",event:"Men's or Women's Preliminaries (4 matches)",start_time:"5:30 am",venue:"Shiokaze Park"},
// {sport:"Boxing",event:"Women's Fly (48-51kg) - Preliminaries - Round of 32",start_time:"7:30 am",venue:"Kokugikan Arena"},
// {sport:"Boxing",event:"Women's Middle (69-75kg) - Preliminaries - Round of 32",start_time:"7:30 am",venue:"Kokugikan Arena"},
// {sport:"Boxing",event:"Men's Light (57-63kg) - Preliminaries - Round of 32",start_time:"7:30 am",venue:"Kokugikan Arena"},
// {sport:"Boxing",event:"Men's Light Heavy (75-81kg) - Preliminaries - Round of 32",start_time:"7:30 am",venue:"Kokugikan Arena"},
// {sport:"Canoe Slalom",event:"Canoe (C1) Men Heats",start_time:"9:30 am",venue:"Kasai Canoe Slalom Centre"},
// {sport:"Canoe Slalom",event:"Kayak (K1) Women Heats",start_time:"9:30 am",venue:"Kasai Canoe Slalom Centre"},
// {sport:"Cycling Road",event:"Women's Road Race",start_time:"9:30 am",venue:"Fuji International Speedway"},
// {sport:"Cycling Road",event:"Women's Road Race Victory Ceremony",start_time:"9:30 am",venue:"Fuji International Speedway"},
// {sport:"Diving",event:"Women's Synchronised 3m Springboard Final",start_time:"11:30 am",venue:"Tokyo Aquatics Centre"},
// {sport:"Diving",event:"Women's Synchronised 3m Springboard Victory Ceremony",start_time:"11:30 am",venue:"Tokyo Aquatics Centre"},
// {sport:"Equestrian",event:"Dressage Grand Prix Team and Individual Day 2",start_time:"1:30 pm",venue:"Equestrian Park"},
// {sport:"Fencing",event:"Women's Foil Individual Table of 64",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
// {sport:"Fencing",event:"Men's Epée Individual Table of 64",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
// {sport:"Fencing",event:"Women's Foil Individual Table of 32",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
// {sport:"Fencing",event:"Men's Epée Individual Table of 32",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
// {sport:"Fencing",event:"Women's Foil Individual Table of 16",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
// {sport:"Fencing",event:"Men's Epée Individual Table of 16",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
// {sport:"Fencing",event:"Women's Foil Individual Quarterfinals",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
// {sport:"Fencing",event:"Men's Epée Individual Quarterfinals",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
// {sport:"Football",event:"Men's Group C, Egypt vs Argentina",start_time:"1:00 pm",venue:"Sapporo Dome"},
// {sport:"Football",event:"Men's Group C, Australia vs Spain",start_time:"1:00 pm",venue:"Sapporo Dome"},
// {sport:"Handball",event:"Women's Preliminary Round Group A, Netherlands vs Japan",start_time:"5:30 am",venue:"Yoyogi National Stadium"},
// {sport:"Hockey",event:"Women's Pool A, Great Britain vs Germany",start_time:"6:00 am",venue:"Oi Hockey Stadium - North Pitch"},
// {sport:"Judo",event:"Women -52 kg Elimination Rounds",start_time:"7:30 am",venue:"Nippon Budokan"},
// {sport:"Rowing",event:"Men's Single Sculls Semifinals E/F",start_time:"5:30 am",venue:"Sea Forest Waterway"},
// {sport:"Sailing",event:"RS:X Men",start_time:"8:30 am",venue:"Enoshima Yacht Harbour"},
// {sport:"Shooting",event:"Skeet Women's Qualification - Day 1",start_time:"5:30 am",venue:"Asaka Shooting Range - Shotgun Range"},
// {sport:"Skateboarding",event:"Men's Street Prelims Heats",start_time:"5:30 am",venue:"Ariake Urban Sports Park"},
// {sport:"Surfing",event:"Men's Round 1",start_time:"3:30 am",venue:"Tsurigasaki Surfing Beach"},
// {sport:"Swimming",event:"Men's 400m Individual Medley Final",start_time:"7:00 am",venue:"Tokyo Aquatics Centre"},
// {sport:"Table Tennis",event:"Mixed Doubles Quarterfinals",start_time:"6:30 am",venue:"Tokyo Metropolitan Gymnasium"},
// {sport:"Taekwondo",event:"Women -57 kg Round of 16 (8 matches)",start_time:"6:30 am",venue:"Makuhari Messe Hall A"},
// {sport:"Tennis",event:"Men's Singles First Round",start_time:"7:30 am",venue:"Ariake Tennis Park - Center Court"},
// {sport:"Volleyball",event:"Women's Preliminary Round - Pool B, ROC* vs Italy",start_time:"5:30 am",venue:"Ariake Arena"},
// {sport:"Water Polo",event:"Men's Preliminary Round - Group A, South Africa vs Italy",start_time:"6:30 am",venue:"Tatsumi Water Polo Centre"},
// {sport:"Weightlifting",event:"Men's 61 kg Group B and Men's 67 kg Group B",start_time:"8:20 am",venue:"Tokyo International Forum"},

// ],[
//    {sport:"3x3 Basketball",event:"Women's Pool round, Japan vs China",start_time:"6:45 am",venue:"Aomi Urban Sports Park"},
//    {sport:"Archery",event:"Men's Team 1/8 Eliminations",start_time:"6 am",venue:"Yumenoshima Park Archery Field"},
//    {sport:"Artistic Gymnastics",event:"Men's Team Final",start_time:"3:30 pm",venue:"Ariake Gymnastics Centre"},
//    {sport:"Badminton",event:"Men's Singles Group Play Stage",start_time:"6:30 am",venue:"Musashino Forest Sport Plaza"},
//    {sport:"Baseball/Softball",event:"Softball Opening Round, Japan vs United States",start_time:"6:30 am",venue:" Yokohama Baseball Stadium"},
//    {sport:"Baseball/Softball",event:"Softball Opening Round, Canada vs Italy",start_time:"6:30 am",venue:" Yokohama Baseball Stadium"},
//    {sport:"Basketball",event:"Women's Preliminary Round Group A, Republic of Korea vs Spain",start_time:"6:30 am",venue:"Saitama Super Arena"},
//    {sport:"Beach Volleyball",event:"Men's or Women's Preliminaries (4 matches)",start_time:"5:30 am",venue:"Shiokaze Park"},
//    {sport:"Boxing",event:"Men's Fly (48-52kg) - Preliminaries - Round of 32",start_time:"7:30 am",venue:"Kokugikan Arena"},
//    {sport:"Boxing",event:"Men's Middle (69-75kg) - Preliminaries - Round of 32",start_time:"7:30 am",venue:"Kokugikan Arena"},
//    {sport:"Boxing",event:"Women's Feather (54-57kg) - Preliminaries - Round of 16",start_time:"7:30 am",venue:"Kokugikan Arena"},
//    {sport:"Boxing",event:"Men's Light Heavy (75-81kg) - Preliminaries - Round of 32",start_time:"7:30 am",venue:"Kokugikan Arena"},
//    {sport:"Canoe Slalom",event:"Canoe (C1) Men Semi-final",start_time:"9:30 am",venue:"Kasai Canoe Slalom Centre"},
//    {sport:"Canoe Slalom",event:"Canoe (C1) Men Final",start_time:"9:30 am",venue:"Kasai Canoe Slalom Centre"},
//    {sport:"Canoe Slalom",event:"Canoe (C1) Men Victory Ceremony",start_time:"9:30 am",venue:"Kasai Canoe Slalom Centre"},
//    {sport:"Cycling Mountain Bike",event:"WMen's Cross-country",start_time:"11:30 am",venue:"Izu MTB Course"},
//    {sport:"Cycling Mountain Bike",event:"Men's Cross-country Victory Ceremony",start_time:"11:30 am",venue:"Izu MTB Course"},
//    {sport:"Diving",event:"Men's Synchronised 10m Platform Final",start_time:"11:30 am",venue:"Tokyo Aquatics Centre"},
//    {sport:"Diving",event:"Men's Synchronised 10m Platform Victory Ceremony",start_time:"11:30 am",venue:"Tokyo Aquatics Centre"},
//    {sport:"Fencing",event:"Women's Sabre Individual Table of 64",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
//    {sport:"Fencing",event:" Men's Foil Individual Table of 64",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
//    {sport:"Fencing",event:"Women's Sabre Individual Table of 32",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
//    {sport:"Fencing",event:"Men's Foil Individual Table of 32",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
//    {sport:"Fencing",event:"Women's Sabre Individual Table of 16",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
//    {sport:"Fencing",event:"Men's Epée Individual Table of 16",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
//    {sport:"Fencing",event:"Women's Foil Individual Quarterfinals",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
//    {sport:"Fencing",event:"Men's Foil Individual Table of 16",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
//    {sport:"Fencing",event:"Women's Sabre Individual Quarterfinals",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
//    {sport:"Fencing",event:"Men's Foil Individual Quarterfinals",start_time:"5:30 am",venue:"Makuhari Messe Hall B"},
//    {sport:"Handball",event:"Women's Preliminary Round Group A, Netherlands vs Japan",start_time:"5:30 am",venue:"Yoyogi National Stadium"},
//    {sport:"Hockey",event:"Men's Pool B, Germany vs Belgium",start_time:"6:00 am",venue:"Oi Hockey Stadium - North Pitch"},
//    {sport:"Judo",event:"Women -57 kg Elimination Rounds",start_time:"7:30 am",venue:"Nippon Budokan"},
//    {sport:"Rowing",event:"Women's Single Sculls Quarterfinals",start_time:"5:30 am",venue:"Sea Forest Waterway"},
//    {sport:"Rugby",event:"Men's Pool Round (6 matches)",start_time:"9:30 am",venue:"ETokyo Stadium"},
//    {sport:"Sailing",event:"RS:X Men",start_time:"8:30 am",venue:"Enoshima Yacht Harbour"},
//    {sport:"Sailing",event:"RS:X WoMen",start_time:"8:30 am",venue:"Enoshima Yacht Harbour"},
//    {sport:"Shooting",event:"Skeet Women's Qualification - Day 1",start_time:"5:30 am",venue:"Asaka Shooting Range - Shotgun Range"},
//    {sport:"Skateboarding",event:"Women's Street Prelims Heats",start_time:"5:30 am",venue:"Ariake Urban Sports Park"},
//    {sport:"Surfing",event:"Women's Round 3",start_time:"3:30 am",venue:"Tsurigasaki Surfing Beach"},
//    {sport:"Swimming",event:"Women's 100m Butterfly Final",start_time:"7:00 am",venue:"Tokyo Aquatics Centre"},
//    {sport:"Table Tennis",event:"Men's Singles Round 2",start_time:"6:30 am",venue:"Tokyo Metropolitan Gymnasium"},
//    {sport:"Taekwondo",event:"Women -67 kg Round of 16 (8 matches)",start_time:"6:30 am",venue:"Odaiba Marine Park"},
//    {sport:"Tennis",event:"Men's Singles Second Round",start_time:"7:30 am",venue:"Ariake Tennis Park - Center Court"},
//    {sport:"Triathlon",event:"Men",start_time:"3 am",venue:"Odaiba Marine Park"},  
//    {sport:"Volleyball",event:"Men's Preliminary Round - Pool A, Islamic Rep. of Iran vs Venezuela",start_time:"5:30 am",venue:"Ariake Arena"},
//    {sport:"Water Polo",event:"Women's Preliminary Round - Group B, United States vs China",start_time:"10:30 am",venue:"Tatsumi Water Polo Centre"},
//    {sport:"Weightlifting",event:"Women's 55 kg Group B",start_time:"10:20 am",venue:"Tokyo International Forum"}

// ],[
// //27
// {sport:"3x3 Basketball",event:"Women's Pool round, United States vs Japan",start_time:"10:00 am",venue:"Aomi Urban Sports Park"},
// {sport:"Archery",event:"Men's Individual 1/32 & 1/16 Eliminations",start_time:"6 am",venue:"Yumenoshima Park Archery Field"},
// {sport:"Artistic Gymnastics",event:"Women's Team Final",start_time:"3:30 pm",venue:"Ariake Gymnastics Centre"},
// {sport:"Badminton",event:"Men's Singles Group Play Stage",start_time:"7:00 am",venue:"Musashino Forest Sport Plaza"},
// {sport:"Baseball/Softball",event:"Softball Bronze Medal Game",start_time:"9:30 am",venue:" Yokohama Baseball Stadium"},
// {sport:"Baseball/Softball",event:"Softball Gold Medal Game",start_time:"9:30 am",venue:" Yokohama Baseball Stadium"},
// {sport:"Basketball",event:"Women's Preliminary Round Group B, Japan vs France",start_time:"6:30 am",venue:"Saitama Super Arena"},
// {sport:"Beach Volleyball",event:"Men's or Women's Preliminaries (4 matches)",start_time:"5:30 am",venue:"Shiokaze Park"},
// {sport:"Boxing",event:"Men's Welter (63-69kg) - Preliminaries - Round of 16",start_time:"7:30 am",venue:"Kokugikan Arena"},
// {sport:"Boxing",event:"Men's Heavy (81-91kg) - Preliminaries - Round of 16",start_time:"7:30 am",venue:"Kokugikan Arena"},
// {sport:"Boxing",event:"Women's Light (57-60kg) - Preliminaries - Round of 32",start_time:"7:30 am",venue:"Kokugikan Arena"},
// {sport:"Boxing",event:"Women's Welter (64-69kg) - Preliminaries - Round of 16",start_time:"7:30 am",venue:"Kokugikan Arena"},
// {sport:"Canoe Slalom",event:"Kayak (K1) Women Semi-final",start_time:"10:30 am",venue:"Kasai Canoe Slalom Centre"},
// {sport:"Canoe Slalom",event:"Kayak (K1) Women Final",start_time:"10:30 am",venue:"Kasai Canoe Slalom Centre"},
// {sport:"Canoe Slalom",event:"Kayak (K1) Women Victory Ceremony",start_time:"10:30 am",venue:"Kasai Canoe Slalom Centre"},
// {sport:"Cycling Mountain Bike",event:"Women's Cross-country",start_time:"11:30 am",venue:"Izu MTB Course"},
// {sport:"Cycling Mountain Bike",event:"Women's Cross-country Victory Ceremony",start_time:"11:30 am",venue:"Izu MTB Course"},
// {sport:"Diving",event:"Women's Synchronised 10m Platform",start_time:"11:30 am",venue:"Tokyo Aquatics Centre"},
// {sport:"Diving",event:"Women's Synchronised 10m Platform Victory Ceremony",start_time:"11:30 am",venue:"Tokyo Aquatics Centre"},
// {sport:"Equestrian",event:"Dressage Team Grand Prix Special",start_time:"1:30 pm",venue:"Equestrian Park"},
// {sport:"Fencing",event:"Women's Epée Team Quarterfinals",start_time:"7:55 am",venue:"Makuhari Messe Hall B"},
// {sport:"Football",event:"Women's Group G, New Zealand vs Sweden",start_time:"1:30 pm",venue:"Miyagi Stadium"},
// {sport:"Handball",event:"Women's Preliminary Round Group A, Japan vs Montenegro",start_time:"5:30 am",venue:"Yoyogi National Stadium"},
// {sport:"Hockey",event:"Men's Pool A, Argentina vs Australia",start_time:"6:00 am",venue:"Oi Hockey Stadium - North Pitch"},
// {sport:"Judo",event:"Women -63 kg Elimination Rounds",start_time:"7:30 am",venue:"Nippon Budokan"},
// {sport:"Rowing",event:"Men's Single Sculls Semifinals C/D",start_time:"5:30 am",venue:"Sea Forest Waterway"},
// {sport:"Rugby",event:"Men's Pool Round (6 matches)",start_time:"5:30 am",venue:"Tokyo Stadium"},
// {sport:"Sailing",event:"Laser Men",start_time:"8:30 am",venue:"Enoshima Yacht Harbour"},
// {sport:"Sailing",event:"Laser Radial Women",start_time:"8:30 am",venue:"Enoshima Yacht Harbour"},
// {sport:"Shooting",event:"10m Air Pistol Mixed Team Qualification",start_time:"5:30 am",venue:"Asaka Shooting Range - Shotgun Range"},
// // {sport:"Skateboarding",event:"Women's Street Prelims Heats",start_time:"5:30 am",venue:"Ariake Urban Sports Park"},
// {sport:"Surfing",event:"Men's Quarterfinals",start_time:"3:30 am",venue:"Tsurigasaki Surfing Beach"},
// {sport:"Swimming",event:"Women's 200m Freestyle Semifinals",start_time:"7:00 am",venue:"Tokyo Aquatics Centre"},
// {sport:"Table Tennis",event:"Men's Singles Round 3",start_time:"6:30 am",venue:"Tokyo Metropolitan Gymnasium"},
// {sport:"Taekwondo",event:"Women +67 kg Round of 16 (8 matches)",start_time:"6:30 am",venue:"Makuhari Messe Hall A"},
// {sport:"Tennis",event:"Men's Singles Second Round",start_time:"7:30 am",venue:"Ariake Tennis Park - Center Court"},
// {sport:"Triathlon",event:"Women",start_time:"3:00 am",venue:"Odaiba Marine Park"},  
// {sport:"Volleyball",event:"Women's Preliminary Round - Pool B, ROC* vs Argentina",start_time:"5:30 am",venue:"Ariake Arena"},
// {sport:"Water Polo",event:"Men's Preliminary Round - Group A, South Africa vs United States",start_time:"6:30 am",venue:"Tatsumi Water Polo Centre"},
// {sport:"Weightlifting",event:"Women's 59 kg Group B and Women's 64 kg Group B",start_time:"8:20 am",venue:"Tokyo International Forum"}
// ],
// [
//    //28
//    {sport:"3x3 Basketball",event:"Women's Semifinals (2 games)",start_time:"1:30 pm",venue:"Aomi Urban Sports Park"},
//    {sport:"Archery",event:"Men's Individual 1/32 & 1/16 Eliminations",start_time:"6 am",venue:"Yumenoshima Park Archery Field"},
//    {sport:"Artistic Gymnastics",event:"Men's All-Around Final",start_time:"3:45 pm",venue:"Ariake Gymnastics Centre"},
//    {sport:"Badminton",event:"Women's Singles Group Play Stage",start_time:"5:30 am",venue:"Musashino Forest Sport Plaza"},
//    {sport:"Baseball/Softball",event:"Baseball Opening Round Group A, Dominican Rep. vs Japan",start_time:"8:30 am",venue:" Yokohama Baseball Stadium"},
//    {sport:"Basketball",event:"Men's Preliminary Round Group B, Nigeria vs Winner of Olympic Qualifying Tournament in Split(Croatia)",start_time:"6:30 am",venue:"Saitama Super Arena"},
//    {sport:"Beach Volleyball",event:"Men's or Women's Preliminaries (3 matches)",start_time:"5:30 am",venue:"Shiokaze Park"},
//    {sport:"Boxing",event:"Women's Feather (54-57kg) QuarterFinal",start_time:"7:30 am",venue:"Kokugikan Arena"},
//    {sport:"Canoe Slalom",event:"Canoe (C1) Women Heats",start_time:"9:30 am",venue:"Kasai Canoe Slalom Centre"},
//    {sport:"Canoe Slalom",event:"Kayak (K1) Men Heats",start_time:"9:30 am",venue:"Kasai Canoe Slalom Centre"},
//    {sport:"Cycling Mountain Bike",event:"Women's Individual Time Trial",start_time:"8:00 am",venue:"Izu MTB Course"},
//    {sport:"Cycling Mountain Bike",event:"Women's Individual Time Trial Victory Ceremony",start_time:"8:00 am",venue:"Izu MTB Course"},
//    {sport:"Diving",event:"Men's Synchronised 3m Springboard Final",start_time:"11:30 am",venue:"Tokyo Aquatics Centre"},
//    {sport:"Diving",event:"Men's Synchronised 3m Springboard Victory Ceremony",start_time:"11:30 am",venue:"Tokyo Aquatics Centre"},
//    {sport:"Equestrian",event:"Dressage Individual Grand Prix Freestyle",start_time:"2:00 pm",venue:"Equestrian Park"},
//    {sport:"Fencing",event:"Men's Sabre Team Table of 16",start_time:"6:30 am",venue:"Makuhari Messe Hall B"},
//    {sport:"Football",event:"Men's Group B, Romania vs New Zealand",start_time:"2:00 pm",venue:"Sapporo Dome"},
//    {sport:"Handball",event:"Men's Preliminary Round Group B, Denmark vs Bahrain",start_time:"5:30 am",venue:"Yoyogi National Stadium"},
//    {sport:"Hockey",event:"Women's Pool A, Netherlands vs South Africa",start_time:"6:00 am",venue:"Oi Hockey Stadium - North Pitch"},
//    {sport:"Judo",event:"Women -70 kg Elimination Rounds",start_time:"7:30 am",venue:"Nippon Budokan"},
//    {sport:"Rowing",event:"Women's Double Sculls Final B",start_time:"5:00 am",venue:"Sea Forest Waterway"},
//    {sport:"Rugby",event:"Men's Placing 11-12",start_time:"5:30 am",venue:"Tokyo Stadium"},
//    {sport:"Sailing",event:"RS:X Men",start_time:"8:30 am",venue:"Enoshima Yacht Harbour"},
//    {sport:"Shooting",event:"Trap Women's Qualification - Day 1",start_time:"5:30 am",venue:"Asaka Shooting Range - Shotgun Range"},
//    {sport:"Surfing",event:"Women's Bronze medal match",start_time:"3:30 am",venue:"Tsurigasaki Surfing Beach"},
//    {sport:"Swimming",event:"Men's 100m Freestyle Semifinals",start_time:"7:00 am",venue:"Tokyo Aquatics Centre"},
//    {sport:"Table Tennis",event:"Women's Singles Quarterfinals",start_time:"6:30 am",venue:"Tokyo Metropolitan Gymnasium"},
//    {sport:"Tennis",event:"Men's Singles Third Round",start_time:"7:30 am",venue:"Ariake Tennis Park - Center Court"},
//    {sport:"Volleyball",event:"Men's Preliminary Round - Pool A, Canada vs Islamic Rep. of Iran",start_time:"5:30 am",venue:"Ariake Arena"},
//    {sport:"Water Polo",event:"Women's Preliminary Round - Group B, Hungary vs United States",start_time:"10:30 am",venue:"Tatsumi Water Polo Centre"},
//    {sport:"Weightlifting",event:"Men's 73 kg Group B",start_time:"10:20 am",venue:"Tokyo International Forum"}
//    ],
//    [
//        //29
//        // {sport:"3x3 Basketball",event:"Women's Semifinals (2 games)",start_time:"1:30 pm",venue:"Aomi Urban Sports Park"},
//        {sport:"Archery",event:"Men's Individual 1/32 & 1/16 Eliminations",start_time:"6:00 am",venue:"Yumenoshima Park Archery Field"},
//        {sport:"Artistic Gymnastics",event:"Woen's All-Around Final",start_time:"4:20 pm",venue:"Ariake Gymnastics Centre"},
//        {sport:"Badminton",event:"Mixed Doubles Semifinals",start_time:"5:30 am",venue:"Musashino Forest Sport Plaza"},
//        {sport:"Baseball/Softball",event:"Baseball Opening Round Group B, Israel vs Republic of Korea",start_time:"3:30 pm",venue:" Yokohama Baseball Stadium"},
//        {sport:"Basketball",event:"Women's Preliminary Round Group A, Canada vs Republic of Korea",start_time:"6:30 am",venue:"Saitama Super Arena"},
//        {sport:"Beach Volleyball",event:"Men's or Women's Preliminaries (3 matches)",start_time:"5:30 am",venue:"Shiokaze Park"},
//        {sport:"Boxing",event:"Men's Middle (69-75kg) - Preliminaries - Round of 16",start_time:"7:30 am",venue:"Kokugikan Arena"},
//        {sport:"Canoe Slalom",event:"Canoe (C1) Women Semi-final",start_time:"10:30 am",venue:"Kasai Canoe Slalom Centre"},
//        {sport:"Canoe Slalom",event:"Canoe (C1) Women Final",start_time:"10:30 am",venue:"Kasai Canoe Slalom Centre"},
//        {sport:"Cycling BMX Racing",event:"Men's Quarterfinals",start_time:"6:30 am",venue:"Ariake Urban Sports Park"},
//        {sport:"Cycling BMX Racing",event:"Women's Quarterfinals",start_time:"6:30 am",venue:"Ariake Urban Sports Park"},
//        // {sport:"Diving",event:"Men's Synchronised 3m Springboard Final",start_time:"11:30 am",venue:"Tokyo Aquatics Centre"},
//        // {sport:"Diving",event:"Men's Synchronised 3m Springboard Victory Ceremony",start_time:"11:30 am",venue:"Tokyo Aquatics Centre"},
//        // {sport:"Equestrian",event:"Dressage Individual Grand Prix Freestyle",start_time:"2:00 pm",venue:"Equestrian Park"},
//        {sport:"Fencing",event:"Women's Foil Team Quarterfinals",start_time:"7:20 am",venue:"Makuhari Messe Hall B"},
//        {sport:"Golf",event:"Men's Individual Stroke Play Round 1",start_time:"4:00 am",venue:"Kasumigaseki Country Club"},
//        // {sport:"Football",event:"Men's Group B, Romania vs New Zealand",start_time:"2:00 pm",venue:"Sapporo Dome"},
//        {sport:"Handball",event:"Women's Preliminary Round Group A, Netherlands vs Angola",start_time:"5:30 am",venue:"Yoyogi National Stadium"},
//        {sport:"Hockey",event:"Men's Pool A, India vs Argentina",start_time:"6:00 am",venue:"Oi Hockey Stadium - North Pitch"},
//        {sport:"Judo",event:"Women -78 kg Elimination Rounds",start_time:"7:30 am",venue:"Nippon Budokan"},
//        {sport:"Rowing",event:"Men's Single Sculls Final F",start_time:"5:00 am",venue:"Sea Forest Waterway"},
//        {sport:"Rugby",event:"Women's Pool Round (6 matches)",start_time:"5:30 am",venue:"Tokyo Stadium"},
//        {sport:"Sailing",event:"RS:X Men",start_time:"8:30 am",venue:"Enoshima Yacht Harbour"},
//        {sport:"Shooting",event:"25m Pistol Women's Precision Stage",start_time:"5:30 am",venue:"Asaka Shooting Range - R＆P Finals Hall"},
//        {sport:"Surfing",event:"Competition TBD",start_time:"",venue:"Tsurigasaki Surfing Beach"},
//        {sport:"Swimming",event:"Men's 800m Freestyle Final",start_time:"7:00 am",venue:"Tokyo Aquatics Centre"},
//        {sport:"Table Tennis",event:"Women's Singles Semifinals",start_time:"7:30 am",venue:"Tokyo Metropolitan Gymnasium"},
//        {sport:"Tennis",event:"Men's Singles Quarterfinals",start_time:"7:30 am",venue:"Ariake Tennis Park - Center Court"},
//        {sport:"Volleyball",event:"Women's Preliminary Round - Pool B, Italy vs Argentina",start_time:"5:30 am",venue:"Ariake Arena"},
//        {sport:"Water Polo",event:"Men's Preliminary Round - Group A, Hungary vs South Africa",start_time:"6:30 am",venue:"Tatsumi Water Polo Centre"},
//        // {sport:"Weightlifting",event:"Men's 73 kg Group B",start_time:"10:20 am",venue:"Tokyo International Forum"}
//        ],
//        [
//            //30
//            // {sport:"3x3 Basketball",event:"Women's Semifinals (2 games)",start_time:"1:30 pm",venue:"Aomi Urban Sports Park"},
//            {sport:"Archery",event:"Women's Individual 1/8 Eliminations",start_time:"6:00 am",venue:"Yumenoshima Park Archery Field"},
//            {sport:"Athletics",event:"Men's 3000m Steeplechase Round 1",start_time:"5:30 am",venue:"Olympic Stadium"},
//            {sport:"Badminton",event:"Women's Singles Quarterfinals",start_time:"5:30 am",venue:"Musashino Forest Sport Plaza"},
//            {sport:"Baseball/Softball",event:"Baseball Opening Round Group A, Mexico vs Dominican Rep.",start_time:"8:30 am",venue:" Yokohama Baseball Stadium"},
//            {sport:"Basketball",event:"Women's Preliminary Round Group C, Belgium vs Puerto Rico",start_time:"6:30 am",venue:"Saitama Super Arena"},
//            {sport:"Beach Volleyball",event:"Men's or Women's Preliminaries (3 matches)",start_time:"5:30 am",venue:"Shiokaze Park"},
//            {sport:"Boxing",event:"Women's Light (57-60kg) - Preliminaries - Round of 16",start_time:"7:30 am",venue:"Kokugikan Arena"},
//            {sport:"Canoe Slalom",event:"Kayak (K1) Men Semi-final",start_time:"10:30 am",venue:"Kasai Canoe Slalom Centre"},
//            {sport:"Canoe Slalom",event:"Kayak (K1) Men Final",start_time:"10:30 am",venue:"Kasai Canoe Slalom Centre"},
//            {sport:"Cycling BMX Racing",event:"Men's Semifinals",start_time:"6:30 am",venue:"Ariake Urban Sports Park"},
//            {sport:"Cycling BMX Racing",event:"Women's Semifinals",start_time:"6:30 am",venue:"Ariake Urban Sports Park"},
//            {sport:"Diving",event:"Women's 3m Springboard Preliminary",start_time:"11:30 am",venue:"Tokyo Aquatics Centre"},
//            // {sport:"Diving",event:"Men's Synchronised 3m Springboard Victory Ceremony",start_time:"11:30 am",venue:"Tokyo Aquatics Centre"},
//            {sport:"Equestrian",event:"Eventing Dressage Team and Individual Day 1 - Session 1",start_time:"5:00 am",venue:"Equestrian Park"},
//            {sport:"Fencing",event:"Men's Epée Team Table of 16",start_time:"6:30 am",venue:"Makuhari Messe Hall B"},
//            {sport:"Golf",event:"Men's Individual Stroke Play Round 2",start_time:"4:00 am",venue:"Kasumigaseki Country Club"},
//            {sport:"Football",event:"Women's Quarterfinal",start_time:"1:30 pm",venue:"Miyagi Stadium"},
//            {sport:"Handball",event:"Men's Preliminary Round Group A, Argentina vs Brazil",start_time:"5:30 am",venue:"Yoyogi National Stadium"},
//            {sport:"Hockey",event:"Women's Pool A, South Africa vs Germany",start_time:"6:00 am",venue:"Oi Hockey Stadium - North Pitch"},
//            {sport:"Judo",event:"Women +78 kg Elimination Rounds",start_time:"7:30 am",venue:"Nippon Budokan"},
//            {sport:"Rowing",event:"Women's Single Sculls Final C",start_time:"5:15 am",venue:"Sea Forest Waterway"},
//            {sport:"Rugby",event:"Women's Pool Round (6 matches)",start_time:"5:30 am",venue:"Tokyo Stadium"},
//            {sport:"Sailing",event:"Laser Men",start_time:"8:30 am",venue:"Enoshima Yacht Harbour"},
//            {sport:"Shooting",event:"25m Pistol Women's Qualification",start_time:"5:30 am",venue:"Asaka Shooting Range - R＆P Finals Hall"},
//            {sport:"Surfing",event:"Competition TBD",start_time:"",venue:"Tsurigasaki Surfing Beach"},
//            {sport:"Swimming",event:"Men's 100m Butterfly Semifinals",start_time:"7:00 am",venue:"Tokyo Aquatics Centre"},
//            {sport:"Table Tennis",event:"Women's Singles Semifinals",start_time:"4:30 pm",venue:"Tokyo Metropolitan Gymnasium"},
//            {sport:"Tennis",event:"Men's Singles Semifinals",start_time:"8:30 am",venue:"Ariake Tennis Park - Center Court"},
//            {sport:"Trampoline Gymnastics",event:"Women's Qualification",start_time:"9:30 am",venue:"Ariake Gymnastics Centre"},
//            {sport:"Volleyball",event:"Men's Preliminary Round - Pool A, Canada vs Venezuela",start_time:"5:30 am",venue:"Ariake Arena"},
//            {sport:"Water Polo",event:"Women's Preliminary Round - Group A, South Africa vs Netherlands",start_time:"10:30 am",venue:"Tatsumi Water Polo Centre"},
//            // {sport:"Weightlifting",event:"Men's 73 kg Group B",start_time:"10:20 am",venue:"Tokyo International Forum"}
//            ],
// ]
// return data;
//        }















