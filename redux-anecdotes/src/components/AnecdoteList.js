import React from 'react'
import { voteAction } from './../reducers/anecdoteReducer'
import { notificationAction } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'


const handleVote = async (event, props, anecdote) => {
  //const newAnecdote = await anecdoteService.createNew(anec)

  const votedAnec = await anecdoteService.updateVote(anecdote)
  props.voteAction(votedAnec.id)

  const notification = `you voted: ${anecdote.content}`
  props.notificationAction(notification)

  setTimeout(() => {
    props.notificationAction('')
  }, 5000)
}



const AnecdoteList = (props) => (
  <div>
    <h2>Anecdotes</h2>
    {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={(e) => handleVote(e, props, anecdote)}>
            vote
          </button>
        </div>
      </div>
    )}
  </div>
)


const anecdotesToShow = (anecdotes, filter) => {
  if (filter === '') {
    return anecdotes
  }
  return anecdotes.filter(anec => anec.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    anecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}


export default connect(
  mapStateToProps,
  { notificationAction, voteAction }
)(AnecdoteList)
