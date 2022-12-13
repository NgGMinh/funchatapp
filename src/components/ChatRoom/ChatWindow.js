import { CloseCircleOutlined, PictureOutlined, SmileOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Input} from 'antd';
import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/service';
import useFirestore from '../../hooks/useFirestore';
import { app } from '../../firebase/config';
import TheirMessage from './TheirMessage';
import MyMessage from './MyMessage';
import '../../index.css'; 
import ScrollableFeed from 'react-scrollable-feed';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 46px;
    padding: 0 16px;
    aligh-items: center;
    
    .header {
      &__info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          
      }

      &__title {
          margin: 8px 0px 0px 0px;
          font-size: 1.2rem;
          color: #0d7bf0;
          font-weight: bold;
          
      }
      
      &__description {
          margin: 0;
          font-size: 0.9rem; 
          color: #646464;
          font-weight: bold;
      }

    }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 92vh;
`

const ContentStyled = styled.div`
  height: calc(100% - 46px);
  display: flex;
  flex-direction: column;
  padding: 11px 0px 1px 0px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 14px 2px 0;
  border: 1px solid #ddd;
  border-radius: 2px; 

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;  
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`; 

export default function ChatWindow() {
  const { selectedRoom, 
          setIsInviteMemberVisible, 
          isLightBoxVisible, 
          setIsLightBoxVisible, 
          setLightBoxImage,
          lightBoxImage, 
        } = useContext(AppContext);

  const {
    user: { uid, photoURL, displayName},
  } = useContext(AuthContext);
  
  const [inputValue, setInputValue] = useState('');
  const [inputImage, setInputImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);


  const [form] = Form.useForm();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInputValue(inputValue + emoji);
  };

  const onImageChange = () => {
      app.storage().ref().child(imageName).delete();
      setImageName('');
      setInputImage('');
  }

  const onFileChange = async (e) => {
    if(imageName) app.storage().ref().child(imageName).delete();
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    setImageName(file.name);
    await fileRef.put(file);
    setInputImage(await fileRef.getDownloadURL());
  }

  const handleOnSubmit = () => {
    addDocument('messages',{
      text: inputValue,
      image: inputImage,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName
    });
    setInputImage('');
    setInputValue('');
    setImageName('');
    form.resetFields(['message']);
  };

  const condition = React.useMemo(() => ({
    fieldName: 'roomId',
    operator: '==',
    compareValue: selectedRoom.id,
  }), [selectedRoom.id]);

  const messages = useFirestore('messages',condition);

  return (  
  <WrapperStyled>
    {selectedRoom.id ? (
      <>
        <HeaderStyled>
            <div className='header__info'>
              <p className='header__title'>{selectedRoom.name}</p>
              <p className='header__description'>{selectedRoom.description}</p>
            </div>
            <div></div>
            <div style={{display: 'flex', alignItems: 'center', alignContent:'flex-end'}}>
              <ButtonGroupStyled>
                  <Button icon={<UserAddOutlined />} onClick={() => setIsInviteMemberVisible(true)}>
                      Mời
                  </Button>
                  {/* <Avatar.Group size="small" maxCount={2} style={{alignItems: 'center'}}>
                    {
                      members.map(member => 
                        <Tooltip title={member.displayName} key={member.id}>
                          <Avatar src={member.photoURL}>
                            {member.photoURL ? '' : member.displayName?.charAt(0)?.toUpperCase()}
                          </Avatar>
                        </Tooltip>)
                    }                 
                  </Avatar.Group> */}
              </ButtonGroupStyled>
            </div>
        </HeaderStyled>
        
        <ContentStyled>
            <MessageListStyled>
              <ScrollableFeed>
                {isLightBoxVisible && (
                  <Lightbox
                    mainSrc={lightBoxImage}
                    onCloseRequest={() => setIsLightBoxVisible(!isLightBoxVisible)}
                  />
                  )
                }

                {showEmojis && (
                  <div style={{position: 'absolute', right: '13px', bottom: '50px', zIndex: '2'}}>
                    <Picker onSelect={addEmoji} />
                  </div>
                )}

                {
                  <div style={{textAlign: 'center', marginTop: '10px'}}>
                    <h2 style={{marginBottom: '5px'}}>Chào mừng đến với {selectedRoom.name}</h2>
                    <h3 style={{marginBottom: '50px'}}>--- Đây là sự khởi đầu của kênh Chat ---</h3>
                  </div>
                }

                {
                  messages.map((mes) => { 
                   if(mes.uid === uid) 
                      return(       
                        <MyMessage 
                          key={mes.id}
                          text={mes.text}
                          image={mes.image}
                          photoURL={mes.photoURL} 
                          displayName={mes.displayName} 
                          createdAt={mes.createdAt}
                        />
                        
                      )
                    else 
                      return(
                        <TheirMessage 
                          key={mes.id}
                          text={mes.text}
                          image={mes.image} 
                          photoURL={mes.photoURL} 
                          displayName={mes.displayName} 
                          createdAt={mes.createdAt}
                        />
                        
                      )
                   }
                  )
                }
              </ScrollableFeed>
            </MessageListStyled>
            <div 
              style={{ 
                position: 'relative',
                width: '100%',
                background: '#F6F6F6',
                display: inputImage ? "block" : "none" 
              }}
            >
              <img 
                src={inputImage} 
                alt='' 
                style={{height: 'auto', width: '20%', padding: '10px', cursor: 'pointer'}} 
                onClick={() =>{ 
                  setIsLightBoxVisible(!isLightBoxVisible);
                  setLightBoxImage(inputImage);
                }}
              />

              <Button 
                shape='circle' 
                type='text' 
                id='display-button'
                style={{
                  padding: '0px', 
                  position: 'absolute', 
                  right: '0px', 
                  top: '0px', 
                  background: '#F6F6F6', 
                  cursor:'pointer'
                }}  
                onClick={onImageChange}  
              >
                <CloseCircleOutlined />
              </Button>
            </div>
            <FormStyled form={form}>
                <Form.Item name="message">
                    <Input
                      value={inputValue} 
                      onChange={handleInputChange}
                      onPressEnter={handleOnSubmit}
                      onClick={() => setShowEmojis(false)}
                      placeholder='Nhập tin nhắn...' 
                      bordered={false} 
                      autoComplete="off"
                    />
                    <Input 
                      type="file"
                      multiple={false}
                      id='upload-button'
                      onChange={onFileChange}
                      onClick={() => setShowEmojis(false)}
                      style={{display: 'none'}}
                    />
                    
                </Form.Item>
              
                <Button className="button" onClick={() => setShowEmojis(!showEmojis)}>
                  <SmileOutlined style={{cursor: 'pointer', fontSize: '1rem'}}/>
                </Button>
                 <label htmlFor='upload-button'>
                  <span className='image-button'>
                      <PictureOutlined className='picture-icon' style={{marginRight:'15px', cursor: 'pointer', fontSize: '1rem'}}/>
                  </span>
                </label>
                <Button type='primary' onClick={handleOnSubmit} >Gửi</Button>
            </FormStyled>
        </ContentStyled>
        
      </>
    ) : (
      <div style={{position: 'absolute', top: '8%'}}>
        <div className='welcome'>Chào Mừng Đến Với Chat Application</div>
        <br />
        <center>
          <img src={require('../../images/image-chat-window.png')} className='image-responsive' alt='' />
        </center>

      </div>
    )}
  </WrapperStyled>
  );
}
