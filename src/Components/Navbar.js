import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Logout } from '../Redux/Action'
import changepass from '../Pages/ChangePass'
import transferhistory from '../Pages/TransferHistory'


const Example = (props) => {
  let { role, Logout } = props;
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  
  const onBtnLogout = () =>{
    Logout()
    localStorage.removeItem('username')

  }

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  

  if(role === 'user'){
    return(
      <div>
      <Navbar light expand="md" style={{backgroundColor: '#7d7d7d '}}>
        <Link to='/' style={{fontWeight: 500, textDecoration: 'none', color:'#49b675', marginRight:25}}>
          Cinema   
        </Link>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
        <Nav navbar>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret color="success" className="mr-2">
        Personal
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href='/' onClick={onBtnLogout}>Log Out</DropdownItem>
          <DropdownItem href='/changepass'>Change Password</DropdownItem>
        </DropdownMenu>
        </Dropdown>
 
          <Link to='/cart' style={{fontWeight: 400, textDecoration: 'none', color:'#49b675', marginRight:25}}>
              Cart   
          </Link>
          <Link to='/transferhistory' style={{fontWeight: 400, textDecoration: 'none', color:'#49b675'}}>
              Transaction History
          </Link>
        </Nav>
        </Collapse>
      </Navbar>
    </div>
    )
  }else if(role === 'admin'){
    return(
      <div>
      <Navbar  light expand="md">
      <Link to='/' style={{fontWeight: 500, textDecoration: 'none', color:'#49b675', marginRight:25}}>
          Cinema
        </Link>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <Link to='/admin' className=' login-btn' style={{fontWeight: 400, textDecoration: 'none', color:'#49b675',texAlign:'center', marginRight:25}}>
                  Manage Movies
              </Link>
              <Link to='/' onClick={onBtnLogout} style={{fontWeight: 400, textDecoration: 'none', color:'#49b675'}}>
                  Log out
              </Link>
            </Nav>
          </Collapse>
        </Navbar>
    </div>
    )
  }else{
    return (
      <div>
        <Navbar  light expand="md" style={{backgroundColor: '#747474'}}>
          
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <Link to='/login' className=' login-btn' style={{fontWeight: 400, textDecoration: 'none', color:'#49b675',texAlign:'center', marginRight:25}}>
                  Login
              </Link>
              <Link to='/register' className=' login-btn' style={{fontWeight: 400, textDecoration: 'none', color:'#49b675'}}>
                  Register
              </Link>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStatetoProps = ({auth}) => {
  return{
    role: auth.role
  }
}

export default connect(mapStatetoProps,{ Logout })(Example);