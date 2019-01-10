import React, {Component} from 'react'
import ResultList from './ResultList'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      error: null,
      searchValue: '',
      isLoading: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value});
  }

  handleSubmit (event) {
    console.log('submit')
    event.preventDefault()
    console.log('fetch')
    return fetch(`http://localhost:3000/search/${this.state.searchValue}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)

        this.setState({
          results: data.results,
          isLoading: false
        })
      })
      .catch(error => {
        this.setState({
          error: error.message,
          isLoading: false
        })
      })
  }

  render() {
    const { isLoading, results, error } = this.state

    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="search" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {isLoading ? 'Loading...' : ''}

        <ResultList results={results} />
      </div>
    )
  }
}

export default Search
