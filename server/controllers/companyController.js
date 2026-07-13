// ==========================================
// Company Controller
// ==========================================

const getCompanies = (req, res) => {
  const companies = [
    "TCS",
    "Infosys",
    "Accenture",
    "Capgemini",
    "Wipro",
    "Cognizant",
    "IBM",
    "Deloitte",
    "PwC",
    "EY",
  ];

  res.json({
    success: true,

    message: "Companies fetched successfully.",

    data: companies,
  });
};

module.exports = {
  getCompanies,
};
