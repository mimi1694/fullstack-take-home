import React from 'react';
import { fetchSectionById, fetchSections } from '../api/section';
import { updateUser } from '../api/user';

export class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sectionUsers: [], allUserSections: this.props.allUserSections }

    this.enroll = this.enroll.bind(this);
    this.unenroll = this.unenroll.bind(this);
    this.updateUserEnrollment = this.updateUserEnrollment.bind(this);
  }

  componentDidMount() {
    fetchSectionById(this.props.section.id)
      .then(section => this.setState({ sectionUsers: section.data.users }))
      .catch(console.error);
  }

  enroll() {
    let userSections = Object.assign([], this.state.allUserSections);
    userSections.push(this.props.section);
    userSections = userSections.map(section => section.id);
    this.updateUserEnrollment(this.props.userId, userSections);
  }

  unenroll() {
    let userSections = Object.assign([], this.state.allUserSections);
    userSections = userSections.map(section => section.id).filter(id => id !== this.props.section.id);
    this.updateUserEnrollment(this.props.userId, userSections);
  }

  updateUserEnrollment(id, enrolledSections) {
    updateUser(id, enrolledSections)
      .then(() => fetchSections())
      .then(sections => {
        const currSection = sections.data.find(sec => sec.id === this.props.section.id);
        this.setState({ sectionUsers: currSection?.users });
        this.props.onEnrollmentChange({id: this.props.section.id, users: this.state.sectionUsers});
      })
      .catch(err => {
        console.error("UHOH! We couldn't add you to that course.", err);
      });
  }

  render () {
    return (
      <div className="course-section">
        <h5>{this.props.section.nickname}</h5>
        {
          this.props.userIsEnrolled
            ? <button onClick={this.unenroll}>Un-enroll</button>
            : <button disabled={(this.state.sectionUsers.length > 9) || this.props.userSignedUp} onClick={this.enroll}>Enroll</button>
        }
        <p>Starts: {new Date(this.props.section.dateStart).toDateString()}</p>
        <div>
          <p>Enrolled students: </p>
          <ul>
            {this.state.sectionUsers.map((user, i) => (
              <li key={i}>{user.name}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

