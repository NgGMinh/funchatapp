import { Button, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';


const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #190B82;
  background-color: #190B82;
  font-weight: bold;

  .username{
      color: white;
      margin-left: 5px;
  }
`;

export default function UserInfo() {
  const { user: { displayName,photoURL} } = React.useContext(AuthContext);

  return (
    <WrapperStyled>
        <div>
            <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
            <Typography.Text className='username'>{displayName}</Typography.Text>
        </div>
        <Button ghost onClick={() => auth.signOut() } style={{fontWeight: 'bold'}}>Đăng xuất</Button>
    </WrapperStyled>
  )
}
