import dotenv from 'dotenv'
import React, { Component } from 'react'
import Pagination from 'react-js-pagination'
import ResultList from './ResultList'
import Total from './Total'
import Loading from './Loading'
dotenv.config()

class Search extends Component {
  constructor (props) {
    super(props)

    this.state = {
      total: '',
      files: [],
      error: null,
      searchValue: '',
      page: 1,
      isLoading: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handleChange (event) {
    this.setState({ searchValue: event.target.value })
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
      .then(() => this.setState({ isLoading: true }))
      .then(() => fetch(`${process.env.REACT_APP_SERVER_URL}/search?query=${this.state.searchValue}&page=${this.state.page}`))
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
  
  render () {
    const { isLoading, files, total, page } = this.state

    return (
      <div className='search'>
        <Loading isLoading={isLoading} />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="search-input">
              {/* <Autocomplete
                items={suggestions}
                shouldItemRender={(item, searchValue) => item.label.toLowerCase().indexOf(searchValue.toLowerCase()) > -1}
                getItemValue={item => item.label}
                renderItem={(item, highlighted) =>
                  <div
                    key={item.id}
                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                  >
                    {item.label}
                  </div>
                }
                value={this.state.searchValue}
                onChange={event => this.handleChange(event)}
                onSelect={searchValue => this.setState({ searchValue })}
              /> */}
              <input type="text" name="search" onChange={this.handleChange} />
              <button type='submit' />
            </div>
            <Total total={total} />
          </form>

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
    )
  }
}

export default Search
