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
  
  const user1 = await User.create({ email: 'Jack@email.com', name: 'Jack' });
  const user2 = await User.create({ email: 'John@email.com', name: 'John' });
  const user3 = await User.create({ email: 'Joe@email.com', name: 'Joe' });
  const user4 = await User.create({ email: 'Jill@email.com', name: 'Jill' });
  const user5 = await User.create({ email: 'Jim@email.com', name: 'Jim' });
  const user6 = await User.create({ email: 'Jane@email.com', name: 'Jane' });
  const user7 = await User.create({ email: 'Jeanne@email.com', name: 'Jeanne' });
  const user8 = await User.create({ email: 'Jess@email.com', name: 'Jess' });
  const user9 = await User.create({ email: 'Jen@email.com', name: 'Jen' });
  const user10 = await User.create({ email: 'Julie@email.com', name: 'Julie' });

  await user1.setSections([section1]);
  await user2.setSections([section1]);
  await user3.setSections([section1]);
  await user4.setSections([section1]);
  await user5.setSections([section1]);
  await user6.setSections([section1]);
  await user7.setSections([section1]);
  await user8.setSections([section1]);
  await user9.setSections([section1]);
  await user10.setSections([section1, section4]);

  console.log(`seeded users successfully`);
  console.log(`seeded ${courses.length} courses successfully`);
  console.log(`seeded ${section1.nickname} successfully`);
  console.log(`seeded ${section2.nickname} successfully`);
  console.log(`seeded ${section3.nickname} successfully`);
  console.log(`seeded ${section4.nickname} successfully`);
  console.log(`seeded ${section5.nickname} successfull1`);
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
