import feathersNedb from 'feathers-nedb';
import NeDB from 'nedb';
import hooks from './hooks';

export default function blogsService() {
  const app = this;

  app.use('/blogs', feathersNedb({
    Model: new NeDB({
      filename: `${__dirname}/blogs.nedb`,
      autoload: true
    }),
    paginate: {
      default: 25,
      max: 100
    }
  }));

  app.service('blogs')
    .before(hooks.before)
    .after(hooks.after);
}
