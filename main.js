const moment = require("moment")

function getCurrentDay(){
    console.log(moment().format('dddd'))
}
function getCurrentMonth(){
    console.log(moment().format('MMMM'))
}
function getCurrentYear(){
    console.log(moment().get("year"))
}

function getDate(){
    console.log(moment([2012, 0, 31]).month(1).format("YYYY-MM-DD").replace(/-/g, "/"), moment().format('LTS').replace(" PM", ""))
}

getCurrentDay()
getCurrentMonth()
getCurrentYear()
getDate()