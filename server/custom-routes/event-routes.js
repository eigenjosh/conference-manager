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

    getPublishedEventsBySearchTerms: {
        path: '/find-events/:query',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Find Activities By Search Terms'
            Events.find({$text: {$search: req.params.query}, published: true})
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
