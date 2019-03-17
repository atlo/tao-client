import dotenv from 'dotenv'
import React, { Component } from 'react'
import Pagination from 'react-js-pagination'
import ResultList from './ResultList'
import Form from './Form'
import Loading from './Loading'
import SearchWords from './SearchWords'
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
      isLoading: false,
      searchWords: [
        'Felcsút',
        'Puskás Akadémia',
        'FTC',
        'Veszprém',
        'Videoton',
        'OTP',
        'Telekom'
      ]
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.searchWord = this.searchWord.bind(this)
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

  searchWord (event) {
    this.setState({ value: event.target.innerHTML }, function () {
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
      .then(() => {
        const query = this.state.value.toLowerCase() || ''
        return fetch(`${process.env.REACT_APP_SERVER_URL}/search?query=${query}&page=${this.state.page}`)
      })
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
    const { isLoading, files, total, page, error, searchWords } = this.state

    return (
      <div>
        <div className='container'>
          <p>Egy helyen a látványcsapatsportokba (foci, jégkorong, kézilabda, kosárlabda, vízilabda) öntött közpénzek több évnyi dokumentációja. Kereshető adatbázis az EMMI-nek leadott támogatási határozatokból, melyekből kiderül, hogy mely cégek melyik sportegyesületnek mennyi TAO-pénzt adtak 2011 és 2017 között. Keressen cég, település, sportág vagy egyesület alapján!</p>
          <div className='search'>
            <div className="container">
              <Form 
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                error={error}
                total={total}
              />
              <SearchWords searchWords={searchWords} searchWord={this.searchWord} />
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
