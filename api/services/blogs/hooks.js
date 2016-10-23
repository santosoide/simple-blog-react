import hooks from 'feathers-hooks';
import { hooks as auth } from 'feathers-authentication';
import { validateHook as validate } from '../../hooks';
import { required } from '../../utils/validation';
import uuid from 'uuid';
import dashify from 'dashify';

const schemaValidator = {
  title: [required],
  body: [required]
};

const options = {
  service: 'blogs',
  field: 'sentBy'
};

const blogsHooks = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      validate(schemaValidator),
      hook => {
        hook.data = {
          _id: uuid.v4(),
          title: hook.data.title,
          slug: dashify(hook.data.title),
          body: hook.data.body
        };
      },
      hook => {
        hook.data.createdAt = new Date();
      }
    ],
    update: [
      validate(schemaValidator),
      hook => {
        hook.data = {
          title: hook.data.title,
          slug: dashify(hook.data.title),
          body: hook.data.body
        };
      },
      hook => {
        hook.data.updatedAt = new Date();
      }
    ],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

export default blogsHooks;
