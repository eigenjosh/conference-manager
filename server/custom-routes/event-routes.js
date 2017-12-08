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
    getEventsByLocation: {
        path: '/findevents/:location',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find Activities By Location'
            Events.find({ city: req.params.location})
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
