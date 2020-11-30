const router = require("express").Router();
const { User, Section } = require("../db/models");
const { Op } = require("sequelize");

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
      [Op.and]: [
        {email: req.body.email},
        {name: req.body.name}
      ]
    },
    defaults: {
      email: req.body.email,
      name: req.body.name
    }
	})
  .then(([user, wasCreated]) => {
    return res.json(user);
  })
  .catch(err => { console.error(err); throw err; });
});

// for updating user sections
router.put("/", (req, res, next) => {
  const userId = req.body.userId;
  const sectionIds = req.body.sectionIds;
  if (sectionIds) {
    // find the user and sections that match given Id's
    let user;
    User.findOne({
      where: { id: userId },
      attributes: ["id", "email", "name"],
      include: [{model: Section}]
    })
    .then(foundUser => {
      user = foundUser;
      return Section.findAll({ where: { id: sectionIds }, include: [{model: User}]})
    })
    .then(sections => user.setSections(sections))
    .then(result => res.json(result))
    .catch(console.error);
  } else next();
});
