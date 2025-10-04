import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, experienceLevel, location, jobType, position, company } = req.body;

    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      experienceLevel,
      location,
      jobType,
      position,
      company,
      created_by: req.id,
    });

    res.status(201).json({ job, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error posting job", success: false });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company").populate("created_by", "fullname email");
    res.json({ jobs, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", success: false });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ created_by: req.id }).populate("company");
    res.json({ jobs, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin jobs", success: false });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("company").populate("applications");
    if (!job) return res.status(404).json({ message: "Job not found", success: false });

    res.json({ job, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", success: false });
  }
};
