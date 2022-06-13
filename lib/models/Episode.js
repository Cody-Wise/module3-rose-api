const pool = require('../utils/pool');
const { Quote } = require('./Quote');

class Episode {
  id;
  title;
  season;
  number;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.number = row.number;
    this.season = row.season;
    this.quotes =
      row.quotes.length > 0 ? row.quotes.map((quote) => new Quote(quote)) : [];
  }

  static async getAll() {
    // implement getAll() method to return a list of Episodes with quotes
    const { rows } = await pool.query(
      `Select
    episodes.*,
    COALESCE(
      json_agg(to_jsonb(quotes))
      Filter(WHERE quotes.id IS NOT NULL), '[]'
      ) AS quotes From episodes
      Left Join quotes ON quotes.episodes.id = episode_id Group By episodes.id`
    );
    return rows.map((row) => new Episode(row));
  }
}

module.exports = { Episode };
