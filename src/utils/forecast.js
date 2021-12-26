const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e562704299f5e9a6bb484ff07e1d8694&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] +' | It is currently: ' + body.current.temperature + ' ℃ ( feels like ' + body.current.feelslike + '  ℃ ) | The humidity: ' + body.current.humidity + '%' 
            + ' | Air pressure: ' + body.current.pressure + ' millibars' + ' | Wind speed:  '+  body.current.wind_speed + ' km/hour |'+ ' Direction: " '+ body.current.wind_dir + ' "')

        }
    })
}

module.exports = forecast