const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Character {
  id;
  first_name;
  last_name;
  quotes;

  constructor(row) {
    this.id = row.id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    // implement getAll() method to return all characters with a list of quotes
    const { rows } = await pool.query(
      `Select
      characters.*,
      COALESCE(
        json_agg(to_jsons(quotes))
        Filter(WHERE quotes.id IS NOT NULL), '[]') AS quotes
        From characters
        Left Join quotes ON characters.id = quotes.character_id Group By characters.id`
    );
    return rows.map((row) => new Character(row));
  }
}

module.exports = Character;
