import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
  case 'CREATE':
    return [...state, action.data]

  case 'VOTE': {
    const old = state.filter(a => a.id !== action.data.id)
    const voted = state.find(a => a.id === action.data.id)

    return [...old, { ...voted, votes: voted.votes + 1 }]
  }

  case 'INIT_ANECDOTES':
    return action.data

  default:
    return state
  }
}

export const anecdoteCreation = (data) => {
  return async (dispatch) => {
    const newAnec = await anecdoteService.createNew(data)
    dispatch({
      type: 'CREATE',
      data: newAnec
    })
  }
}

export const voteAction = (anec) => {
  return async (dispatch) => {
    const votedAnec = await anecdoteService.updateVote(anec)
    dispatch({
      type: 'VOTE',
      data: votedAnec })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer