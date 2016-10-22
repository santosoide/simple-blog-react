import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const BlogList = ({ blog, user }) => (
  <div>
    <div className="media well">
      <div className="media-body">
        <h4 className="media-heading">
          <strong>
            <Link to={`blog/${blog.slug}`}>{blog.title}</Link>
          </strong>
          {' '}
          {user && <Link className="btn btn-link btn-xs" type="button" to={`blog/${blog._id}/edit`}>Edit</Link>}
        </h4>
        {blog.body}
        <br />
      </div>
    </div>
  </div>
);

BlogList.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default BlogList;
