import React from 'react';

export function Session (props) {
  return (
    <div>
      <h5>Session {props.session.sessionNumber} - {props.session.name}</h5>
      <p>About: {props.session.description}</p>
      {props.userSignedUp ? (<p>Content: {props.session.content}</p>) : null}
    </div>
  );
}
