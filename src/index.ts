import { User } from './model';
import { formatUser } from './other-module';

const user: User = {
  name: 'test',
};

console.log(formatUser(user));
