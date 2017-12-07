import React from 'react';
import {connect} from 'dva';
import { Tag } from 'antd';

const TagList = ({tags}) => (
  <div className="tags-list mT50">
    <h3>Popular Tags</h3>
    {
      tags.map((tag, i) => (
        <Tag className="mB5" key={i} color="magenta">{ tag }</Tag>
      ))
    }
  </div>
)

function mapStateToProps(state) {
  const { tags } = state.article;
  return { tags };
}
export default connect(mapStateToProps)(TagList)