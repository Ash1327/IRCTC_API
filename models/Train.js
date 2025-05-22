const db = require('../database/dbconfig');
// Add a new train to the database
async function addTrain(trainNumber, source, destination, totalSeats) {
  const availableSeats = totalSeats;
  try {
    const [result] = await db.query(
      'INSERT INTO trains (train_number, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)',
      [trainNumber, source, destination, totalSeats, availableSeats]
    );
    return result.insertId;
  } catch (err) {
    throw new Error('Error adding train: ' + err.message);
  }
}

// Get train details by ID
async function getTrainById(trainId) {
  try {
    const [rows] = await db.query('SELECT * FROM trains WHERE id = ?', [trainId]);
    return rows[0];
  } catch (err) {
    throw new Error('Error fetching train by ID: ' + err.message);
  }
}

// Get trains by source and destination
async function getTrainsByRoute(source, destination) {
  try {
    const sourceFormatted = source.trim().toLowerCase();
    const destinationFormatted = destination.trim().toLowerCase();

    const [rows] = await db.query(`
      SELECT train_number, source, destination, total_seats, available_seats
      FROM trains
      WHERE TRIM(LOWER(source)) = ? AND TRIM(LOWER(destination)) = ?
    `, [sourceFormatted, destinationFormatted]);

    return rows;
  } catch (err) {
    console.error('Error fetching trains by route:', err);
    throw new Error('Error fetching trains by route: ' + err.message);
  }
}

// Decrease available seats during booking
async function updateAvailableSeats(trainId, seatsToBook) {
  try {
    const [result] = await db.query(
      'UPDATE trains SET available_seats = available_seats - ? WHERE id = ? AND available_seats >= ?',
      [seatsToBook, trainId, seatsToBook]
    );
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error('Error updating available seats: ' + err.message);
  }
}

// Update total and available seats for a train (admin use)
async function updateSeats(trainId, totalSeats, availableSeats) {
  try {
    const [result] = await db.query(
      'UPDATE trains SET total_seats = ?, available_seats = ? WHERE id = ?',
      [totalSeats, availableSeats, trainId]
    );
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error('Error updating train seats: ' + err.message);
  }
}

// Export all functions at the end
module.exports = {
  addTrain,
  getTrainById,
  getTrainsByRoute,
  updateAvailableSeats,
  updateSeats
};
