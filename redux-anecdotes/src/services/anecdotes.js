import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const newAnec = {
    content: content,
    votes: 0
  }
  const response = await axios.post(url, newAnec)
  return response.data
}

const updateVote = async (anecdote) => {
  const response = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote)
  return response.data
}

export default { getAll, createNew, updateVote }