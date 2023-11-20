// const { Destination } = require("../models/Destination");

// exports.createDestination = async (req, res) => {
//   try {
//     const newDestination = await Destination.create(req.body);
//     return res.status(201).json(newDestination);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.getAllDestinations = async (req, res) => {
//   try {
//     const destinations = await Destination.findAll();
//     return res.status(200).json(destinations);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.getDestinationById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const destination = await Destination.findByPk(id);

//     if (!destination) {
//       return res.status(404).json({ error: "Destination not found" });
//     }

//     return res.status(200).json(destination);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.updateDestination = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [updatedRowsCount, updatedDestination] = await Destination.update(
//       req.body,
//       {
//         where: { id },
//         returning: true,
//       }
//     );

//     if (updatedRowsCount === 0) {
//       return res.status(404).json({ error: "Destination not found" });
//     }

//     return res.status(200).json(updatedDestination[0]);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.deleteDestination = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedRowCount = await Destination.destroy({
//       where: { id },
//     });

//     if (deletedRowCount === 0) {
//       return res.status(404).json({ error: "Destination not found" });
//     }

//     return res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };
