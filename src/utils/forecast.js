const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url= 'http://api.weatherstack.com/current?access_key=83026546e96fd941862d9207ca0693f5&query='+ latitude +','+longitude 
    request({url, json: true},(error, {body}={})=>{
        if (error){
            callback('Unable to get the forecast services', undefined)
        }else if( body.error){
            callback('Given co-ordinates are not correct', undefined)
        } else{
            callback(undefined,body.current.weather_descriptions[0] + '. the current temperature is '+ body.current.temperature + 'C'+'. It feels like '+ body.current.feelslike +'C'+'. Humidity is '+ body.current.humidity+'%')
        }

    })
}


module.exports =  forecast