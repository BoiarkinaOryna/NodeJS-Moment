import moment from "moment"

export function getCurrentDay(){
    console.log(moment().format('dddd'))
}
export function getCurrentMonth(){
    console.log(moment().format('MMMM'))
}
export function getCurrentYear(){
    console.log(moment().get("year"))
}

export function getDate(){
    console.log(moment().month(1).format("YYYY-MM-DD").replace(/-/g, "/"), moment().format("HH:mm:ss"))
}

