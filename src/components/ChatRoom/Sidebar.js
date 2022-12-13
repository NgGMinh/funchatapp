import { Col, Row } from 'antd';
import React from 'react';
import RoomList from './RoomList';
// import UserInfo from './UserInfo';
import styled from 'styled-components';
import RoomMember from './RoomMember';
import PhotoGallary from './PhotoGallary';

const SidebarStyled = styled.div`
    background: white;
    color: #0040ff;
    height: 92vh;
    border: 1px solid #ddd;
    overflow-y: auto;
`;

export default function Sidebar() {
  return (
  <SidebarStyled>
    <Row>
        <Col span={24}>
            <RoomList />
        </Col>
        <Col span={24}>
            <RoomMember />
        </Col>
        <Col span={24}>
            <PhotoGallary />
        </Col>
    </Row>
  </SidebarStyled>
  )
}
