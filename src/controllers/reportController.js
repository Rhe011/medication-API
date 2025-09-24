import { MedicationModel } from "../models/medicationModel.js";

export const ReportController = {
  async totalMedications(req, res) {
    try {
      const total = await MedicationModel.getTotal();
      res.json({ total });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
