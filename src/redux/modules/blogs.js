const LOAD = 'redux-example/blogs/LOAD';
const LOAD_SUCCESS = 'redux-example/blogs/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/blogs/LOAD_FAIL';
const LOAD_DETAIL = 'redux-example/blogs/LOAD_DETAIL';
const LOAD_DETAIL_SUCCESS = 'redux-example/blogs/LOAD_DETAIL_SUCCESS';
const LOAD_DETAIL_FAIL = 'redux-example/blogs/LOAD_DETAIL_FAIL';
const EDIT_START = 'redux-example/blogs/EDIT_START';
const EDIT_STOP = 'redux-example/blogs/EDIT_STOP';
const SAVE_BLOG = 'redux-example/blogs/SAVE_BLOG';
const SAVE_BLOG_SUCCESS = 'redux-example/blogs/SAVE_BLOG_SUCCESS';
const SAVE_BLOG_FAIL = 'redux-example/blogs/SAVE_BLOG_FAIL';
const IS_SLUG_EXISTS = 'redux-example/blogs/IS_SLUG_EXISTS';
const IS_SLUG_EXISTS_SUCCESS = 'redux-example/blogs/IS_SLUG_EXISTS_SUCCESS';
const IS_SLUG_EXISTS_FAIL = 'redux-example/blogs/IS_SLUG_EXISTS_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  detail: {},
  data: [],
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: typeof action.error === 'string' ? action.error : 'Error'
      };
    case LOAD_DETAIL:
      return {
        ...state,
        loading: true
      };
    case LOAD_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        detail: action.result,
        error: null
      };
    case LOAD_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: typeof action.error === 'string' ? action.error : 'Error'
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case SAVE_BLOG:
      return state;
    case SAVE_BLOG_SUCCESS:
      return {
        ...state,
        data: action.result
      };
    case SAVE_BLOG_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    case IS_SLUG_EXISTS:
      return {
        ...state,
        exist: true
      };
    case IS_SLUG_EXISTS_SUCCESS:
      return {
        ...state,
        slug: action.result.data,
        error: null
      };
    case IS_SLUG_EXISTS_FAIL:
      return {
        ...state,
        slug: null,
        error: typeof action.error === 'string' ? action.error : 'Error'
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.blogs && globalState.blogs.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/blogs')
  };
}

export function loadDetail(slug) {
  return {
    types: [LOAD_DETAIL, LOAD_DETAIL_SUCCESS, LOAD_DETAIL_FAIL],
    promise: client => client.get(`/blog/${slug}`)
  };
}

export function save(blog) {
  return {
    types: [SAVE_BLOG, SAVE_BLOG_SUCCESS, SAVE_BLOG_FAIL],
    promise: client => client.post('/blogs', {
      data: blog
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}

export function isSlugExists(slug) {
  return {
    types: [IS_SLUG_EXISTS, IS_SLUG_EXISTS_SUCCESS, IS_SLUG_EXISTS_FAIL],
    promise: client => client.get(`/blog/${slug}`, {
      slug
    })
  };
}
