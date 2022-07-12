import React, {useState} from 'react'
import { Form, Input, Button,Modal, Select } from 'antd';
import {MinusCircleOutlined} from '@ant-design/icons';
const { Option } = Select;

const CreateIndexForm = (props)=>{
    const [showModal,setShowModal]=useState(props.show)
    //const [docmentDefinition, setDocumentDefinition]=useState([])
    const { getFieldDecorator, getFieldValue } = props.form;

    const handleSubmit=(e)=>{
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
              props.onSubmit(values)
            }else{
                props.onError(err)
            }
          });
    }
    const handleCancel=()=>{
        props.onCancel()
        setShowModal(false);
    }
    const remove = k => {
      const { form } = props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      // We need at least one passenger
      if (keys.length === 1) {
        return;
      }
  
      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
    };
  
    const add = (id) => {
      const { form } = props;
      
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      
      const nextKeys = keys.concat(++id);
      
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [0] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'Fields' : ''}
        required={false}
        key={k}
        
      >
        {getFieldDecorator(`fields[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input field name or delete this field.",
            },
          ],
        })(<Input placeholder="field name" style={{ width: '60%', marginRight: 8 }} onPressEnter={(e)=>add(index)}/>)}
        {keys.length > 1 ? (
          <MinusCircleOutlined 
            onClick={() => remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
        <Form onSubmit={handleSubmit}>
        <Modal
          visible={showModal}
          title="Create new index"
          onOk={handleSubmit}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary"  onClick={handleSubmit}>
              Submit
            </Button>]}>

                
                {/* <Form.Item label="Field Name" >
                {props.form.getFieldDecorator('fieldName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the field name',
                  },
                ],
              })(<Input onPressEnter={(e)=>{add(0)}}/>)}
            </Form.Item> */}
            {formItems}
            <Form.Item label="Configuration">
              {props.form.getFieldDecorator('configuration', {
                rules: [],
              })(<Select defaultValue="OPTIMIZE_WRITE" style={{ width: 120 }}>
                <Option value="OPTIMIZE_WRITE">Optimize Write</Option>
                <Option value="OPTIMIZE_READ">Optimize Read</Option>
              </Select>)}
              </Form.Item>
              <Form.Item label="Order by key">
              {props.form.getFieldDecorator('orderBy', {
                rules: [],
              })(<Input />)}
              </Form.Item>
        </Modal>
        </Form>
        
    )
}
export default CreateIndexForm;
