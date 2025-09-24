import { MedicationModel } from "../models/medicationModel.js";

export const MedicationController = {
  async getAll(req, res) {
    try {
      const { name, page = 1, limit = 10 } = req.query;
      const meds = await MedicationModel.getAll({ name, page, limit });
      res.json(meds);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const med = await MedicationModel.getById(req.params.id);
      res.json(med);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { quantity, price } = req.body;

      if (quantity < 0) throw new Error("Quantity tidak boleh kurang dari 0");
      if (price < 0) throw new Error("Price tidak boleh kurang dari 0");

      const med = await MedicationModel.create(req.body);
      res.status(201).json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { quantity, price } = req.body;

      if (quantity !== undefined && quantity < 0)
        throw new Error("Quantity tidak boleh kurang dari 0");
      if (price !== undefined && price < 0)
        throw new Error("Price tidak boleh kurang dari 0");

      const med = await MedicationModel.update(req.params.id, req.body);
      res.json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await MedicationModel.remove(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
