import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const BlogList = ({ blog }) => (
  <div>
    <div className="media well">
      <div className="media-body">
        <h4 className="media-heading"><strong><Link to={`blog/${blog.slug}`}>{blog.title}</Link></strong></h4>
        {blog.body}
        <br />
        <Link to={`blog/${blog._id}`}>Edit</Link>
      </div>
    </div>
  </div>
);

BlogList.propTypes = {
  blog: PropTypes.object.isRequired
};

export default BlogList;
