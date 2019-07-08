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
              onLoad={() =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    reject('result')
                  }, 2000)
                })
              }
              onCancel={() => {
                this.setState({ isLoading: false })
                console.log('Canceled!')
              }}
              onDone={() => {
                this.setState({ isLoading: false })
                console.log('Done!')
              }}
            />
          </div>
        )}
      </React.Fragment>
    )
  }
}

ReactDOM.render(<ParentWrapper />, document.getElementById('root'))
