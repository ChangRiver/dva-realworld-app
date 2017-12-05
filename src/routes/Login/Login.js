import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Form, Input, Icon, Button } from 'antd'
import MainLayout from '../../components/MainLayout/MainLayout';
import styles from './Login.css';
import ListErrors from '../../components/ListErrors/ListErrors';
const FormItem = Form.Item;

const Login = ({
  dispatch,
  loading,
  errors,
  location,
  form: {
    getFieldDecorator,
    validateFields
  }
}) => {

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if(!err) {
        // console.log('user login ', values)
        dispatch({ type: 'app/login', payload: values })
      }
    })
  }

  return (
    <MainLayout location={location}>
      <div className="container">
        <Row>
          <Col offset={9} span={6}>
            <h2 className={styles.title}>Sign In</h2>
            <p className="txt_center mB10"><Link to="/register">Need an account?</Link></p>
            <ListErrors errors={ errors } />
            <Form onSubmit={ handleSubmit }>
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email' }]
                })(
                  <Input prefix={<Icon type="user"/>} placeholder="Email" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your password' }]
                })(
                  <Input prefix={<Icon type="lock" />} type="password" placeholder="Password"/>
                )}
              </FormItem>
              <FormItem>
                <Button
                  className="pull_right"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Sign In
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    </MainLayout>
  )
}

function mapStateToProps(state) {
  const { errors } = state.app;
  return { 
    errors,
    loading: state.loading.models.app
  }
}

export default connect(mapStateToProps)(Form.create()(Login));