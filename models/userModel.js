const db = require('../config/db');

module.exports = {
  async create(user) {
    const { email, password, is_verified, verification_token } = user;
    try {
      const newUser = await db.one(
        `INSERT INTO users(email, password, is_verified, verification_token) 
         VALUES($1, $2, $3, $4) RETURNING *`,
        [email, password, is_verified, verification_token]
      );
      console.log('User created:', newUser.email);
      return newUser;
    } catch (err) {
      console.error('Error inserting user:', err.message);
      throw err;
    }
  },

  async findByEmail(email) {
    try {
      return await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
    } catch (err) {
      console.error('Error finding user by email:', err.message);
      throw err;
    }
  },

  async findByToken(token) {
    try {
      return await db.oneOrNone('SELECT * FROM users WHERE verification_token = $1', [token]);
    } catch (err) {
      console.error('Error finding user by token:', err.message);
      throw err;
    }
  },

  async verifyUser(id) {
    try {
      await db.none(
        'UPDATE users SET is_verified = true, verification_token = NULL WHERE id = $1',
        [id]
      );
      console.log('User verified with ID:', id);
    } catch (err) {
      console.error('Error verifying user:', err.message);
      throw err;
    }
  },

  async updatePassword(id, hashed) {
    try {
      await db.none('UPDATE users SET password = $1 WHERE id = $2', [hashed, id]);
      console.log('Password updated for user ID:', id);
    } catch (err) {
      console.error('Error updating password:', err.message);
      throw err;
    }
  },

  async getById(id) {
    try {
      return await db.one('SELECT id, email, is_verified FROM users WHERE id = $1', [id]);
    } catch (err) {
      console.error('Error getting user by ID:', err.message);
      throw err;
    }
  },
};
