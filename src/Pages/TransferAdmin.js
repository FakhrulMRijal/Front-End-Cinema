import React, { Component } from 'react'
import Axios from 'axios'
import { API_URL } from '../support/API_URL'
import { Table } from 'reactstrap'
import { addToCart }  from '../Redux/Action'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'

class TransAdmin extends Component {
    state = {
        data : [],
        detail : []
    }

    componentDidMount(){
        const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  }

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <br />
          <Button color="success" onClick={toggleNested}>Show Nested Modal</Button>
          <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader>Nested Modal title</ModalHeader>
            <ModalBody>Stuff and things</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggleNested}>Done</Button>{' '}
              <Button color="secondary" onClick={toggleAll}>All Done</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


    render(){
        return ( 
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Total Price</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    {this.renderHistory()}
                </Table>
            </div>
        )
    }
    

    
}

export default connect(mapStatetoProps, { addToCart })(TransAdmin);