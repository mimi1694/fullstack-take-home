import React from 'react';
import { Session } from './session';
import { Section } from './section';
import { fetchSections } from '../api/section';

export class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSignedUp: false,
      userSectionId: '',
      allUserSections: [],
      sessions: this.props.course.sessions.sort((a,b) => a.sessionNumber - b.sessionNumber),
      sections: this.props.course.sections.sort((a, b) => new Date(a.dateStart) - new Date(b.dateStart))
    };

    this.handleEnrollmentChange = this.handleEnrollmentChange.bind(this);
  }

  componentDidMount() {
    fetchSections().then(res => {
      const userSection = res.data.find(section => section.course.id === this.props.course.id && section.users.find(user => user.id === this.props.userId));
      const allUserSections = res.data.filter(section => !!section.users.find(user => user.id === this.props.userId));
      this.setState({ userSignedUp: !!userSection, userSectionId: userSection?.id, allUserSections});
    })
  }

  handleEnrollmentChange(evt) {
    const userSignedUp = !!evt.users.find(user => user.id === this.props.userId);
    const userSectionId = userSignedUp ? evt.id : '';
    this.setState({ userSignedUp, userSectionId })
  }

  render () {
    return (
      <div className="course">
        <h2 className="course-title">
          {this.props.course.name}
          {this.state.userSignedUp ? <p className="enrolled-label">Enrolled</p> : null}
        </h2>
        <h4>Course Sessions</h4>
        {this.state.sessions.map((session, i) =>
          <Session key={i}
                   userSignedUp={this.state.userSignedUp}
                   userId={this.props.userId}
                   session={session}
                   userSection={this.state.userSectionId} />)}
        <h4>Past and Current Sections</h4>
        {this.state.sections.map((section, i) =>
          <Section key={i}
                   userSignedUp={this.state.userSignedUp}
                   userIsEnrolled={this.state.userSectionId === section.id}
                   userId={this.props.userId}
                   section={section}
                   allUserSections={this.state.allUserSections}
                   onEnrollmentChange={this.handleEnrollmentChange} />)}
      </div>
    )
  }
} 