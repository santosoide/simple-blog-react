import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as blogActions from 'redux/modules/blogs';
import { asyncConnect } from 'redux-connect';
import { BlogDetail } from 'components';

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
    loadDetail: PropTypes.func.isRequired
  }),
  { ...blogActions })
export default class Blogs extends Component {
  static propTypes = {
    blog: PropTypes.array,
    loadDetail: PropTypes.func.isRequired,
    params: PropTypes.object
  };

  componentDidMount() {
    this.props.loadDetail(this.props.params.slug);
  }
  render() {
    const { blog } = this.props;
    return (
      <div className="container">
        <div className="row">
          <h3>{blog.title}</h3>
          <Helmet title={blog.title} />
          <BlogDetail blog={blog} />
        </div>
      </div>
    );
  }
}
