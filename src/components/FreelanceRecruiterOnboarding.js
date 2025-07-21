import React, { useState } from 'react';
import '../FormStyles.css';

const initialForm = {
  // Section 1: Personal Details
  fullName: '',
  email: '',
  mobile: '',
  altContact: '',
  linkedIn: '',
  cityState: '',
  preferredCommTime: '',
  // Section 2: Experience & Skills
  totalExp: '',
  coreAreas: '',
  coreAreasList: [],
  keySkills: '',
  keySkillsList: [],
  industries: '',
  industriesList: [],
  hiringTypes: [],
  recruitmentTools: '',
  recruitmentToolsList: [],
  languages: '',
  languagesList: [],
  // Section 3: Availability & Commitment
  dailyHours: '',
  daysPerWeek: '',
  exclusive: '',
  positionsHandle: '',
  // Section 4: Commercials & Payout
  payoutPercent: '',
  paymentMode: '',
  payoutTerms: '',
  gstRegistered: '',
  panNumber: '',
  upiOrBank: '',
  // Section 5: Document Submission
  panCard: null,
  resume: null,
  certifications: null,
  nda: null,
  // Section 6: Declaration
  declaration: false,
  signature: '',
  date: '',
};

const FreelanceRecruiterOnboarding = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleHiringTypeChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      let arr = prev.hiringTypes.slice();
      if (checked) {
        if (!arr.includes(value)) arr.push(value);
      } else {
        arr = arr.filter((v) => v !== value);
      }
      return { ...prev, hiringTypes: arr };
    });
  };

  // Add/Remove handlers for multi-entry fields
  const handleAddToList = (field, listField) => {
    if (form[field] && !form[listField].includes(form[field])) {
      setForm((prev) => ({ ...prev, [listField]: [...prev[listField], prev[field]], [field]: '' }));
    }
  };
  const handleRemoveFromList = (listField, idx) => {
    setForm((prev) => ({ ...prev, [listField]: prev[listField].filter((_, i) => i !== idx) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you can add API call or further validation
  };

  return (
    <form className="modern-form max-w-3xl mx-auto" onSubmit={handleSubmit} autoComplete="off">
      <div style={{ textAlign: 'right', marginBottom: 12 }}>
        <a
          href={process.env.PUBLIC_URL + '/HTMLDOCS/freelance_recruiter_onboarding_docs.html'}
          target="_blank"
          rel="noopener noreferrer"
          className="doc-link-btn"
        >
          View Documentation
        </a>
      </div>
      <h1 className="form-title mb-4">Freelance Recruiter Onboarding Form</h1>
      {/* Section 1: Personal Details */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 1: Personal Details</h2>
        <div className="form-grid">
          <div className="form-group"><label>Full Name:</label><input type="text" name="fullName" value={form.fullName} onChange={handleChange} required /></div>
          <div className="form-group"><label>Email ID:</label><input type="email" name="email" value={form.email} onChange={handleChange} required /></div>
          <div className="form-group"><label>Mobile Number:</label><input type="tel" name="mobile" value={form.mobile} onChange={handleChange} required /></div>
          <div className="form-group"><label>Alternate Contact Number:</label><input type="tel" name="altContact" value={form.altContact} onChange={handleChange} /></div>
          <div className="form-group"><label>LinkedIn Profile:</label><input type="url" name="linkedIn" value={form.linkedIn} onChange={handleChange} /></div>
          <div className="form-group"><label>City and State:</label><input type="text" name="cityState" value={form.cityState} onChange={handleChange} /></div>
          <div className="form-group"><label>Preferred Communication Time:</label><input type="text" name="preferredCommTime" value={form.preferredCommTime} onChange={handleChange} /></div>
        </div>
      </div>
      {/* Section 2: Experience & Skills */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 2: Experience & Skills</h2>
        <div className="form-grid">
          <div className="form-group"><label>Total Years of Recruitment Experience:</label><input type="number" name="totalExp" value={form.totalExp} onChange={handleChange} min="0" /></div>
          {/* Core Areas of Expertise */}
          <div className="form-group">
            <label>Core Areas of Expertise:</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" name="coreAreas" value={form.coreAreas} onChange={handleChange} placeholder="e.g., IT, Non-IT, Sales, Healthcare" />
              <button type="button" onClick={() => handleAddToList('coreAreas', 'coreAreasList')}>Add</button>
            </div>
            <div className="multi-list">
              {form.coreAreasList.map((item, idx) => (
                <span key={idx} className="multi-list-item">{item} <button type="button" onClick={() => handleRemoveFromList('coreAreasList', idx)}>&times;</button></span>
              ))}
            </div>
          </div>
          {/* Key Skills / Technologies */}
          <div className="form-group">
            <label>Key Skills / Technologies:</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" name="keySkills" value={form.keySkills} onChange={handleChange} />
              <button type="button" onClick={() => handleAddToList('keySkills', 'keySkillsList')}>Add</button>
            </div>
            <div className="multi-list">
              {form.keySkillsList.map((item, idx) => (
                <span key={idx} className="multi-list-item">{item} <button type="button" onClick={() => handleRemoveFromList('keySkillsList', idx)}>&times;</button></span>
              ))}
            </div>
          </div>
          {/* Industries Comfortable Recruiting For */}
          <div className="form-group">
            <label>Industries Comfortable Recruiting For:</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" name="industries" value={form.industries} onChange={handleChange} />
              <button type="button" onClick={() => handleAddToList('industries', 'industriesList')}>Add</button>
            </div>
            <div className="multi-list">
              {form.industriesList.map((item, idx) => (
                <span key={idx} className="multi-list-item">{item} <button type="button" onClick={() => handleRemoveFromList('industriesList', idx)}>&times;</button></span>
              ))}
            </div>
          </div>
          {/* Recruitment Tools You Use */}
          <div className="form-group">
            <label>Recruitment Tools You Use:</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" name="recruitmentTools" value={form.recruitmentTools} onChange={handleChange} placeholder="e.g., Naukri, LinkedIn, Internal Database" />
              <button type="button" onClick={() => handleAddToList('recruitmentTools', 'recruitmentToolsList')}>Add</button>
            </div>
            <div className="multi-list">
              {form.recruitmentToolsList.map((item, idx) => (
                <span key={idx} className="multi-list-item">{item} <button type="button" onClick={() => handleRemoveFromList('recruitmentToolsList', idx)}>&times;</button></span>
              ))}
            </div>
          </div>
          {/* Languages Known */}
          <div className="form-group">
            <label>Languages Known:</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" name="languages" value={form.languages} onChange={handleChange} />
              <button type="button" onClick={() => handleAddToList('languages', 'languagesList')}>Add</button>
            </div>
            <div className="multi-list">
              {form.languagesList.map((item, idx) => (
                <span key={idx} className="multi-list-item">{item} <button type="button" onClick={() => handleRemoveFromList('languagesList', idx)}>&times;</button></span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Types of Hiring You Can Support:</label>
            <div className="checkbox-group">
              <label><input type="checkbox" name="hiringTypes" value="Permanent" checked={form.hiringTypes.includes('Permanent')} onChange={handleHiringTypeChange} /> Permanent</label>
              <label><input type="checkbox" name="hiringTypes" value="Contract" checked={form.hiringTypes.includes('Contract')} onChange={handleHiringTypeChange} /> Contract</label>
              <label><input type="checkbox" name="hiringTypes" value="Both" checked={form.hiringTypes.includes('Both')} onChange={handleHiringTypeChange} /> Both</label>
            </div>
          </div>
        </div>
      </div>
      {/* Section 3: Availability & Commitment */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 3: Availability & Commitment</h2>
        <div className="form-grid">
          <div className="form-group"><label>Daily Hours You Can Commit:</label><input type="number" name="dailyHours" value={form.dailyHours} onChange={handleChange} min="0" /></div>
          <div className="form-group"><label>Days per Week Available:</label><input type="number" name="daysPerWeek" value={form.daysPerWeek} onChange={handleChange} min="0" max="7" /></div>
          <div className="form-group"><label>Willing to Work on Exclusive Assignments?</label>
            <select name="exclusive" value={form.exclusive} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group"><label>Number of Positions You Can Handle at One Time:</label><input type="number" name="positionsHandle" value={form.positionsHandle} onChange={handleChange} min="1" /></div>
        </div>
      </div>
      {/* Section 4: Commercials & Payout */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 4: Commercials & Payout</h2>
        <div className="form-grid">
          <div className="form-group"><label>Expected Payout Per Closure (%):</label><input type="number" name="payoutPercent" value={form.payoutPercent} onChange={handleChange} min="0" max="100" /></div>
          <div className="form-group"><label>Preferred Payment Mode:</label>
            <select name="paymentMode" value={form.paymentMode} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
          <div className="form-group"><label>Payout Terms:</label><input type="text" name="payoutTerms" value={form.payoutTerms} onChange={handleChange} placeholder="e.g., 30 Days After Candidate Joining" /></div>
          <div className="form-group"><label>GST Registered?</label>
            <select name="gstRegistered" value={form.gstRegistered} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group"><label>PAN Number:</label><input type="text" name="panNumber" value={form.panNumber} onChange={handleChange} /></div>
          <div className="form-group"><label>UPI ID / Bank Account Details:</label><input type="text" name="upiOrBank" value={form.upiOrBank} onChange={handleChange} /></div>
        </div>
      </div>
      {/* Section 5: Document Submission */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 5: Document Submission</h2>
        <div className="form-grid">
          <div className="form-group"><label>PAN Card:</label><input type="file" name="panCard" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} /></div>
          <div className="form-group"><label>Resume:</label><input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} /></div>
          <div className="form-group"><label>Certifications (if any):</label><input type="file" name="certifications" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} /></div>
          <div className="form-group"><label>Signed NDA:</label><input type="file" name="nda" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} /></div>
        </div>
      </div>
      {/* Section 6: Declaration */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 6: Declaration</h2>
        <div className="form-group">
          <label>
            <input type="checkbox" name="declaration" checked={form.declaration} onChange={handleChange} required />
            I hereby confirm that all the information provided above is true and correct to the best of my knowledge. I agree to maintain confidentiality of all client and job-related information.
          </label>
        </div>
         <div className="form-group"><label>Signature:</label><input type="file" name="signature"  value={form.signature} onChange={handleChange} accept=".pdf,.jpg,.jpeg,.png"  /></div>

        <div className="form-group"><label>Date:</label><input type="date" name="date" value={form.date} onChange={handleChange} required /></div>
      </div>
      <div className="form-group text-right mt-4">
        <button type="submit" className="submit-btn">Submit</button>
      </div>
      {submitted && <div className="success-text mt-4">Form submitted successfully!</div>}
    </form>
  );
};

export default FreelanceRecruiterOnboarding; 