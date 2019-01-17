import dotenv from 'dotenv'
import React, { Component } from 'react'
import Pagination from 'react-js-pagination'
import ResultList from './ResultList'
import Form from './Form'
import Loading from './Loading'
import {propOr} from 'ramda'
dotenv.config()

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      total: '',
      files: [],
      error: null,
      value: '',
      page: 1,
      isLoading: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  handlePageChange (page) {
    this.setState({page: page}, function () {
      this.search()
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    this.setState({page: 1}, function () {
      this.search()
    })
  }

  search () {
    return Promise
      .resolve()
      .then(() => this.setState({ 
        isLoading: true,
        error: null
      }))
      .then(() => fetch(`${process.env.REACT_APP_SERVER_URL}/search?query=${this.state.value}&page=${this.state.page}`))
      .then(response => response.json())
      .then(data => {
        this.setState({
          files: propOr([], 'files', data),
          total: propOr([], 'total', data),
          isLoading: false
        })
      })
      .catch(error => {
        console.log(error)

        this.setState({
          error: true,
          isLoading: false
        })
      })
  }
  render () {
    const { isLoading, files, total, page, error } = this.state

    return (
      <div>
        <header>
          <h1>Tao Kereső</h1>
        </header>
        <div className='container'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In quos consequuntur at consequatur vitae natus dolores laboriosam sint fugiat fugit atque, voluptates a ipsum deleniti cumque, id, maxime et illum quas aliquam. Tenetur dolorem sit fuga, ullam saepe perferendis consectetur ex repudiandae qui praesentium quos quasi accusamus commodi porro temporibus!</p>
          <div className='search'>
            <div className="container">
              <Form 
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                error={error}
                total={total}
              />
              <ResultList files={files} />
              {total > 10 ? (
                <Pagination 
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={total}
                  pageRangeDisplayed={10}
                  onChange={this.handlePageChange}
                />
                ) : ''
              }
            </div>
          </div>
        </div>
        <Loading isLoading={isLoading} />
      </div>
    )
  }
}

export default App
