import db from "../configs/db.js";

export const createApplication = async (req, res) => {
  try {
    const job_id = req.params.id;
    const { message, company_id } = req.body;

    const userid = req.userId;
    const userType = req.userType;

    const pdf = req.file.buffer;
    const pdf_type = req.file.mimetype;

    const connect = await db();

    if (userType === "user") {
      const createApplicationQuery = `INSERT INTO application (message, pdf, pdf_type, date_applied, status, user_id, company_id, job_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      connect.query(
        createApplicationQuery,
        [message, pdf, pdf_type, new Date(), "1", userid, company_id, job_id],
        (error, result) => {
          if (error) {
            console.error("Error in createApplicationQuery: ", error.message);
            return res.status(500).json({ message: "Internal server error" });
          }

          return res.status(201).json({ message: "Application created" });
        }
      );
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid user type" });
    }
  } catch (error) {
    console.error("Error in createApplication", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateApplication = async (req, res) => {};

export const deleteApplication = async (req, res) => {};

export const getApplication = async (req, res) => {};

export const getApplications = async (req, res) => {};
