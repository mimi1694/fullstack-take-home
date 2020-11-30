const db = require('./db');
const { User, Section, Session, Course } = require('./db/models');
const seedCourses = require('../data/courses.json');
const seedCourseSections = require('../data/course-sections.json');
const seedCourseSessions = require('../data/course-sessions.json');

const seed = (async () => {
  await db.sync({force: true});

  const courses = await Promise.all(seedCourses.map(course => Course.create(course)));
  const sessions = await Promise.all(seedCourseSessions.map(session => Session.create(session)));
  
  const section1 = await Section.create({ "id": 1, "courseId": 1, "nickname": "Section 1", "dateStart": "2020-10-30" });
	const section2 = await Section.create({ "id": 2, "courseId": 1, "nickname": "Section 2", "dateStart": "2020-11-13" });
	const section3 = await Section.create({ "id": 3, "courseId": 1, "nickname": "Section 3", "dateStart": "2020-11-27" });
	const section4 = await Section.create({ "id": 4, "courseId": 2, "nickname": "Section 1", "dateStart": "2020-10-15" });
	const section5 = await Section.create({ "id": 5, "courseId": 2, "nickname": "Section 2", "dateStart": "2020-10-29" });
	const section6 = await Section.create({ "id": 6, "courseId": 2, "nickname": "Section 3", "dateStart": "2020-11-12" });
  
  const user1 = await User.create({ email: 'foo@email.com', name: 'Foo', id: 1 });
  const user2 = await User.create({ email: 'bar@email.com', name: 'Bar', id: 2 });

  await user1.addSection("1")
  await section1.addUser("1");
  await user1.addSection("5");
  await section5.addUser("1");
  await user2.addSection("1")
  await section1.addUser("2");
  await user2.addSection("4");
  await section4.addUser("2");

  console.log(`seeded user ${user1.name} successfully`);
  console.log(`seeded user ${user2.name} successfully`);
  console.log(`seeded ${courses.length} courses successfully`);
  console.log(`seeded ${section1.nickname} successfully`);
  console.log(`seeded ${section2.nickname} successfully`);
  console.log(`seeded ${section3.nickname} successfully`);
  console.log(`seeded ${section4.nickname} successfully`);
  console.log(`seeded ${section5.nickname} successfully`);
  console.log(`seeded ${section6.nickname} successfully`);
  console.log(`seeded ${sessions.length} sessions successfully`);
  console.log(`finished seeded successfully`);
});

seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection');
    db.close()
    console.log('db connection closed');
  });

console.log('seeding...');
