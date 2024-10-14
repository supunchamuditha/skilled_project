import db from "../configs/db.js";

export const updateCompany = async (req, res) => {};

export const deleteCompany = async (req, res) => {};

export const getCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const connect = await db();

    const getCompanies = `SELECT name, email, phone_num, location, industry, logo FROM companies WHERE id = ${id}`;

    connect.query(getCompanies, (err, result) => {
      if (err) {
        console.error("Error in getCompanies: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      return res.status(200).json({ companies: result[0] });
    });
  } catch (error) {
    console.error("Error in getCompanies: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const connect = await db();

    const getCompanies = `SELECT name, email, phone_num, location, industry, logo FROM companies`;

    connect.query(getCompanies, (err, result) => {
      if (err) {
        console.error("Error in getCompanies: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      return res.status(200).json({ companies: result });
    });
  } catch (error) {
    console.error("Error in getCompanies: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
