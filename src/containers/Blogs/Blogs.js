import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as blogActions from 'redux/modules/blogs';
import { asyncConnect } from 'redux-connect';
import { BlogList } from 'components';

const { isLoaded, load: loadBlogs } = blogActions;

@asyncConnect([{
  deferred: true,
  promise: ({ store: { dispatch, getState } }) => {
    if (!isLoaded(getState())) {
      return dispatch(loadBlogs());
    }
  }
}])
@connect(
  state => ({
    blogs: state.blogs.data,
    load: PropTypes.func.isRequired,
    loading: state.blogs.loading
  }),
  { ...blogActions })
export default class Blogs extends Component {
  static propTypes = {
    blogs: PropTypes.array,
    load: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.load();
  }

  render() {
    const { blogs } = this.props;
    return (
      <div className="container">
        <div className="row">
          <h3>Blog Posts</h3>
          <Helmet title="Home" />
          {blogs.map(blog => <BlogList blog={blog} />)}
        </div>
      </div>
    );
  }
}
