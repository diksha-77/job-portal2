import { Company } from "../models/company.model.js";

export const createCompany = async (req, res) => {
  try {
    const { name, description, website, location, logo } = req.body;

    const company = await Company.create({
      name,
      description,
      website,
      location,
      logo,
      userId: req.id,
    });

    res.status(201).json({ company, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error creating company", success: false });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate("userId", "fullname email");
    res.json({ companies, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", success: false });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate("userId");
    if (!company) return res.status(404).json({ message: "Company not found", success: false });

    res.json({ company, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error fetching company", success: false });
  }
};
