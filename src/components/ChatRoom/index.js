import React from 'react'
import { Row, Col } from 'antd';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import UserInfo from './UserInfo';
// import Gallary from './Gallary';


export default function ChatRoom() {
  return <div>
    <Row>
      <Col span={24}>
            <UserInfo />
      </Col>
    </Row>
    <Row>
      <Col sm={7} md={6}><Sidebar /></Col>
      <Col sm={17} md={18}><ChatWindow /></Col>
    </Row>
  
  </div>
  
}
