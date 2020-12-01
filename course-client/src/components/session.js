import React from 'react';
import { fetchCourseById } from '../api/course';

export class Session extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showContent: false, checkedSessions: false };
  }

  componentDidUpdate(x) {
    if (this.props.userSignedUp && !this.state.checkedSessions) {
      const today = new Date();
      fetchCourseById(this.props.session.courseId)
        .then(course => course.data.sections.find(section => section.id === this.props.userSection))
        .then(section => {
          if (section) {
            const sectionStart = section.dateStart;
            const diffInTime = (today - new Date(sectionStart)) / (1000 * 60 * 60 * 24);
            const showContent = (7 * this.props.session.sessionNumber) <= diffInTime;
            this.setState({ showContent, checkedSessions: true });
          }
        });
    }
  }

  render () {
    return (
      <div>
        <h5>Session {this.props.session.sessionNumber} - {this.props.session.name}</h5>
        <p>About: {this.props.session.description}</p>
        {(this.props.userSignedUp && this.state.showContent) ? (<p className="session-content">Content: {this.props.session.content}</p>) : null}
      </div>
    );
  }
}
