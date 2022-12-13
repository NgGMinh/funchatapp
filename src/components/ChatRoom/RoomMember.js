import React from 'react';
import { Collapse, Typography, Avatar, Tooltip } from 'antd';
import styled from 'styled-components';
// import { PlusSquareOutlined } from '@ant-design/icons';
// import useFirestore from '../../hooks/useFirestore';
// import { AuthContext } from '../../Context/AuthProvider';
import { AppContext } from '../../Context/AppProvider';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  margin-top: 10px;
  &&& {
    .ant-collapse-header, 
    p {
        color: black;
        background-color: #EEECFD;
        font-size: 1.1rem;
        font-weight: bold;
    }

    .ant-collapse-arrow{
      font-size: 0.9rem;
    }

    .ant-collapse-content-box {
        padding: 0px 0px 0px 20px;
    }
  }  
`;

const LinkStyled = styled(Typography.Link)`
  display: flex;
  margin: 10px 0px;
  
  .author{
    font-size: 0.9rem;
    font-weight: bold;
  }
`

export default function RoomMember() {
  const { members, selectedRoom } = React.useContext(AppContext);

  return (
    <Collapse defaultActiveKey={['2']} ghost expandIconPosition='right' style={{display: selectedRoom.id ? "block" : "none" }}>
      <PanelStyled header="Members" key="2">
        {members.map((member) => (
          <LinkStyled key={member.id}>
            <Tooltip title={member.displayName} className="display-show">
              <Avatar src={member.photoURL} size={64}>
                  {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}
              </Avatar>
            </Tooltip>

            <Avatar src={member.photoURL} size='large' className='display-none'>
              {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}
            </Avatar>
            <div style={{marginTop: '8px', marginLeft: '7px'}} className="display-none">
              <Typography.Text className='author'>
                {member.displayName}
              </Typography.Text>
            </div>
          </LinkStyled>
        ))}
      </PanelStyled>
        
    </Collapse>
  )
}
