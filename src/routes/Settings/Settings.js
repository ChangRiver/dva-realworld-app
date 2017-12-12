import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Input, Button } from 'antd';
import MainLayout from '../../components/MainLayout/MainLayout';
import ListErrors from '../../components/ListErrors/ListErrors';
const FormItem = Form.Item;
const { TextArea } = Input;

const Settings = ({
  location,
  dispatch,
  loading,
  user,
  errors,
  form: {
    getFieldDecorator,
    validateFields
  }
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if(!err) {
        const formData = Object.assign({}, values);
        if(!formData.password) {
          delete formData.password;
        }
        dispatch({
          type: 'app/updateUserInfo',
          payload: formData
        })
      }
    })
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch({type: 'app/logout'})
  }

  return (
    <MainLayout location={location}>
      <div className="container">
        <Row>
          <Col className="mT50" span={14} offset={5}>
            <h1 className="txt_center">Your Settings</h1>
            <ListErrors errors={errors} />
            <Form onSubmit={handleSubmit}>
              <FormItem>
                {
                  getFieldDecorator('image', {
                    initialValue: user.image
                  })(
                    <Input placeholder="URL of profile picture" />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('username', {
                    initialValue: user.username
                  })(
                    <Input placeholder="Username" />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('bio', {
                    initialValue: user.bio
                  })(
                    <TextArea placeholder="Short bio about you" rows={4} />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('email', {
                    initialValue: user.email
                  })(
                    <Input placeholder="Email" />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('password')(
                    <Input placeholder="New Password" />
                  )
                }
              </FormItem>
              <FormItem>
                <Button
                  className="pull_right"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Update Settings
                </Button>
              </FormItem>
            </Form>
            <hr/>
            <Button ghost type="danger" onClick={handleClick}>Or click here to logout</Button>
          </Col>
        </Row>
      </div>
    </MainLayout>
  )
};

function mapStateToProps(state) {
  const { user, errors } = state.app;
  return {
    user,
    errors,
    loading: state.loading.models.app
  }
}
export default connect(mapStateToProps)(Form.create()(Settings));
