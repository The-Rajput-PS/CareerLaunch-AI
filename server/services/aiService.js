const pdfParse = require("pdf-parse");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const analyzeResumeWithAI = async (pdfBuffer) => {
  // Extract PDF text
  const pdfData = await pdfParse(pdfBuffer);

  const resumeText = pdfData.text;

  const prompt = `
You are an expert ATS (Applicant Tracking System) Resume Analyzer.

Analyze the resume like a professional ATS used by companies such as Google, Microsoft, Amazon, TCS, Infosys, Accenture and Deloitte.

IMPORTANT:

Do NOT calculate the final ATS score.

Instead, evaluate each section independently.

Scoring Rules:

- Contact: 0-5
- Summary: 0-10
- Education: 0-10
- Skills: 0-20
- Projects: 0-20
- Experience: 0-15
- Certifications: 0-5
- Formatting: 0-5
- Achievements: 0-5
- Grammar: 0-5

Be STRICT.

Most student resumes should score between 60 and 80.

Only outstanding resumes should reach above 90.

Deduct marks for:

- Missing internships
- Weak projects
- Poor project descriptions
- Missing GitHub
- Missing LinkedIn
- Missing certifications
- Poor formatting
- Missing measurable achievements
- Weak technical skills
- Grammar mistakes

Return ONLY valid JSON.

{
  "contact":{
      "present":true,
      "quality":0,
      "reason":""
  },
  "summary":{
      "present":true,
      "quality":0,
      "reason":""
  },
  "education":{
      "present":true,
      "quality":0,
      "reason":""
  },
  "skills":{
      "quality":0,
      "technicalSkills":[],
      "reason":""
  },
  "projects":{
      "count":0,
      "quality":0,
      "reason":""
  },
  "experience":{
      "present":true,
      "quality":0,
      "reason":""
  },
  "certifications":{
      "count":0,
      "quality":0,
      "reason":""
  },
  "formatting":{
      "quality":0,
      "reason":""
  },
  "achievements":{
      "quality":0,
      "reason":""
  },
  "grammar":{
      "quality":0,
      "reason":""
  },
  "strengths":[],
  "weaknesses":[],
  "missingSkills":[],
  "recommendations":[],
  "bestCompany":""
}

Resume:

${resumeText}
`;

  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const result = JSON.parse(
    completion.choices[0].message.content
);

const atsScore =
    result.contact.quality +
    result.summary.quality +
    result.education.quality +
    result.skills.quality +
    result.projects.quality +
    result.experience.quality +
    result.certifications.quality +
    result.formatting.quality +
    result.achievements.quality +
    result.grammar.quality;

result.atsScore = Math.min(100, atsScore);

if (atsScore >= 90)
    result.grade = "Excellent";
else if (atsScore >= 75)
    result.grade = "Good";
else if (atsScore >= 60)
    result.grade = "Average";
else
    result.grade = "Needs Improvement";

return result;
};

module.exports = {
  analyzeResumeWithAI,
};
