import React from 'react'
import '../../index.css';
import { Row, Col, Button, Typography } from 'antd'
import firebase, { auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/service';

const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const handleLogin = async (provider) => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

    if(additionalUserInfo?.isNewUser){
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName?.toLowerCase()),
      });
    }
  };
  return (
    <div id='login-page'>
        <Row id={'login-card'} justify='center'>
            <Col span={16}>
                <Title style={{textAlign: 'center', marginBottom: '25px'}} level={3}>CHAT APPLICATION</Title>
                <Button 
                  style={{backgroundColor: '#4285f4', color: 'white'}} 
                  className={'login-button'} 
                  onClick={() => handleLogin(googleProvider)}
                >
                    Đăng nhập bằng Google
                </Button>
                <Button 
                  style={{backgroundColor: '#3b5998', color: 'white'}} 
                  className={'login-button'} 
                  onClick={() => handleLogin(fbProvider)}
                >
                    Đăng nhập bằng Facebook
                </Button>
            </Col>
        </Row>
    </div>
  )
}
