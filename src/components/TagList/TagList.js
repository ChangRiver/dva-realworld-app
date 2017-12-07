import React from 'react';
import {connect} from 'dva';
import { Tag } from 'antd';

const TagList = ({dispatch, tags}) => {

  function handleClick(e) {
    e.preventDefault();
    const tag = e.target.innerText;
    if(tag && tag.length < 20) {
      dispatch({
        type: "article/articlesByTag",
        payload: {
          page: 1,
          tag: tag
        }
      })
    }
  }

  return (
    <div className="mT50">
      <h3>Popular Tags</h3>
      <div className="tags-list" onClick={handleClick}>
        {
          tags.map((tag, i) => (
            <Tag className="mB5" key={i} name={tag} color="magenta">{ tag }</Tag>
          ))
        }
      </div>
    </div>
  )
};

function mapStateToProps(state) {
  const { tags } = state.article;
  return { tags };
}

export default connect(mapStateToProps)(TagList)
