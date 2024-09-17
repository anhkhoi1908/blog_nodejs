const Course = require('../../models/Course');

class NewsController {
    // [GET] /news
    index(req, res, next) {
        // res.render('news');

        // res.json({
        //     name: 'test'
        // })

        Course.find({})
            .lean()
            .then((courses) => res.render('news', { courses }))
            .catch(next);
    }

    // // [GET] /news/:slug
    // show(req, res) {
    //     res.send('NEW DETAILS');
    // }
}

module.exports = new NewsController();
