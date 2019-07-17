import React from 'react'
import ReactDOM from 'react-dom'
import MyComponent from '../src/index.js'

class ParentWrapper extends React.Component {
  state = { isLoading: true }

  render() {
    const { isLoading } = this.state

    return (
      <React.Fragment>
        {isLoading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              height: '100vh',
              alignItems: 'center'
            }}
          >
            <MyComponent
              onStart={() =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    reject('result')
                  }, 1500)
                })
              }
              onCancel={error => {
                this.setState({ isLoading: false })
                console.log('Canceled!', error)
              }}
              onDone={success => {
                this.setState({ isLoading: false })
                console.log('Done!', success)
              }}
            />
          </div>
        )}
      </React.Fragment>
    )
  }
}

ReactDOM.render(<ParentWrapper />, document.getElementById('root'))
