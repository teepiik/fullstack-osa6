import React from 'react'
import { voteAction } from './../reducers/anecdoteReducer'
import { notificationAction } from './../reducers/notificationReducer'
import PropTypes from 'prop-types'

// { type: 'VOTE', id: anecdote.id }
/*
<button onClick={() =>
                this.context.store.dispatch(voteAction(anecdote.id))
              }>

*/


class AnecdoteList extends React.Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleVote = (event, id, content) => {
    this.context.store.dispatch(voteAction(id))

    const notification = `you voted: ${content}`
    this.context.store.dispatch(notificationAction(notification))

    setTimeout(() => {
      this.context.store.dispatch(notificationAction(''))
    }, 5000)

  }

  render() {
    //const anecdotes = this.props.store.getState()

    const anecdotesToShow = () => {
      const { anecdotes, filter } = this.context.store.getState()
      if (filter === '') {
        return anecdotes
      }

      console.log(anecdotes)
      return anecdotes.filter(anec => anec.content.includes(filter))
    }

    const anecdotes = anecdotesToShow()


    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={(e) => this.handleVote(e, anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList
