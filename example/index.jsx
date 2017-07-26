import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import BasicForm from './basic-form'

import Form from '../src/components/form'
import { createForm } from '../src/index'

const forms = {
  BasicForm,
}

class App extends Component {
  state = {
    activeFormComponent: forms.BasicForm,
  }

  render() {
    return (
      <div>
        {React.createElement(this.state.activeFormComponent)}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
