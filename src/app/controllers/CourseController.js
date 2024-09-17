const Course = require('../../models/Course');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        // res.send('COURSE DETAILS');
        Course.findOne({ slug: req.params.slug })
            .lean()
            // .then((course) => res.json(course))
            .then((course) => res.render('courses/show', { course }))
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('/me/stored/courses');
    }

    // [POST] /courses/store
    store(req, res, next) {
        const formData = { ...req.body };
        const course = new Course(formData);
        course
            .save()
            // res.send('Craete success!!!');
            .then(() => res.redirect('/news'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        // res.render('courses/edit');
        Course.findById(req.params.id)
            .lean()
            .then((course) => res.render('courses/edit', { course }))
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        // res.jon(req.body)
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        // res.jon(req.body)
        // Course.delete({ _id: req.params.id })
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.deleteMany({ _id: {$in: req.body.courseIds} })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break
            default:
                res.json({message: 'Action is invalid'})
        }
    }
}

module.exports = new CourseController();
