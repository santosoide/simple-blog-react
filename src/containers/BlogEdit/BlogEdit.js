import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as blogActions from 'redux/modules/blogs';
import * as notifActions from 'redux/modules/notifs';
import { asyncConnect } from 'redux-connect';
import { initialize } from 'redux-form';
import { BlogEditForm } from 'components';

const { isLoaded, load: loadBlogs, loadOne: loadOneBlog } = blogActions;

@asyncConnect([{
  deferred: true,
  promise: ({ store: { dispatch, getState } }) => {
    if (!isLoaded(getState())) {
      return dispatch(loadOneBlog());
    }

    if (!isLoaded(getState())) {
      return dispatch(loadBlogs());
    }
  }
}])
@connect(
  state => ({
    blog: state.blogs.blog,
    loadOne: PropTypes.func.isRequired
  }),
  { ...notifActions, ...blogActions, initialize })
export default class BlogEdit extends Component {

  static propTypes = {
    initialize: PropTypes.func.isRequired,
    blog: PropTypes.object,
    notifSend: PropTypes.func,
    loadOne: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    params: PropTypes.object,
    load: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.loadOne(this.props.params._id);
    this.props.initialize('blogEdit', {
      title: this.props.blog.title,
      body: this.props.blog.body,
      _id: this.props.blog._id
    });
  }

  successUpdate = result => {
    this.props.load();
    this.props.notifSend({
      message: 'Blog has been updated!',
      kind: 'success',
      dismissAfter: 2000
    });
    return result;
  }

  handleSubmit = data => this.props.update(data).then(this.successUpdate)

  render() {
    const { blog } = this.props;
    return (
      <div className="container">
        <Helmet title="Edit Blog" />
        <h1>Edit Blog</h1>
        <BlogEditForm onSubmit={this.handleSubmit} blog={blog} />
      </div>
    );
  }
}
