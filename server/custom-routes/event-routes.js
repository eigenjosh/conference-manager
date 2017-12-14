let Events = require('../models/event')
let Activities = require('../models/activity')

module.exports = {
    getActivitiesByEventId: {
        path: '/events/:eventId/activities',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find Activities By Event'
            Activities.find({ eventId: req.params.eventId })
                .then(activities => {
                    res.send(handleResponse(action, activities))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    getPublishedEvents: {
        path: '/find-events',
        reqType: 'get',
        method(req, res, next) {
          let action = 'Find Published Events'
          Events.find({ published: true})
            .then(events => {
              res.send(handleResponse(action, events))
            }).catch(error => {
              return next(handleResponse(action, null, error))
            })
        }
      },
    getPublishedEventsByLocation: {
        path: '/find-events/:location',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find Activities By Location'
            Events.find({ city: req.params.location, published: true})
                .then(events => {
                    res.send(handleResponse(action, events))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    getEventsByProperties: {
        path: '/find-events?city=:city&state=:state&zip=:zip&venue=:venue',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find Activities By Properties'
            console.log('request parameters for get Events: ', req.params)
            var query = {}
            for (var prop in req.params) {
               if(req.params[prop]) {
                   query[prop] = req.params[prop]
               }
            }
            query['published'] = true
            Events.find(query)
                .then(events => {
                    res.send(handleResponse(action, events))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    }
}

function handleResponse(action, data, error) {
    var response = {
        action: action,
        data: data
    }
    if (error) {
        response.error = error
    }
    return response
}
