const router = require("express").Router();
const { Session, Course } = require("../db/models");
module.exports = router;

router.param('sessionId', (req, res, next, sessionId) => {
  Session.findOne({
    where: {id: sessionId},
    attributes: ["id", "sessionNumber", "name", "released", "description"],
		include: [{model: Course}]
  })
  .then(session => {
    req.session = session
    next()
  })
});

router.get("/", (req, res, next) => {
  Session.findAll({
    attributes: ["id", "sessionNumber", "name", "released", "description"],
		include: [{model: Course}]
  })
  .then(sessions => res.json(sessions))
  .catch(next)
});

router.get('/:sessionId', (req, res, next) => {
  res.send(req.session)
});

router.post("/", (req, res, next) => {
	Session.findOrCreate({
		where: {
      name: req.body.name,
      sessionNumber: req.body.sessionNumber,
      released: req.body.released,
      description: req.body.description,
      
    }
	})
		.then(arr => {
			if (arr[1]) {
				res.send(arr[0]);
			}
			else {
				let err = new Error("An account already exists for that email address");
				err.status = 409;
				next(err);
			}
		})
		.catch(next);
});

