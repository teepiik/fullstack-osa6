import React from 'react'
import PropTypes from 'prop-types'

class Notification extends React.Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {

    const { notification } = this.context.store.getState()

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

Notification.contextTypes = {
  store: PropTypes.object
}

export default Notification
