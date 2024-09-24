import { validationResult } from "express-validator";

import connectDB from "../config/db.js";

const connection = await connectDB();

export const createCompany = async (req, res) => {
  const userid = req.userid;
  const userRole = req.userrole;
  const userStatus = req.userstatus;
  const { name, location, industry, website, size } = req.body;

  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        message: error
          .array()
          .map((error) => error.msg)
          .join("||"),
      });
    }
    if (userRole === "recruiter" && userStatus === 1) {
      const createCompanyQuery = `INSERT INTO companies (name, location, industry, website, size, date, status, userid ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      connection.query(
        createCompanyQuery,
        [name, location, industry, website, size, new Date(), 1, userid],
        (err, result) => {
          if (err) {
            console.error("Database query error:", err.message);
            return res.status(500).json({ message: "Internal server error" });
          }

          return res
            .status(201)
            .json({ message: "Company created successfully" });
        }
      );
    } else {
      return res
        .status(401)
        .json({ message: "You are not authorized to create a company" });
    }
  } catch (error) {
    console.error("Error in createCompany:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCompany = async (req, res) => {
  const userid = req.userid;
  const userRole = req.userrole;
  const userStatus = req.userstatus;

  try {
    if (userRole === "recruiter" && userStatus === 1) {
      const getCompanyQuery = `SELECT name, location, industry, website, size FROM companies WHERE userid = ?`;

      connection.query(getCompanyQuery, [userid], (err, result) => {
        if (err) {
          console.error("Database query error:", err.message);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (result.length === 0) {
          return res.status(404).json({ message: "Company not found" });
        }

        return res.status(200).json({ company: result[0] });
      });
    } else {
      return res
        .status(401)
        .json({ message: "You are not authorized to view this company" });
    }
  } catch (error) {
    console.error("Error in getCompany:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCompanies = async (req, res) => {
  const userid = req.userid;
  const userRole = req.userrole;
  const userStatus = req.userstatus;

  try {
    if (userRole === "recruiter" && userStatus === 1) {
      const getCompanyQuery = `SELECT name, location, industry, website, size FROM companies`;

      connection.query(getCompanyQuery, (err, result) => {
        if (err) {
          console.error("Database query error:", err.message);
          return res.status(500).json({ message: "Internal server error" });
        }

        if (result.length === 0) {
          return res.status(404).json({ message: "Company not found" });
        }

        return res.status(200).json({ company: result });
      });
    } else {
      return res
        .status(401)
        .json({ message: "You are not authorized to view this company" });
    }
  } catch (error) {
    console.error("Error in getCompany:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
