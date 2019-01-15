import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import ResultList from './ResultList'
import Total from './Total'
import Pagination from './Pagination'
import Loading from './Loading'

class Search extends Component {
  constructor (props) {
    super(props)

    this.state = {
      total: '',
      files: [],
      error: null,
      searchValue: '',
      from: 0,
      isLoading: false,
      suggestions: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.firstPage = this.firstPage.bind(this)
    this.lastPage = this.lastPage.bind(this)
  }

  handleChange (event) {
    const {value} = event.target
    
    if (value.length > 2) {
      this.suggest()
    }

    this.setState({ searchValue: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()

    this.search()
  }

  search () {
    return Promise
      .resolve()
      .then(() => this.setState({
        isLoading: true,
        from: 0
      }))
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

  suggest () {
    return Promise
      .resolve()
      .then(() => fetch(`http://localhost:3000/suggest?query=${this.state.searchValue}`))
      .then(response => response.json())
      .then(data => {
        if (data.suggestions.length > 0)  {
          const suggestions = data.suggestions.map(s => ({id: s, label: s}))
          this.setState({suggestions})
        }
      })
      .catch(error => {
        this.setState({
          error: error.message,
          isLoading: false
        })
      })
  }

  firstPage () {
    const { total, from } = this.state

    if (from > 1 && total > 10) {
      this.setState({ from: 0 }, function () {
        this.search()
      })
    }
  }

  lastPage () {
    const { total } = this.state

    if (total > 10) {
      this.setState({ from: total - 10 }, function () {
        this.search()
      })
    }
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
    const { isLoading, files, total, from, suggestions, error } = this.state

    return (
      <div className='search'>
        <Loading isLoading={isLoading} />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="search-input">
              <Autocomplete
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
              />
              <button type='submit' />
            </div>
            <Total total={total} />
          </form>

          <ResultList files={files} />
          <Pagination total={total} from={from} firstPage={this.firstPage} previousPage={this.previousPage}
            nextPage={this.nextPage} lastPage={this.lastPage} />
        </div>
      </div>
    )
  }
}

export default Search
