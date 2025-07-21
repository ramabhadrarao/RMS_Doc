import React, { useState } from 'react';
import '../FormStyles.css';

const initialForm = {
  // Section 1: Company Details
  companyName: '',
  registeredBusinessName: '',
  businessType: '',
  yearOfEstablishment: '',
  gstNumber: '',
  panNumber: '',
  registeredAddress: '',
  officeAddress: '',
  website: '',
  msmeNumber: '',
  // Section 2: Contact Details
  primaryContact: '',
  designation: '',
  email: '',
  mobile: '',
  altContactPerson: '',
  altContactNumber: '',
  linkedIn: '',
  // Section 3: Recruitment Capability Overview
  keySkills: '',
  keySkillsList: [],
  industries: '',
  industriesList: [],
  interestedIn: '',
  geoCoverage: '',
  candidateTypes: '',
  monthlyCapacity: '',
  turnaroundTime: '',
  // Section 4: Current Client Engagements
  clientName: '',
  engagementType: '',
  teamSize: '',
  referenceContact: '',
  // Section 5: Past Performance & KPIs
  avgMonthlyClosures: '',
  repeatBusiness: '',
  clientSatisfaction: '',
  // Section 6: Team Information
  numRecruiters: '',
  expRange: '',
  recruiterLevels: '',
  recruitmentTools: '',
  recruitmentToolsList: [],
  atsCrm: '',
  techStack: '',
  // Section 7: Commercials & Terms
  permHiringFee: '',
  replacementPeriod: '',
  contractBillingRate: '',
  paymentTerms: '',
  invoiceRaisedAfter: '',
  penaltyClauses: '',
  // Section 8: Compliance & Documentation
  panCard: '',
  gstCert: '',
  cancelledCheque: '',
  companyRegCert: '',
  ndaAgreement: '',
  bankDetailsLetter: '',
  pendingLegalCases: '',
  // Section 9: Bank Account Details
  bankName: '',
  accountHolder: '',
  accountNumber: '',
  ifsc: '',
  branchAddress: '',
  // Section 10: Declaration
  signatoryName: '',
  signatoryDesignation: '',
  declarationDate: '',
  companySeal: '',
};

const AgencyOnboarding = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  // Add/Remove handlers for multi-entry fields
  const handleAddToList = (field, listField) => {
    if (form[field] && !form[listField].includes(form[field])) {
      setForm((prev) => ({ ...prev, [listField]: [...prev[listField], prev[field]], [field]: '' }));
    }
  };
  const handleRemoveFromList = (listField, idx) => {
    setForm((prev) => ({ ...prev, [listField]: prev[listField].filter((_, i) => i !== idx) }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked ? 'Yes' : 'No' }));
    } else if (type === 'file') {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Add API call or further validation here
  };

  return (
    <form className="modern-form max-w-3xl mx-auto" onSubmit={handleSubmit} autoComplete="off">
      <div style={{ textAlign: 'right', marginBottom: 12 }}>
        <a
          href={process.env.PUBLIC_URL + '/HTMLDOCS/agency_onboarding_docs.html'}
          target="_blank"
          rel="noopener noreferrer"
          className="doc-link-btn"
        >
          View Documentation
        </a>
      </div>
      <h1 className="form-title mb-4">Agency Onboarding Form</h1>
      {/* Section 1: Company Details */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 1: Company Details</h2>
        <div className="form-grid">
          <div className="form-group"><label>Company Name:</label><input type="text" name="companyName" value={form.companyName} onChange={handleChange} required /></div>
          <div className="form-group"><label>Registered Business Name (if different):</label><input type="text" name="registeredBusinessName" value={form.registeredBusinessName} onChange={handleChange} /></div>
          <div className="form-group"><label>Business Type:</label><input type="text" name="businessType" value={form.businessType} onChange={handleChange} placeholder="Proprietorship / Partnership / Pvt Ltd / LLP / Other" /></div>
          <div className="form-group"><label>Year of Establishment:</label><input type="number" name="yearOfEstablishment" value={form.yearOfEstablishment} onChange={handleChange} /></div>
          <div className="form-group"><label>GST Number:</label><input type="text" name="gstNumber" value={form.gstNumber} onChange={handleChange} /></div>
          <div className="form-group"><label>PAN Number:</label><input type="text" name="panNumber" value={form.panNumber} onChange={handleChange} /></div>
          <div className="form-group"><label>Registered Address:</label><input type="text" name="registeredAddress" value={form.registeredAddress} onChange={handleChange} /></div>
          <div className="form-group"><label>Office Address (if different):</label><input type="text" name="officeAddress" value={form.officeAddress} onChange={handleChange} /></div>
          <div className="form-group"><label>Website:</label><input type="url" name="website" value={form.website} onChange={handleChange} /></div>
          <div className="form-group"><label>MSME / Udyam Registration Number:</label><input type="text" name="msmeNumber" value={form.msmeNumber} onChange={handleChange} /></div>
        </div>
      </div>
      {/* Section 2: Contact Details */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 2: Contact Details</h2>
        <div className="form-grid">
          <div className="form-group"><label>Primary Contact Person Name:</label><input type="text" name="primaryContact" value={form.primaryContact} onChange={handleChange} /></div>
          <div className="form-group"><label>Designation:</label><input type="text" name="designation" value={form.designation} onChange={handleChange} /></div>
          <div className="form-group"><label>Email ID:</label><input type="email" name="email" value={form.email} onChange={handleChange} /></div>
          <div className="form-group"><label>Mobile Number:</label><input type="tel" name="mobile" value={form.mobile} onChange={handleChange} /></div>
          <div className="form-group"><label>Alternate Contact Person (Optional):</label><input type="text" name="altContactPerson" value={form.altContactPerson} onChange={handleChange} /></div>
          <div className="form-group"><label>Alternate Contact Number:</label><input type="tel" name="altContactNumber" value={form.altContactNumber} onChange={handleChange} /></div>
          <div className="form-group"><label>LinkedIn Profile (Optional):</label><input type="url" name="linkedIn" value={form.linkedIn} onChange={handleChange} /></div>
        </div>
      </div>
      {/* Section 3: Recruitment Capability Overview */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 3: Recruitment Capability Overview</h2>
        <div className="form-grid">
          {/* Key Skills (multi-entry) */}
          <div className="form-group">
            <label>Key Skills You Specialize In:</label>
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
          {/* Industries (multi-entry) */}
          <div className="form-group">
            <label>Industries You Serve:</label>
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
          <div className="form-group"><label>Interested In:</label>
            <select name="interestedIn" value={form.interestedIn} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
              <option value="Both">Both</option>
            </select>
          </div>
          <div className="form-group"><label>Geographical Coverage:</label><input type="text" name="geoCoverage" value={form.geoCoverage} onChange={handleChange} /></div>
          <div className="form-group"><label>Candidate Types Provided:</label><input type="text" name="candidateTypes" value={form.candidateTypes} onChange={handleChange} placeholder="Fresher / Lateral / Executive" /></div>
          <div className="form-group"><label>Monthly Capacity to Submit Profiles:</label><input type="number" name="monthlyCapacity" value={form.monthlyCapacity} onChange={handleChange} /></div>
          <div className="form-group"><label>Turnaround Time After JD Shared:</label><input type="text" name="turnaroundTime" value={form.turnaroundTime} onChange={handleChange} /></div>
        </div>
      </div>
      {/* Section 4: Current Client Engagements */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 4: Current Client Engagements</h2>
        <div className="form-grid">
          <div className="form-group"><label>Client Name:</label><input type="text" name="clientName" value={form.clientName} onChange={handleChange} /></div>
          <div className="form-group"><label>Engagement Type:</label><input type="text" name="engagementType" value={form.engagementType} onChange={handleChange} placeholder="Full-time / Contract / Both" /></div>
          <div className="form-group"><label>Team Size Deployed / Supported:</label><input type="number" name="teamSize" value={form.teamSize} onChange={handleChange} /></div>
          <div className="form-group"><label>Reference Contact (Optional):</label><input type="text" name="referenceContact" value={form.referenceContact} onChange={handleChange} /></div>
        </div>
      </div>
      {/* Section 5: Past Performance & KPIs */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 5: Past Performance & KPIs</h2>
        <div className="form-grid">
          <div className="form-group"><label>Average Monthly Closures:</label><input type="number" name="avgMonthlyClosures" value={form.avgMonthlyClosures} onChange={handleChange} /></div>
          <div className="form-group"><label>Repeat Business Percentage:</label><input type="number" name="repeatBusiness" value={form.repeatBusiness} onChange={handleChange} min="0" max="100" /></div>
          <div className="form-group"><label>Client Satisfaction Score (Optional):</label><input type="number" name="clientSatisfaction" value={form.clientSatisfaction} onChange={handleChange} min="0" max="10" /></div>
        </div>
      </div>
      {/* Section 6: Team Information */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 6: Team Information</h2>
        <div className="form-grid">
          <div className="form-group"><label>Number of Recruiters in Team:</label><input type="number" name="numRecruiters" value={form.numRecruiters} onChange={handleChange} /></div>
          <div className="form-group"><label>Recruiters’ Experience Range:</label><input type="text" name="expRange" value={form.expRange} onChange={handleChange} /></div>
          <div className="form-group"><label>Recruiter Levels (Jr / Mid / Sr):</label><input type="text" name="recruiterLevels" value={form.recruiterLevels} onChange={handleChange} /></div>
          {/* Recruitment Tools (multi-entry) */}
          <div className="form-group">
            <label>Recruitment Tools Used:</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" name="recruitmentTools" value={form.recruitmentTools} onChange={handleChange} />
              <button type="button" onClick={() => handleAddToList('recruitmentTools', 'recruitmentToolsList')}>Add</button>
            </div>
            <div className="multi-list">
              {form.recruitmentToolsList.map((item, idx) => (
                <span key={idx} className="multi-list-item">{item} <button type="button" onClick={() => handleRemoveFromList('recruitmentToolsList', idx)}>&times;</button></span>
              ))}
            </div>
          </div>
          <div className="form-group"><label>ATS / CRM Used:</label><input type="text" name="atsCrm" value={form.atsCrm} onChange={handleChange} /></div>
          <div className="form-group"><label>Tech Stack Specialization:</label><input type="text" name="techStack" value={form.techStack} onChange={handleChange} /></div>
        </div>
      </div>
      {/* Section 7: Commercials & Terms */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 7: Commercials & Terms</h2>
        <div className="form-grid">
          <div className="form-group"><label>Permanent Hiring Fee %:</label><input type="number" name="permHiringFee" value={form.permHiringFee} onChange={handleChange} min="0" max="100" /></div>
          <div className="form-group"><label>Replacement Period (Days):</label><input type="number" name="replacementPeriod" value={form.replacementPeriod} onChange={handleChange} /></div>
          <div className="form-group"><label>Contract Resource Billing Rate (if applicable):</label><input type="text" name="contractBillingRate" value={form.contractBillingRate} onChange={handleChange} /></div>
          <div className="form-group"><label>Payment Terms:</label><input type="text" name="paymentTerms" value={form.paymentTerms} onChange={handleChange} placeholder="e.g., 30 Days from Joining" /></div>
          <div className="form-group"><label>Invoice Raised After:</label>
            <select name="invoiceRaisedAfter" value={form.invoiceRaisedAfter} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Joining">Joining</option>
              <option value="15 Days">15 Days</option>
              <option value="30 Days">30 Days</option>
            </select>
          </div>
          <div className="form-group"><label>Any Penalty or Bonus Clauses:</label><input type="text" name="penaltyClauses" value={form.penaltyClauses} onChange={handleChange} /></div>
        </div>
      </div>
      {/* Section 8: Compliance & Documentation */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 8: Compliance & Documentation</h2>
        <div className="form-grid">
          <div className="form-group"><label>PAN Card:</label>
            <select name="panCard" value={form.panCard} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group"><label>GST Certificate:</label>
            <select name="gstCert" value={form.gstCert} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group"><label>Cancelled Cheque:</label>
            <select name="cancelledCheque" value={form.cancelledCheque} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group"><label>Company Registration Certificate:</label>
            <select name="companyRegCert" value={form.companyRegCert} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group"><label>Signed NDA/Agreement:</label>
            <select name="ndaAgreement" value={form.ndaAgreement} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group"><label>Bank Details on Letterhead:</label>
            <select name="bankDetailsLetter" value={form.bankDetailsLetter} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group"><label>Any Pending Legal Cases:</label>
            <select name="pendingLegalCases" value={form.pendingLegalCases} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </div>
      {/* Section 9: Bank Account Details */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 9: Bank Account Details</h2>
        <div className="form-grid">
          <div className="form-group"><label>Bank Name:</label><input type="text" name="bankName" value={form.bankName} onChange={handleChange} /></div>
          <div className="form-group"><label>Account Holder Name:</label><input type="text" name="accountHolder" value={form.accountHolder} onChange={handleChange} /></div>
          <div className="form-group"><label>Account Number:</label><input type="text" name="accountNumber" value={form.accountNumber} onChange={handleChange} /></div>
          <div className="form-group"><label>IFSC Code:</label><input type="text" name="ifsc" value={form.ifsc} onChange={handleChange} /></div>
          <div className="form-group"><label>Branch Address:</label><input type="text" name="branchAddress" value={form.branchAddress} onChange={handleChange} /></div>
        </div>
      </div>
      {/* Section 10: Declaration */}
      <div className="form-section">
        <h2 className="form-section-heading">Section 10: Declaration</h2>
        <div className="form-grid">
          <div className="form-group"><label>Authorized Signatory Name:</label><input type="text" name="signatoryName" value={form.signatoryName} onChange={handleChange} /></div>
          <div className="form-group"><label>Designation:</label><input type="text" name="signatoryDesignation" value={form.signatoryDesignation} onChange={handleChange} /></div>
          <div className="form-group"><label>Date:</label><input type="date" name="declarationDate" value={form.declarationDate} onChange={handleChange} /></div>
          <div className="form-group"><label>Company Seal / Digital Signature:</label><input type="text" name="companySeal" value={form.companySeal} onChange={handleChange} /></div>
        </div>
      </div>
      <div className="form-group text-right mt-4">
        <button type="submit" className="submit-btn">Submit</button>
      </div>
      {submitted && <div className="success-text mt-4">Form submitted successfully!</div>}
    </form>
  );
};

export default AgencyOnboarding; 