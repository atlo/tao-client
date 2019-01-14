import React, { Component } from 'react'
import Search from './search/Search'

class App extends Component {
  render () {
    return (
      <div>
        <header>
          <h1>Tao Kereső</h1>
        </header>
        <div className='container'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In quos consequuntur at consequatur vitae natus dolores laboriosam sint fugiat fugit atque, voluptates a ipsum deleniti cumque, id, maxime et illum quas aliquam. Tenetur dolorem sit fuga, ullam saepe perferendis consectetur ex repudiandae qui praesentium quos quasi accusamus commodi porro temporibus!</p>
        </div>
        <Search />
      </div>
    )
  }
}

export default App
