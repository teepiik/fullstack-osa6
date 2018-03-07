import React from 'react'
import { connect } from 'react-redux'
import { notificationAction } from '../reducers/notificationReducer'

class Notification extends React.Component {

  render() {

    const notification = this.props.notification

    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    if(notification === '') {
      return (
        <div></div>
      )
    }

    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}


export default connect(
  (state) => ({ notification: state.notification }),
  { notificationAction }
)(Notification)
