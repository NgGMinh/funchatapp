import React, { useContext } from 'react';
import { Form, Input, Modal } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/service';
import { AuthContext } from '../../Context/AuthProvider';

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);  
    
  const { user: { uid } } = useContext(AuthContext);

  const [form] = Form.useForm(); 
  
  const handleOK = () => {
    console.log({ formData: form.getFieldValue() });
    addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });

    form.resetFields();
    setIsAddRoomVisible(false);
  }  

  const handleCancel = () => {
    form.resetFields();
    
    setIsAddRoomVisible(false);
  }  

  return (
    <div>
      <Modal title="Tạo phòng" visible={isAddRoomVisible} onOk={handleOK} onCancel={handleCancel}>
        <Form form={form} layout='vertical'>
          <Form.Item label="Tên phòng" name='name'>
            <Input placeholder='Nhập tên phòng'/>
          </Form.Item>  
          <Form.Item label="Mô tả" name='description'>
            <Input.TextArea placeholder='Nhập mô tả'/>
          </Form.Item>  
        </Form>
      </Modal>
    </div>
  )
}
