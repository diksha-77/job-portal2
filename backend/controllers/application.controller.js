import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await Application.findOne({ job: id, applicant: req.id });
    if (existing) return res.status(400).json({ message: "Already applied", success: false });

    const application = await Application.create({ job: id, applicant: req.id });

    await Job.findByIdAndUpdate(id, { $push: { applications: application._id } });

    res.status(201).json({ application, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error applying for job", success: false });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.id }).populate("job");
    res.json({ applications, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applied jobs", success: false });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    const applicants = await Application.find({ job: id }).populate("applicant");
    res.json({ applicants, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applicants", success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ application, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", success: false });
  }
};
