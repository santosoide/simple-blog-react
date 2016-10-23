import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { BlogCreateForm } from 'components';
import * as blogActions from 'redux/modules/blogs';
import * as notifActions from 'redux/modules/notifs';
import { asyncConnect } from 'redux-connect';
import { initialize } from 'redux-form';

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
  () => ({}),
  { ...notifActions, ...blogActions, initialize })
export default class BlogCreate extends Component {

  static propTypes = {
    initialize: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    notifSend: PropTypes.func,
    load: PropTypes.func.isRequired
  }

  successSave = result => {
    this.props.load();
    this.props.notifSend({
      message: 'Blog has been saved!',
      kind: 'success',
      dismissAfter: 2000
    });
    this.props.initialize('blog', {
      title: '',
      body: ''
    });
    return result;
  }

  handleSubmit = data => this.props.save(data).then(this.successSave)

  render() {
    return (
      <div className="container">
        <Helmet title="Post New Blog" />
        <h1>Post New Blog</h1>
        <BlogCreateForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
