import React, { useState } from 'react';
import '../FormStyles.css';

const emptyEntry = () => ({
  education_type: '',
  schoolorcollege_name: '',
  specialization: '',
  start_date: '',
  end_date: '',
  marks_grade: '',
  university: '',
  city: '',
  state: '',
  mode_of_education: '',
  certificate: null,
});

const educationTypeOptions = [
  'SSC', 'HSC', 'Diploma', "Bachelor's", "Master's", 'PhD'
];

const EducationDetails = () => {
  const [entries, setEntries] = useState([emptyEntry()]);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (idx, e) => {
    const { name, value, type, files } = e.target;
    setEntries((prev) => prev.map((entry, i) =>
      i === idx
        ? { ...entry, [name]: type === 'file' ? files[0] : value }
        : entry
    ));
  };

  const addEntry = () => {
    setEntries((prev) => [...prev, emptyEntry()]);
    setErrors([]);
  };

  const removeEntry = (idx) => {
    setEntries((prev) => prev.filter((_, i) => i !== idx));
    setErrors((prev) => prev.filter((_, i) => i !== idx));
  };

  const validate = () => {
    const newErrors = entries.map(entry => {
      const err = {};
      if (!entry.education_type) err.education_type = 'Required';
      if (!entry.schoolorcollege_name) err.schoolorcollege_name = 'Required';
      if (!entry.start_date) err.start_date = 'Required';
      if (!entry.end_date) err.end_date = 'Required';
      if (!entry.city) err.city = 'Required';
      if (!entry.state) err.state = 'Required';
      return err;
    });
    setErrors(newErrors);
    return newErrors.every(e => Object.keys(e).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entries.length === 0) {
      setErrors([{}]);
      return;
    }
    if (!validate()) return;
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setEntries([emptyEntry()]);
    setErrors([]);
  };

  return (
    <form className="education-details-form" onSubmit={handleSubmit} autoComplete="off">
      <h2>Education Details</h2>
      {entries.map((entry, idx) => (
        <div className="education-entry" key={idx}>
          {entries.length > 1 && (
            <button type="button" className="remove-btn" title="Remove this entry" onClick={() => removeEntry(idx)}>&times;</button>
          )}
          <div className="form-grid">
            <div className="form-group">
              <label>Education Type</label>
              <select name="education_type" value={entry.education_type} onChange={e => handleChange(idx, e)} required>
                <option value="" disabled>Select type</option>
                {educationTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>School/College Name</label>
              <input type="text" name="schoolorcollege_name" value={entry.schoolorcollege_name} onChange={e => handleChange(idx, e)} required />
            </div>
            <div className="form-group">
              <label>Mode of Education</label>
              <select name="mode_of_education" value={entry.mode_of_education} onChange={e => handleChange(idx, e)} required>
                <option value="" disabled>Select mode</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time/Correspondence">Part Time/Correspondence</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Specialization</label>
              <input type="text" name="specialization" value={entry.specialization} onChange={e => handleChange(idx, e)} placeholder="e.g., Computer Science" />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input type="date" name="start_date" value={entry.start_date} onChange={e => handleChange(idx, e)} required />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input type="date" name="end_date" value={entry.end_date} onChange={e => handleChange(idx, e)} required />
            </div>
            <div className="form-group">
              <label>Marks/Grade</label>
              <input type="text" name="marks_grade" value={entry.marks_grade} onChange={e => handleChange(idx, e)} placeholder="e.g., 85% or 8.5 CGPA" />
            </div>
            <div className="form-group full-width">
              <label>University</label>
              <input type="text" name="university" value={entry.university} onChange={e => handleChange(idx, e)} placeholder="Name of the affiliating university" />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" name="city" value={entry.city} onChange={e => handleChange(idx, e)} required />
            </div>
            <div className="form-group">
              <label>State</label>
              <input type="text" name="state" value={entry.state} onChange={e => handleChange(idx, e)} required />
            </div>
            <div className="form-group">
              <label>Certificate (Upload)</label>
              <input type="file" name="certificate" accept="application/pdf,image/*" onChange={e => handleChange(idx, e)} />
              {entry.certificate && <span className="file-name">{entry.certificate.name}</span>}
            </div>
          </div>
        </div>
      ))}
      <div className="button-container">
        <button type="button" className="add-btn" onClick={addEntry}>Add More Education</button>
      </div>
      <div>
        <button type="submit" className="submit-btn">Save All Education Details</button>
      </div>
      {success && <div className="toast show success">Successfully saved {entries.length} education entr{entries.length === 1 ? 'y' : 'ies'}!</div>}
    </form>
  );
};

export default EducationDetails;
