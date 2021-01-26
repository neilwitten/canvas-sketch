import React, { Component, PropTypes } from 'react';

import '~/scss/tailwind.css';
import '~/theme/base.scss';

import Canvas from '~/component/Canvas';
import Modal from '~/component/Modal';

import NavBar from '~/component/NavBar';

//render(<NavBar><Canvas /></NavBar>, document.querySelector('.app'));

class App extends Component {
  constructor(props) {
    super(props);

    console.log(process.env);
    console.log(process.env.AIRTABLE_API_KEY);
    console.log(process.env.ANOTHER_KEY);
    console.log('env ' + process.env.REACT_APP_KEY);

    // this.state = { isOpen: false };
  }

  // toggleModal = () => {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   });
  // };

  render() {
    return (
      <div className="app">
        {/* <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          Here's some content for the modal
        </Modal> */}
        <Canvas />
      </div>
    );
  }
}

export default App;
