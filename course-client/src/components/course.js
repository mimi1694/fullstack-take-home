import React from 'react';
const { fetchCourses } = require("../api/course");

export class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {courses: []};
  }

  componentDidMount() {
    fetchCourses().then(res => {
      this.setState({courses: res.data});
    });
  }

  render() {
    return <div>
      <h1>Welcome to the Course Selector!</h1>
      {this.state.courses.map((course, i) => {     
        return (<h3>{course.name}</h3>) 
     })}
    </div>;
  }
}

export default Course;