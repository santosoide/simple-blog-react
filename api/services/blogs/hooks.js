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
  service: 'users',
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
    update: [hooks.disable()],
    patch: [hooks.disable()],
    remove: [hooks.disable()]
  },
  after: {
    all: [],
    find: [hooks.populate('sentBy', options), hooks.remove('sentBy.password')],
    get: [hooks.populate('sentBy', options), hooks.remove('sentBy.password')],
    create: [hooks.populate('sentBy', options), hooks.remove('sentBy.password')],
    update: [],
    patch: [],
    remove: []
  }
};

export default blogsHooks;
