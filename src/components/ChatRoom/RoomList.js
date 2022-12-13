import React from 'react';
import { Button, Collapse, Typography} from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
// import useFirestore from '../../hooks/useFirestore';
// import { AuthContext } from '../../Context/AuthProvider';
import { AppContext } from '../../Context/AppProvider';

const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
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
        padding: 0 15px;
    }
    .add-room{
      color: #096dd9;
      padding: 0;
      font-weight: bold;
    }
  }  
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin: 5px 20px;
`

export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } = React.useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  }

  return (
    <Collapse defaultActiveKey={['1']} ghost expandIconPosition='right'>
      <PanelStyled header="My Chat" key="1">
        
        {rooms.map((room) => (
          <LinkStyled 
            style={{color: '#140965', fontWeight: 'bold'}}
            key={room.id} 
            onClick={() => setSelectedRoomId(room.id)}>
            {room.name}
          </LinkStyled>
        ))}

        <Button 
          type='text' 
          className='add-room' 
          icon={<PlusSquareOutlined />} 
          onClick={handleAddRoom}       
        >
          Thêm phòng
        </Button>
      </PanelStyled>
        
    </Collapse>
  )
}
