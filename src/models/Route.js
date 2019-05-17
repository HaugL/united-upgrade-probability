import { Bookshelf } from '../utils/database'

module.exports.Route = Bookshelf.Model.extend({
  tableName: 'routes',
});
