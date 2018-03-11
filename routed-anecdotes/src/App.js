import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Navbar, ListGroup, ListGroupItem, FormGroup, FormControl, ControlLabel, Button, Grid, Col, Row } from 'react-bootstrap'

const Menu = () => {

  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
        <Link to="/">anecdotes</Link>
        </Navbar.Brand>
        <Navbar.Brand>
        <Link to="/create">create new</Link>    
        </Navbar.Brand>
        <Navbar.Brand>
        <Link to="/about">about</Link>   
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
    </Navbar>
  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>"{anecdote.content}" by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more information check {anecdote.info}</div>
    </div>
  )

}

const Notification = ({ notification }) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'green'
  }
  if (notification === '' || notification === null) {
    return (
      <div></div>
    )
  } else {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }


}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>)}

    </ListGroup>
  </div>
)

const About = () => (
  <Grid>
    <Row>
      <Col sm={6} md={5}>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Col>
      <Col sm={6} md={5}>
        <img src="//upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/250px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg" alt="Linus Torvalds"></img>
      </Col>
    </Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <div>
              <ControlLabel>Content:</ControlLabel>
              <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
            </div>
            <div>
              <ControlLabel>Author:</ControlLabel>
              <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
            </div>
            <div>
              <ControlLabel>Url:</ControlLabel>
              <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
            </div>
            <Button bsStyle="success" type="submit">create</Button>
          </FormGroup>
        </form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `you created: ${anecdote.content}`
    })

    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (

      <div>
        <Router>
          <div className="container">
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification notification={this.state.notification} />
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/anecdotes/:id" render={({ match }) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/create" render={({ history }) => <CreateNew history={history} addNew={this.addNew} />} />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
