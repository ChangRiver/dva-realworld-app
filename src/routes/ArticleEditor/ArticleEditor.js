import React from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Input, Button, Tag } from 'antd';
import styles from './ArticleEditor.css';
import MainLayout from '../../components/MainLayout/MainLayout';
const FormItem = Form.Item;
const { TextArea } = Input;

const ArticleEditor = ({
  location,
  dispatch,
  loading,
  tagList,
  form: {
    getFieldDecorator,
    validateFields
  }
}) => {

  function onEnterTag(e) {
    e.preventDefault();
    if(e.keyCode === 13) {
      dispatch({
        type: 'articleEditor/addTag',
        payload: e.target.value
      })
    }
  }

  function onRemoveTag(tag, e) {
    console.log('close ', e.target, tag)
    e.preventDefault()
    dispatch({
      type: 'articleEditor/removeTag',
      payload: tag
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    validateFields((err, values) => {
      if(!err) {
        console.log('values ', values)
        const article = { ...values, tagList };
        dispatch({
          type: 'articleEditor/articleCreate',
          payload: article
        })
      }
    })
  }

  return (
    <MainLayout location={location}>
      <div className="container">
        <Row>
          <Col className="mT50" span={14} offset={5}>
            <Form onSubmit={handleSubmit}>
              <FormItem>
                {
                  getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input the title' }]
                  })(
                    <Input placeholder="Article Title" />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Please input the description' }]
                  })(
                    <Input placeholder="What's this article about?" />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('body', {
                    rules: [{ required: true, message: 'Please input your article' }]
                  })(
                    <TextArea placeholder="Write your article" rows={4} />
                  )
                }
              </FormItem>
              <FormItem className={styles.inputTag}>
                <Input placeholder="Write tag and press Enter key to add" onPressEnter={onEnterTag} />
              </FormItem>
              <FormItem>
                {
                  tagList.map((tag, i) => (
                    <Tag closable color="lime" key={i} onClose={onRemoveTag.bind(this, tag)}>{ tag }</Tag>
                  ))
                }
              </FormItem>
              <FormItem>
                <Button
                  className="pull_right"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Publish Article
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
  const { tagList } = state.articleEditor;
  const loading = state.loading.effects['articleEditor/articleCreate'];
  return {
    tagList,
    loading
  }
}
export default connect(mapStateToProps)(Form.create()(ArticleEditor));




