import { Bookshelf } from '../utils/database'

module.exports.Destination = Bookshelf.Model.extend({
  tableName: 'destination_cities',
});
