import users from './users';
import messages from './messages';
import blogs from './blogs';

export default function services() {
  const app = this;

  app.configure(users);
  app.configure(messages);
  app.configure(blogs);
}
