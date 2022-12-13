import React, { useContext } from 'react';
import { Avatar, Tooltip, Typography } from 'antd';
import styled from 'styled-components';
import { formatRelative } from 'date-fns/esm';
import { AppContext } from '../../Context/AppProvider';
import '../../index.css';

const WrapperStyled = styled.div`
  margin: 8px 10px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .their-message{
    display: flex; 
    flex-direction: column; 
    align-items: flex-start;
  }

  .content {
    margin-left: 27px;
    background-color: #4712C9;
    border-radius: 14px;
    border: 1px solid #4712C9;
    color: white;
    padding: 4px 10px;
    max-width: 300px;
  }

  .image-display{
    height: 25%; 
    width: 25%;
    margin: 0px 0px 0px 27px; 
    border: 1px solid #EEECFD; 
    border-radius: 14px; 
    cursor: pointer;
  }

`;

function formatDate(seconds) {
  let formattedDate = '';

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

export default function TheirMessage({ text, image, displayName, createdAt, photoURL }) {
  const { setLightBoxImage, isLightBoxVisible, setIsLightBoxVisible } = useContext(AppContext);
  if(text !== '' && image === '')
  return (
    <WrapperStyled>
      <div>
        <Tooltip title={formatDate(createdAt?.seconds)}>
            <Avatar size='small' src={photoURL}>
                {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Typography.Text className='author'>{displayName} </Typography.Text>
        </Tooltip>
      </div>
      <div className='their-message'>
        <Tooltip title={formatDate(createdAt?.seconds)}>
          <Typography.Text className='content message-responsive'>{text} </Typography.Text>
        </Tooltip>
      </div>
    </WrapperStyled>
  );
  else if(image !== '' && text === '')
    return (
      <WrapperStyled> 
      <div style={{marginBottom: '2px'}}>
        <Tooltip title={formatDate(createdAt?.seconds)} >
          <Avatar size='small' src={photoURL}>
              {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Typography.Text className='author'>{displayName} </Typography.Text>          
        </Tooltip>
      </div>
      <div className='their-message'>
        <Tooltip title={formatDate(createdAt?.seconds)} >
          <img 
            src={image} 
            alt='' 
            className='image-display'
            onClick={() =>{ 
              setIsLightBoxVisible(!isLightBoxVisible);
              setLightBoxImage(image);
            }}
          />        
        </Tooltip>
      </div>
    </WrapperStyled>
    );
  else
    return(
      <WrapperStyled>
      <div style={{marginBottom: '2px'}}>
          <Tooltip title={formatDate(createdAt?.seconds)}  >
            <Avatar size='small' src={photoURL}>
                {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Typography.Text className='author'>{displayName} </Typography.Text>          
          </Tooltip>
        </div> 
        <div className='their-message'>
          <Tooltip title={formatDate(createdAt?.seconds)}  className='their-message'>
            <img 
              src={image} 
              alt=''
              className='image-display' 
              onClick={() =>{ 
                setIsLightBoxVisible(!isLightBoxVisible);
                setLightBoxImage(image);
              }}
              style={{borderBottomLeftRadius: '2px', marginBottom:'0px'}}
            />
          </Tooltip>
          <Tooltip title={formatDate(createdAt?.seconds)}  >
              <Typography.Text className='content message-responsive' style={{borderTopLeftRadius: '2px'}}>{text} </Typography.Text>
          </Tooltip>
        </div>
      </WrapperStyled>
    );
}
