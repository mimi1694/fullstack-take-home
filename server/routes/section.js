const router = require("express").Router();
const { Section, Course, User } = require("../db/models");
module.exports = router;

router.param('sectionId', (req, res, next, sectionId) => {
  Section.findOne({
    where: {id: sectionId},
    attributes: ["id", "nickname", "dateStart"],
		include: [{model: Course}, {model: User}]
  })
  .then(section => {
    req.section = section
    next()
  })
});

router.get("/", (req, res, next) => {
  Section.findAll({
    attributes: ["id", "nickname", "dateStart"],
		include: [{model: Course}, {model: User}]
  })
  .then(sections => res.json(sections))
  .catch(next)
});

router.get('/:sectionId', (req, res, next) => {
  res.send(req.section);
});
