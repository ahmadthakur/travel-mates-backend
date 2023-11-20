// const { Trip } = require("../models/Trip");

// exports.createTrip = async (req, res) => {
//   try {
//     const newTrip = await Trip.create(req.body);
//     return res.status(201).json(newTrip);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.getAllTrips = async (req, res) => {
//   try {
//     const trips = await Trip.findAll();
//     return res.status(200).json(trips);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.getTripById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const trip = await Trip.findByPk(id);

//     if (!trip) {
//       return res.status(404).json({ error: "Trip not found" });
//     }

//     return res.status(200).json(trip);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.updateTrip = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [updatedRowsCount, updatedTrip] = await Trip.update(req.body, {
//       where: { id },
//       returning: true,
//     });

//     if (updatedRowsCount === 0) {
//       return res.status(404).json({ error: "Trip not found" });
//     }

//     return res.status(200).json(updatedTrip[0]);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.deleteTrip = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedRowCount = await Trip.destroy({
//       where: { id },
//     });

//     if (deletedRowCount === 0) {
//       return res.status(404).json({ error: "Trip not found" });
//     }

//     return res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };
