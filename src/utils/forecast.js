const request = require('request')

const getData = (url, callback) => {
    //console.log(`Pokusaj na url: ${url}`)
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        // ovo prvo je error kada je istekao token
        if (body.success === false) {
            callback("Api Token Invalid", null);
        } else if (error) {
            callback('Unable to connect to weather service!', null);
        } else if (body.error) {
            callback('Unable to find location', null)
        } else {
            callback(null, body.current.weather_descriptions[0] + ' | It is currently: ' + body.current.temperature + ' ℃(feels like ' + body.current.feelslike + '  ℃) | The humidity: ' + body.current.humidity + '%' +
                ' | Air pressure: ' + body.current.pressure + ' millibars' + ' | Wind speed:  ' + body.current.wind_speed + ' km/hour |' + ' Direction: " ' + body.current.wind_dir + ' "')
        }
    })
}

const forecast = (latitude, longitude, callback) => {

    const apiKeys = ["c4054b998d8b5e479c6ffab215e38812", "e562704299f5e9a6bb484ff07e1d8694"];


    getData(`http://api.weatherstack.com/current?access_key=${apiKeys[0]}&query=${latitude},${longitude}`, (err, data) => {
        if (err === "Api Token Invalid") {
            return getData(`http://api.weatherstack.com/current?access_key=${apiKeys[1]}&query=${latitude},${longitude}`, callback)
        } else {
            return callback(err, data);
        }
    })

}

module.exports = forecast