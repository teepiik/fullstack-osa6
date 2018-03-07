import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationAction } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.anecdoteCreation(e.target.anecdote.value)
    const notification = `you added new anecdote: ${e.target.anecdote.value}`
    e.target.anecdote.value = ''

    this.props.notificationAction(notification)

    setTimeout(() => {
      this.props.notificationAction('')
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}


export default connect(
  null,
  { anecdoteCreation, notificationAction }
)(AnecdoteForm)
