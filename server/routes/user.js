const router = require("express").Router();
const { User, Section } = require("../db/models");
module.exports = router;

router.get("/:userId", (req, res, next) => {
  User.findOne({
    where: { id: req.params.userId },
    attributes: ["id", "email", "name"],
		include: [{model: Section}]
  })
  .then(user => res.json(user))
});

router.get("/", (req, res, next) => {
	User.findAll({
		attributes: ["id", "email", "name"],
		include: [{model: Section}]
	})
  .then(users => res.json(users))
  .catch(next);
});

router.post("/", (req, res, next) => {
	User.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      email: req.body.email,
      name: req.body.name
    }
	})
  .then(([user, wasCreated]) => {
    if (wasCreated) {
      return res.json(user);
    }
    else {
      let err = new Error("An account already exists for that email address");
      err.status = 409;
      next(err);
    }
  })
  .catch(next);
});

router.put("/", (req, res, next) => {
  console.warn(req.body);
  User.update(
    {
      email: req.body.email,
      name: req.body.name
    },
    { where: { id: req.body.userId } },
  )
  .then(user => {
    if (req.body.sections) {
      User.findOne({where: { id: req.body.userId }})
        .then(user => {
          return Section.findAll({ where: { id: req.body.sections }})
            .then(sections => {
              return user.setSections(sections);
            })
        });
    } else return Promise.resolve(user);
  })
  .then(user => res.json(user))
  .catch(next)
});
