import { formatUser } from './other-module';
import { User } from './model';

describe('other-module specs', () => {
  describe('formatUser', () => {
    it('Should format user with a name', () => {
      // Arrange
      const user: User = {
        name: 'test',
      };
      // Act
      const result = formatUser(user);

      // Assert
      expect(result).toEqual('The user name: test');
    });
  });
});
