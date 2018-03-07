

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

  /*
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.data.id)
    const voted = store.find(a => a.id === action.data.id)

    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  if (action.type === 'CREATE') {

    return [...store, { content: action.data.content, id: getId(), votes: 0 }]
  }

  return store*/
}

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const voteAction = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export default anecdoteReducer