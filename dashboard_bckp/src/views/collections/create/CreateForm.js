import React, {useState} from 'react'
import { Form, Input, Icon, Button,Modal,Checkbox, Select} from 'antd';
const { Option } = Select;

const CreateCollectionForm = (props)=>{
    const [showModal,setShowModal]=useState(props.show)
    const { getFieldDecorator, getFieldValue } = props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 4},
        sm: { span: 8},
      },
    };
    const onTypeChange = (value) => {
      const { form } = props;
      const val = {}
    
      form.setFieldsValue({
        type: value
      })
      console.log("set value"+value)
    };
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

      const type = form.getFieldValue("type_"+id)
        // can use data-binding to set
      // important! notify form to detect changes
      console.log(id+" and "+type)
      var nextKeys = [
        ...keys,
        {id: id+1, type: "STRING"}
      ].map(v=>{
        if(v.id==id){
          return {
            id:id,
            type: type || "STRING"
          }
          }else{
            return v;
          }
        });
        
  
      form.setFieldsValue({
        keys: nextKeys
      });
      
      console.log(form.getFieldValue("keys"))
    };
    const formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8, offset: 4 },
    };
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
  
    
    return (
        <Form onSubmit={handleSubmit} name='create_collection' >
        <Modal
          visible={showModal}
          title="Create new collection"
          onOk={handleSubmit}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary"  onClick={handleSubmit}>
              Submit
            </Button>]}>

          
            <Form.Item label="Document Name">
          {props.form.getFieldDecorator('documentName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the document name',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="ID key">
              {props.form.getFieldDecorator('idKey', {
                rules: [
                  {
                    required: true,
                    message: 'Please input key identifier',
                  },
                ],
              })(<Input />)}
              </Form.Item>
              <Form.Item label="Sort key">
              {props.form.getFieldDecorator('orderingKey', {
                rules: [
                  {
                    required: true,
                    message: 'Please input sort key',
                  },
                ],
              })(<Input />)}
        </Form.Item>
        <Form.Item {...formTailLayout}>
        {getFieldDecorator('active', {
            initialValue: ['active'],
          })(
          <Checkbox >
            Active
          </Checkbox>
          )}
        </Form.Item>
        {/* <Form.List name="fields">
        {(fields, { addField, removeField }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (

                <Input.Group compact key={key}>

                <Form.Item
                  {...restField}
                  name={[name, 'type']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing type',
                    },
                  ]}
                >
              <Select
                style={{
                  width: '30%',
                }}
                defaultValue="STRING"
                // onChange={value=>onTypeChange(value)}
              >
                <Option value="STRING">String</Option>
                <Option value="DATE">Date</Option>
                <Option value="NUMBER">Number</Option>
                <Option value="OBJECT">Object</Option>
                <Option value="ARRAY">Array</Option>
              </Select>
              </Form.Item>
              <Form.Item
                  {...restField}
                  name={[name, 'field_name']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing field name',
                    },
                  ]}
                >
                  <Input placeholder="field name" style={{ width: '60%', marginRight: 8 }} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => removeField(name)} />

              
        </Input.Group>

            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => addField()} block >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List> */}
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing first name',
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing last name',
                    },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <Button onClick={() => remove(name)} />
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
        </Modal>
        </Form>
        
    )
}
export default CreateCollectionForm;
