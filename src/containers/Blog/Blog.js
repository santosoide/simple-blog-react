import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as blogActions from 'redux/modules/blogs';
import { asyncConnect } from 'redux-connect';
import { BlogDetail } from 'components';
import { Link } from 'react-router';

const { isLoaded, loadDetail: loadDetailBlogs } = blogActions;

@asyncConnect([{
  deferred: true,
  promise: ({ store: { dispatch, getState } }) => {
    if (!isLoaded(getState())) {
      return dispatch(loadDetailBlogs());
    }
  }
}])
@connect(
  state => ({
    blog: state.blogs.detail,
    loadDetail: PropTypes.func.isRequired,
    user: state.auth.user
  }),
  { ...blogActions })
export default class Blog extends Component {
  static propTypes = {
    blog: PropTypes.object,
    loadDetail: PropTypes.func.isRequired,
    user: PropTypes.object,
    params: PropTypes.object
  };

  componentDidMount() {
    this.props.loadDetail(this.props.params.slug);
  }
  render() {
    const { blog, user } = this.props;
    const baseUrl = '/blog';
    return (
      <div className="container">
        <div className="row">
          <h3>
            {blog.title}{user && <Link className="btn btn-link" type="button" to={`${baseUrl}/${blog._id}/edit`}>
            Edit</Link>}
          </h3>
          <Helmet title={blog.title} />
          <BlogDetail blog={blog} />
        </div>
      </div>
    );
  }
}
