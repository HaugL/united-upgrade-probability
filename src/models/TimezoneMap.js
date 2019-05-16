import { Bookshelf } from '../utils/database'

module.exports.TimezoneMap = Bookshelf.Model.extend({
  tableName: 'airport_timezone_map',
});
