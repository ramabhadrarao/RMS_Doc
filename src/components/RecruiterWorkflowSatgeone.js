import React, { useState } from 'react';
import '../FormStyles.css';

const initialFormData = {
  businessType: 'Permanent',
  client: '',
  prevCompanyName: '',
  startedDate: '',
  endedDate: '',
  releivingLetter: null,
  selectSource: 'Job Board',
  offeredDesignation: '',
  experienceYears: '',
  expectedJoiningDate: '',
  offeredSalary: '',
};

const clientOptions = [
  'TCS', 'Wipro', 'Infosys', 'Cognizant', 'HCL'
];

const businessTypeOptions = ['Permanent', 'Contract'];
const selectSourceOptions = ['Job Board', 'Referral', 'Internal Database', 'Social Media'];

const RecruiterWorkflowSatgeone = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.experienceYears) newErrors.experienceYears = 'Experience (Years) is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <form className="recruiter-workflow-form" onSubmit={handleSubmit} autoComplete="off">
      <h2>Create Selection Record</h2>
      <div className="form-grid">
        <h3 className="section-title">Business</h3>
        <div className="form-group">
          <label htmlFor="businessType">Business Type</label>
          <select id="businessType" name="businessType" value={formData.businessType} onChange={handleChange}>
            <option value="Permanent">Permanent</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="client">Client</label>
          <select id="client" name="client" value={formData.client} onChange={handleChange}>
            <option value="" disabled>Select a client</option>
            <option value="TCS">TCS</option>
            <option value="Wipro">Wipro</option>
            <option value="Infosys">Infosys</option>
            <option value="Cognizant">Cognizant</option>
            <option value="HCL">HCL</option>
          </select>
        </div>
        <h3 className="section-title">Previous Company</h3>
        <div className="form-group full-width">
          <label htmlFor="prevCompanyName">Company Name</label>
          <input type="text" id="prevCompanyName" name="prevCompanyName" value={formData.prevCompanyName} onChange={handleChange} placeholder="Candidate's previous employer" />
        </div>
        <div className="form-group">
          <label htmlFor="startedDate">Started Date</label>
          <input type="date" id="startedDate" name="startedDate" value={formData.startedDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="endedDate">Ended Date</label>
          <input type="date" id="endedDate" name="endedDate" value={formData.endedDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="releivingLetter">Releiving/Experience Letter</label>
          <input type="file" id="releivingLetter" name="releivingLetter" onChange={handleChange} />
          {formData.releivingLetter && <span className="file-name">{formData.releivingLetter.name}</span>}
        </div>
        <h3 className="section-title">Selection Process</h3>
        <div className="form-group">
          <label htmlFor="selectSource">Select Source</label>
          <select id="selectSource" name="selectSource" value={formData.selectSource} onChange={handleChange}>
            <option value="Job Board">Job Board</option>
            <option value="Referral">Referral</option>
            <option value="Internal Database">Internal Database</option>
            <option value="Social Media">Social Media</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="offeredDesignation">Offered Designation</label>
          <input type="text" id="offeredDesignation" name="offeredDesignation" value={formData.offeredDesignation} onChange={handleChange} placeholder="Designation offered" />
        </div>
        <div className="form-group">
          <label htmlFor="experienceYears">Experience (Years) *</label>
          <input type="number" id="experienceYears" name="experienceYears" value={formData.experienceYears} onChange={handleChange} placeholder="Total years of experience" required />
          {errors.experienceYears && <div className="error-text">{errors.experienceYears}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="expectedJoiningDate">Expected Joining Date</label>
          <input type="date" id="expectedJoiningDate" name="expectedJoiningDate" value={formData.expectedJoiningDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="offeredSalary">Offered Salary</label>
          <input type="number" id="offeredSalary" name="offeredSalary" value={formData.offeredSalary} onChange={handleChange} placeholder="Salary offered to the candidate" />
        </div>
        <div className="button-container">
          <button type="submit" className="submit-btn">Create Selection</button>
        </div>
      </div>
      {success && <div className="toast show success">Selection Record Created Successfully!</div>}
    </form>
  );
};

export default RecruiterWorkflowSatgeone;
