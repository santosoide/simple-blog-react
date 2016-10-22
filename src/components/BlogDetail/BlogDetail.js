import React, { PropTypes } from 'react';

const BlogDetail = ({ blog }) => (
  <div>
    <div className="media well">
      <div className="media-body">
        {blog.body}
      </div>
    </div>
  </div>
);

BlogDetail.propTypes = {
  blog: PropTypes.object.isRequired
};

export default BlogDetail;
