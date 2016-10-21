import feathersNedb from 'feathers-nedb';
import NeDB from 'nedb';
import hooks from './hooks';

export default function blogsService() {
  const app = this;

  const db = new NeDB({
    filename: `${__dirname}/blogs.nedb`,
    autoload: true
  });

  const slugService= {
    setup(app) {
      this.app = app
    },

    find(params) {
      return new Promise( function( resolve, reject ) {
        db.findOne({ slug: params.slug }).exec(function(err,doc){
          resolve(doc);
        });
      });
    }
  }

  app.use('/blogs', feathersNedb({
    Model: db,
    paginate: {
      default: 25,
      max: 100
    }
  }));

  app.use('/blog/:slug', slugService)

  app.service('blogs')
    .before(hooks.before)
    .after(hooks.after);
}
