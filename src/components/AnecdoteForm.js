import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationAction } from './../reducers/notificationReducer'
import PropTypes from 'prop-types'

class AnecdoteForm extends React.Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.context.store.dispatch(anecdoteCreation(e.target.anecdote.value))
    const notification = `you added new anecdote: ${e.target.anecdote.value}`
    e.target.anecdote.value = ''

    this.context.store.dispatch(notificationAction(notification))

    setTimeout(() => {
      this.context.store.dispatch(notificationAction(''))
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

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteForm
