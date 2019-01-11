import React, { Component } from 'react'
import ResultList from './ResultList'
import Total from './Total'
import Pagination from './Pagination'

class Search extends Component {
  constructor (props) {
    super(props)

    this.state = {
      total: '',
      files: [],
      error: null,
      searchValue: '',
      from: 0,
      isLoading: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.firstPage = this.firstPage.bind(this)
    this.lastPage = this.lastPage.bind(this)
  }

  handleChange (event) {
    this.setState({ searchValue: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()

    this.search()
  }

  search () {
    return Promise
      .resolve()
      .then(() => this.setState({ isLoading: true }))
      .then(() => fetch(`http://localhost:3000/search?query=${this.state.searchValue}&from=${this.state.from}`))
      .then(response => response.json())
      .then(data => {
        this.setState({
          files: data.files,
          total: data.total,
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

  firstPage () {
    this.setState({ from: 0 }, function () {
      this.search()
    })
  }

  lastPage () {
    const { total } = this.state
    this.setState({ from: total - 10 }, function () {
      this.search()
    })
  }

  nextPage () {
    const { total, from } = this.state

    if (total > from + 10) {
      this.setState({ from: from + 10 }, function () {
        this.search()
      })
    }
  }

  previousPage () {
    const { from } = this.state

    if (from - 10 >= 0) {
      this.setState({ from: from - 10 }, function () {
        this.search()
      })
    }
  }

  render () {
    const { isLoading, files, total, from, error } = this.state

    return (
      <div className='search'>
        {isLoading
          ? <div className='loading'>
            <div className='background' />
            <img src='./images/loader.gif' alt='Folyamatban...' />
          </div> : ''}
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type='text' name='search' onChange={this.handleChange} />
            <button type='submit' />
          </div>
          <Total total={total} />
        </form>

        <ResultList files={files} />
        <Pagination total={total} from={from} firstPage={this.firstPage} previousPage={this.previousPage}
          nextPage={this.nextPage} lastPage={this.lastPage} />
      </div>
    )
  }
}

export default Search
