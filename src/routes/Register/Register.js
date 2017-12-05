import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Form, Input, Button, Icon } from 'antd';
import MainLayout from '../../components/MainLayout/MainLayout';
import ListErrors from '../../components/ListErrors/ListErrors';
import styles from './Register.css';

const FormItem = Form.Item;

const Register = ({
  dispatch,
  loading,
  errors,
  location,
  form: {
    validateFields,
    getFieldDecorator
  }
}) => {
  function handleSubmit(e) {
    e.preventDefault()
    validateFields((err, values) => {
      if(!err) {
        dispatch({type: 'app/register', payload: values})
      }
    })
  }

  return (
    <MainLayout location={location}>
      <div className="container">
        <Row>
          <Col offset={9} span={6}>
            <h2 className={styles.title}>Sign Up</h2>
            <p className="txt_center mB10"><Link to="/login">Have an account?</Link></p>
            <ListErrors errors={ errors } />
            <Form onSubmit={ handleSubmit }>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username' }]
              })(
                <Input prefix={<Icon type="user"/>} placeholder="Username" />
              )}
            </FormItem>
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
                  Sign Up
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

export default connect(mapStateToProps)(Form.create()(Register))