import React from 'react';
import { Collapse, Image, Row, Col} from 'antd';
import styled from 'styled-components';
// import { PlusSquareOutlined } from '@ant-design/icons';
// import useFirestore from '../../hooks/useFirestore';
// import { AuthContext } from '../../Context/AuthProvider';
import { AppContext } from '../../Context/AppProvider';
import 'react-image-lightbox/style.css';
// import Lightbox from 'react-image-lightbox';
import useFirestore from '../../hooks/useFirestore';

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
        padding: 0 5px;
        display: flex;
    }
  }  
`;

export default function PhotoGallary() {
  const { selectedRoom } = React.useContext(AppContext);
  const condition = React.useMemo(() => ({
    fieldName: 'roomId',
    operator: '==',
    compareValue: selectedRoom.id,
  }), [selectedRoom.id]);

  const messages = useFirestore('messages',condition);

  return (
    <Collapse defaultActiveKey={['3']} ghost expandIconPosition='right' style={{display: selectedRoom.id ? "block" : "none" }}>
      <PanelStyled header="Photo Gallary" key="3">
        <Row style={{marginTop: '5px'}}>
          <Image.PreviewGroup preview="true">
            {messages.map((mes) => (
                <Col xs={12} lg={8} style={{display: mes.image !== '' ? "flex" : "none"}} key={mes.id}>
                  <Image src={mes.image} width='100%' style={{padding: '2px'}}/>
                </Col>
                )
              )
            }
          </Image.PreviewGroup>
        </Row> 
      </PanelStyled>
        
    </Collapse>
  )
}
