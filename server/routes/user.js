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
    .then(sections => {
      // check to see if we're trying to add a user to a section
      // if section already has 10 users, error out
      if (user.sections.length < sectionIds.length) {
        const sectionToAdd = sections.find(section => !section.users.find(enrolledUser => enrolledUser.id === user.id))
        if (sectionToAdd && sectionToAdd.users.length >= 10) {
          res.status(400).send("This course enrollment has been capped.");
        }
      }
      user.setSections(sections);
    })
    .then(result => res.json(result))
  } else {
    res.status(400).send("No sectionIds found.");
  }
});
