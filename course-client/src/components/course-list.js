import React from 'react';
import { Course } from './course';
const { fetchCourses } = require("../api/course");

export class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {courses: [] };
  }

  componentDidMount() {
    fetchCourses().then(res => {
      this.setState({courses: res.data});
    });
  }

  render() {
    return (
      <div>
        <h1>Welcome to the Course Selector!</h1>
        {this.state.courses.map((course, i) => (<Course key={i} course={course} userId={this.props.userId} />) )}
      </div>
    );
  }
}

export default CourseList;
