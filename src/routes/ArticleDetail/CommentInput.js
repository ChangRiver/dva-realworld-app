import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Avatar } from 'antd';
import styles from './ArticleDetail.css';
const { TextArea } = Input;
const FormItem = Form.Item;

const CommentInput = ({
  dispatch,
  loading,
  slug,
  currentUser,
  form: {
    getFieldDecorator,
    validateFields,
    setFieldsValue
  }
}) => {

  function onSubmit(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if(!err) {
        dispatch({
          type: 'articleDetail/createComment',
          payload: {
            slug: slug,
            comment: values
          }
        })
        .then(() => {
          setFieldsValue({
            body: null
          })
        })
      }
    })
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormItem className={styles.commentFormItem}>
        {
          getFieldDecorator('body', {
            rules: [{ required: true, message: 'Please input your comment' }]
          })(
            <TextArea placeholder="Write a comment..." rows={4} />
          )
        }
      </FormItem>
      <FormItem className={styles.commentFormButton}>
        <Avatar className={styles.avatar} src={currentUser.image} />
        <span>{currentUser.username}</span>
        <Button
          className="pull_right"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Post Comment
        </Button>
      </FormItem>
    </Form>
  )
}

function mapStateToProps(state) {
  const loading = state.loading.effects['articleDetail/createComment'];
  return {
    loading: loading
  }
}
export default connect(mapStateToProps)(Form.create()(CommentInput));