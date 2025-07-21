import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import '../FormStyles.css';
import AddclientsATS from './AddclientsATS';
import LeavePolicyForm from './LeavePolicyForclients';
import Select from 'react-select';

const initialClientForm = {
  clientName: 'TCS',
  contract: true,
  permanent: false,
  address: '',
  billingAddress: '',
  gstNumber: '',
  paymentTerms: '',
  timesheetType: 'Day',
  timesheetCutoff: '',
  billingRule: 'Per day',
  // Documents for Candidates
  candidateDocuments: [{
    file: null,
    name: '',
    validity: false,
    startDate: '',
    endDate: ''
  }],
  // Documents for Clients
  clientDocuments: [{
    file: null,
    name: '',
    validity: false,
    startDate: '',
    endDate: ''
  }],
  workingHoursPerDay: '',
  timesheetFillingType: 'portal', // 'portal' or 'manual'
  portalName: '',
  remarks: '',
};

const initialSpocForm = {
  spocClientID: '',
  spocName: '',
  spocEmail: '',
  spocMobile: '',
  spocLocation: '',
  spocDesignation: '',
  spocStatus: 'Active',
  spocFunctionalRoles: [],
  spocAccountsHandled: [],
};

const functionalRolesOptions = [
  { value: 'Accounts', label: 'Accounts' },
  { value: 'Technical', label: 'Technical' },
  { value: 'Legal', label: 'Legal' },
  { value: 'HR', label: 'HR' },
  { value: 'Management', label: 'Management' },
];
const accountsHandledOptions = [
  { value: 'Project A', label: 'Project A' },
  { value: 'Project B', label: 'Project B' },
  { value: 'Unit X', label: 'Unit X' },
];

const ClientDetailsForm = () => {
  // Years for each education level (can be customized)
  const educationYears = {
    ssc: 10,
    intermediate: 2,
    diploma: 3,
    graduation: 3,
    pg: 2,
  };

  // Minimum education and remarks state
  const [minEducation, setMinEducation] = useState('');
  const [policyRemarks, setPolicyRemarks] = useState('');
  const [employmentPolicyNotes, setEmploymentPolicyNotes] = useState('');
  const [blocklistedCompaniesFile, setBlocklistedCompaniesFile] = useState(null);
  const [blocklistedUniversitiesFile, setBlocklistedUniversitiesFile] = useState(null);
  const [clientForm, setClientForm] = useState(initialClientForm);
  const [spocForm, setSpocForm] = useState([initialSpocForm]);
  const [clientErrors, setClientErrors] = useState({});
  const [spocErrors, setSpocErrors] = useState({});
  const [success, setSuccess] = useState('');
  // Education Policy State
  const educationLevels = [
    { key: 'ssc', label: 'SSC' },
    { key: 'intermediate', label: 'Intermediate' },
    { key: 'diploma', label: 'Diploma' },
    { key: 'graduation', label: 'Graduation' },
    { key: 'pg', label: 'PG' },
  ];
  const studyTypes = [
    { value: 'both', label: 'Both' },
    { value: 'regular', label: 'Regular' },
    { value: 'correspondence', label: 'Correspondence' },
  ];
  const [interviewPolicy, setInterviewPolicy] = useState({
    ssc: 'both',
    intermediate: 'both',
    diploma: 'both',
    graduation: 'both',
    pg: 'both',
  });

  const handleInterviewPolicyChange = (levelKey, typeValue) => {
    setInterviewPolicy((prev) => ({ ...prev, [levelKey]: typeValue }));
  };

  // Client Form Handlers
  const handleClientChange = (e, index, docType) => {
    const { name, value, type, checked, files } = e.target;

    if (docType) {
      setClientForm((prev) => {
        const updatedDocuments = [...prev[`${docType}Documents`]];
        if (type === 'checkbox') {
          updatedDocuments[index] = { ...updatedDocuments[index], [name]: checked };
        } else if (type === 'file') {
          updatedDocuments[index] = { ...updatedDocuments[index], [name]: files[0] };
        } else {
          updatedDocuments[index] = { ...updatedDocuments[index], [name]: value };
        }
        return { ...prev, [`${docType}Documents`]: updatedDocuments };
      });
    } else if (type === 'checkbox') {
      setClientForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setClientForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setClientForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addDocument = (docType) => {
    setClientForm((prev) => ({
      ...prev,
      [`${docType}Documents`]: [
        ...prev[`${docType}Documents`],
        { file: null, name: '', validity: false, startDate: '', endDate: '' },
      ],
    }));
  };

  const removeDocument = (index, docType) => {
    setClientForm((prev) => {
      const updatedDocuments = prev[`${docType}Documents`].filter((_, i) => i !== index);
      return { ...prev, [`${docType}Documents`]: updatedDocuments };
    });
  };

  const addSpoc = () => {
    setSpocForm((prev) => [...prev, initialSpocForm]);
  };

  const removeSpoc = (index) => {
    setSpocForm((prev) => prev.filter((_, i) => i !== index));
  };

  // SPOC Form Handlers
  const handleSpocChange = (e, index) => {
    const { name, value, type, options } = e.target;
    setSpocForm((prev) =>
      prev.map((spoc, i) => {
        if (i === index) {
          if (type === 'select-multiple') {
            const selected = Array.from(options)
              .filter((o) => o.selected)
              .map((o) => o.value);
            return { ...spoc, [name]: selected };
          } else {
            return { ...spoc, [name]: value };
          }
        }
        return spoc;
      })
    );
  };

  // New handler for react-select
  const handleSpocSelectChange = (selected, { name }, index) => {
    setSpocForm((prev) =>
      prev.map((spoc, i) => {
        if (i === index) {
          return { ...spoc, [name]: selected ? selected.map((opt) => opt.value) : [] };
        }
        return spoc;
      })
    );
  };

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (allowedTypes.includes(file.type) && file.size <= maxSize) {
        setFile(file);
      } else {
        alert('Invalid file type or size. Allowed types: PDF, DOC, DOCX. Max size: 5MB');
        e.target.value = null;
      }
    }
  };

  const validateForm = () => {
    const newClientErrors = {};
    const newSpocErrors = {};

    if (!clientForm.clientName) newClientErrors.clientName = 'Client Name is required';
    // Add other client form validations here if needed

    if (!spocForm.spocName) newSpocErrors.spocName = 'SPOC Name is required';
    if (!spocForm.spocEmail) newSpocErrors.spocEmail = 'Email is required';
    if (!spocForm.spocStatus) newSpocErrors.spocStatus = 'Status is required';
    if (!spocForm.spocFunctionalRoles.length) newSpocErrors.spocFunctionalRoles = 'At least one functional role is required';

    setClientErrors(newClientErrors);
    setSpocErrors(newSpocErrors);

    return Object.keys(newClientErrors).length === 0 && Object.keys(newSpocErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccess('Client and SPOC details saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
      setClientForm(initialClientForm);
      setSpocForm(initialSpocForm);
    } else {
      setSuccess('');
    }
  };

const renderDocumentSection = (docType) => {
  const prefix = docType === 'candidate' ? 'candidate' : 'client';
  const documents = clientForm[`${prefix}Documents`];

  return (
    <>
      {documents.map((doc, index) => (
        <div key={index} className="document-entry" style={{ position: 'relative', marginBottom: '1rem' }}>
          {/* Remove Icon in top-right corner */}
          {documents.length > 1 && (
            <RemoveIcon
              style={{
                cursor: 'pointer',
                fontSize: '1.8rem',
                color: 'red',
                position: 'absolute',
                top: '-1rem',
                right: '0.5rem',
                zIndex: 2
              }}
              onClick={() => removeDocument(index, docType)}
              titleAccess="Remove document"
            />
          )}
          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', alignItems: 'center', gap: '1rem' }}>
            {/* Upload Document */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Upload Document</label>
              <label className="btn btn-upload" style={{ cursor: 'pointer', padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', textAlign: 'center' }}>
                Choose File
                <input
                  type="file"
                  name="file"
                  style={{ display: 'none' }}
                  onChange={(e) => handleClientChange(e, index, docType)}
                />
              </label>
              {doc.file && <span className="file-name" style={{ marginTop: '0.5rem' }}>{doc.file.name}</span>}
            </div>

            {/* Document Name */}
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor={`${prefix}DocumentName-${index}`}>Document Name</label>
              <input
                type="text"
                id={`${prefix}DocumentName-${index}`}
                name="name"
                value={doc.name}
                onChange={(e) => handleClientChange(e, index, docType)}
                placeholder="e.g., NDA, Service Agreement"
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>

            {/* Validity Checkbox - compact inline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="checkbox"
                id={`${prefix}DocumentValidity-${index}`}
                name="validity"
                checked={doc.validity}
                onChange={(e) => handleClientChange(e, index, docType)}
                style={{ width: '1.1em', height: '1.1em', accentColor: '#2563eb', margin: 0 }}
              />
              <label htmlFor={`${prefix}DocumentValidity-${index}`} style={{ fontSize: '0.97em', margin: 0, fontWeight: 500, color: '#4b5563', cursor: 'pointer' }}>Validity</label>
            </div>

            {/* Validity Dates - always in the same row */}
            <div style={{ display: 'contents' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', opacity: doc.validity ? 1 : 0.5 }}>
                <label htmlFor={`${prefix}DocumentStartDate-${index}`}>Start Date</label>
                <input
                  type="date"
                  id={`${prefix}DocumentStartDate-${index}`}
                  name="startDate"
                  value={doc.startDate}
                  onChange={(e) => handleClientChange(e, index, docType)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                  disabled={!doc.validity}
                />
              </div>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', opacity: doc.validity ? 1 : 0.5 }}>
                <label htmlFor={`${prefix}DocumentEndDate-${index}`}>End Date</label>
                <input
                  type="date"
                  id={`${prefix}DocumentEndDate-${index}`}
                  name="endDate"
                  value={doc.endDate}
                  min={doc.startDate}
                  onChange={(e) => handleClientChange(e, index, docType)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                  disabled={!doc.validity}
                />
              </div>
            </div>

         
          </div>
          <hr />
        </div>
      ))}

      {/* Add Icon */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-0.5rem' }}>
        <AddIcon
          style={{ cursor: 'pointer', fontSize: '2.5rem', color: 'blue' }}
          onClick={() => addDocument(docType)}
        />
      </div>
    </>
  );
};

return (
  <div className="client-details-form modern-form max-w-4xl mx-auto">
    <AddclientsATS />

      <form onSubmit={handleSubmit} autoComplete="off">
     
        <div className="form-section">
          <h3 className="form-section-heading">Client & Address Details</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="address" className="field-label">Address</label>
              <textarea id="address" name="address" rows={3} value={clientForm.address} onChange={handleClientChange} placeholder="Client's primary address" />
            </div>
            <div className="form-group full-width">
              <label htmlFor="billingAddress" className="field-label">Billing Address</label>
              <textarea id="billingAddress" name="billingAddress" rows={3} value={clientForm.billingAddress} onChange={handleClientChange} placeholder="Address for billing/invoicing" />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-heading">Billing Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="gstNumber" className="field-label">GST Number</label>
              <input type="text" id="gstNumber" name="gstNumber" value={clientForm.gstNumber} onChange={handleClientChange} placeholder="Client's GST number" />
            </div>
            <div className="form-group">
              <label htmlFor="paymentTerms" className="field-label">Invoice Payment Terms (days)</label>
              <input type="number" id="paymentTerms" name="paymentTerms" value={clientForm.paymentTerms} onChange={handleClientChange} placeholder="e.g., 30, 45, 60" />
            </div>
            <div className="form-group">
              <label htmlFor="billingRule" className="field-label">Billing Rule</label>
              <select id="billingRule" name="billingRule" value={clientForm.billingRule} onChange={handleClientChange}>
                <option value="Per day">Per day</option>
                <option value="Per hour">Per hour</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-heading">Timesheet Configuration</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="timesheetType" className="field-label">Timesheet Type</label>
              <select id="timesheetType" name="timesheetType" value={clientForm.timesheetType} onChange={handleClientChange}>
                <option value="Day">Day</option>
                <option value="Hour">Hour</option>
              </select>
            </div>
            {/* Timesheet Filling Type */}
            <div className="form-group">
              <label htmlFor="timesheetFillingType" className="field-label">Timesheet Filling Type</label>
              <select
                id="timesheetFillingType"
                name="timesheetFillingType"
                value={clientForm.timesheetFillingType}
                onChange={handleClientChange}
              >
                <option value="portal">Portal</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            {/* Conditionally render Portal Name or Remarks */}
            {clientForm.timesheetFillingType === 'portal' && (
              <div className="form-group">
                <label htmlFor="portalName" className="field-label">Portal Name</label>
                <input
                  type="text"
                  id="portalName"
                  name="portalName"
                  value={clientForm.portalName}
                  onChange={handleClientChange}
                  placeholder="Enter portal name"
                />
              </div>
            )}
            {clientForm.timesheetType === 'Hour' && (
              <div className="form-group">
                <label htmlFor="workingHoursPerDay" className="field-label">Working hours per day</label>
                <input
                  type="number"
                  id="workingHoursPerDay"
                  name="workingHoursPerDay"
                  min="1"
                  value={clientForm.workingHoursPerDay}
                  onChange={handleClientChange}
                  placeholder="e.g., 8, 10, 12"
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="timesheetCutoff" className="field-label">Timesheet Cutoff Day</label>
              <input type="date" id="timesheetCutoff" name="timesheetCutoff" value={clientForm.timesheetCutoff} onChange={handleClientChange} />
            </div>
            {clientForm.timesheetFillingType === 'manual' && (
              <div className="form-group">
                <label htmlFor="remarks" className="field-label">Remarks</label>
                <input
                  type="text"
                  id="remarks"
                  name="remarks"
                  value={clientForm.remarks}
                  onChange={handleClientChange}
                  placeholder="Enter remarks for manual timesheet filling"
                />
              </div>
            )}
           
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-heading">Documents</h3>
          <h4>For Candidates</h4>
          {renderDocumentSection('candidate')}
          <hr />
          <h4>For Clients</h4>
          {renderDocumentSection('client')}
        </div>


        <div className="form-section">
          <h3 className="form-section-heading">Leave Policy</h3>
          <LeavePolicyForm />
        </div>

        {/* Background Verification Policy Section */}
        <div className="form-section">
          <h3 className="form-section-heading">Background Verification Policy</h3>
          <div className="form-subsection">
            <h4 style={{ marginBottom: '0.5rem' }}>Education Policy</h4>
            <div className="form-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }}>
              {educationLevels.map((level) => (
                <div key={level.key} className="form-group" style={{ minWidth: 120 }}>
                  <label style={{ fontWeight: 500 }}>{level.label}</label>
                  <select
                    value={interviewPolicy[level.key]}
                    onChange={e => handleInterviewPolicyChange(level.key, e.target.value)}
                    style={{ marginTop: '0.3rem', padding: '0.4rem', borderRadius: 4, border: '1px solid #ccc' }}
                  >
                    {studyTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  {/* Years display */}
                  <div style={{ fontSize: '0.95em', color: '#6b7280', marginTop: '0.3rem' }}>
                    Years: <span style={{ fontWeight: 500 }}>{educationYears[level.key]}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Note about Both */}
            <div style={{ marginTop: '0.7rem', color: '#374151', fontSize: '0.98em', fontStyle: 'italic' }}>
           
            </div>
            {/* Education Policy Summary */}
            <div className="interview-policy-summary" style={{ marginTop: '1.2rem', background: '#f3f4f6', padding: '1rem', borderRadius: 8 }}>
              <strong>Selected Education Policy:</strong>
                 <span style={{ background: '#fef3c7', padding: '0.3em 0.7em', borderRadius: '6px', color: '#92400e' }}>
                Note: <strong>Both</strong> represents <strong>Regular</strong> and <strong>Correspondence</strong>.
              </span>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem' }}>
                {educationLevels.map(level => (
                  <li key={level.key} style={{ fontSize: '1em' }}>
                    {level.label}: <span style={{ fontWeight: 500 }}>{studyTypes.find(t => t.value === interviewPolicy[level.key])?.label}</span>
                    {` (Years: ${educationYears[level.key]})`}
                  </li>
                ))}
              </ul>
            </div>
            {/* Minimum Education & Remarks */}
            <div className="form-grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '2rem', marginTop: '1.5rem' }}>
              <div className="form-group">
                <label htmlFor="minEducation" style={{ fontWeight: 500 }}>Minimum Education Required</label>
                <input
                  type="text"
                  id="minEducation"
                  name="minEducation"
                  value={minEducation}
                  onChange={e => setMinEducation(e.target.value)}
                  placeholder="e.g.No of Years"
                  style={{ marginTop: '0.3rem', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc', width: '100%' }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="policyRemarks" style={{ fontWeight: 500 }}>Remarks / Policy Notes</label>
                <textarea
                  id="policyRemarks"
                  name="policyRemarks"
                  value={policyRemarks}
                  onChange={e => setPolicyRemarks(e.target.value)}
                  rows={3}
                  placeholder="Write any specific policy or remarks here..."
                  style={{ marginTop: '0.3rem', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc', width: '100%' }}
                />
              </div>
            </div>
          </div>
                {/* Employment Policy Section */}
                <div className="form-subsection">
                <h4 style={{ marginBottom: '0.5rem' }}>Employment Policy</h4>

          <div className="form-group">
            <label htmlFor="employmentPolicyNotes" style={{ fontWeight: 500 }}>Remarks / Policy Notes</label>
            <textarea
              id="employmentPolicyNotes"
              name="employmentPolicyNotes"
              value={employmentPolicyNotes}
              onChange={e => setEmploymentPolicyNotes(e.target.value)}
              rows={3}
              placeholder="Write any specific employment policy or remarks here..."
              style={{ marginTop: '0.3rem', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc', width: '100%' }}
            />
          </div>
        </div>

        <div className="form-subsection">
          <h4 style={{ marginBottom: '0.5rem' }}>Blocklisted companies/Universities</h4>
          <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Upload Blocklisted Companies</label>
              <span style={{ fontSize: '0.95em', color: '#666', marginBottom: 4 }}>
                Please upload an Excel or CSV document (.csv, .xls, .xlsx) containing the list of blocklisted companies.
              </span>
              <label className="btn btn-upload" style={{ cursor: 'pointer', padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', textAlign: 'center' }}>
                Choose File
                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept=".csv,.xls,.xlsx"
                  onChange={(e) => handleFileChange(e, setBlocklistedCompaniesFile)}
                />
              </label>
              {blocklistedCompaniesFile && <span className="file-name" style={{ marginTop: '0.5rem' }}>{blocklistedCompaniesFile.name}</span>}
            </div>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Upload Blocklisted Universities</label>
              <span style={{ fontSize: '0.95em', color: '#666', marginBottom: 4 }}>
                Please upload an Excel or CSV document (.csv, .xls, .xlsx) containing the list of blocklisted universities.
              </span>
              <label className="btn btn-upload" style={{ cursor: 'pointer', padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', textAlign: 'center' }}>
                Choose File
                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept=".csv,.xls,.xlsx"
                  onChange={(e) => handleFileChange(e, setBlocklistedUniversitiesFile)}
                />
              </label>
              {blocklistedUniversitiesFile && <span className="file-name" style={{ marginTop: '0.5rem' }}>{blocklistedUniversitiesFile.name}</span>}
            </div>
          </div>
        </div>
        </div>
  
        <div className="form-section">
          <h2 className="form-section-heading">Client SPOC Details</h2>
          {spocForm.map((spoc, index) => (
            <div key={index} className="spoc-entry" style={{ position: 'relative', marginBottom: '1rem' }}>
              {spocForm.length > 1 && (
                <RemoveIcon
                  style={{
                    cursor: 'pointer',
                    fontSize: '1.8rem',
                    color: 'red',
                    position: 'absolute',
                    top: '-1rem',
                    right: '0.5rem',
                    zIndex: 2
                  }}
                  onClick={() => removeSpoc(index)}
                  titleAccess="Remove SPOC"
                />
              )}
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor={`spocClientID-${index}`} className="field-label">Client ID</label>
                  <input type="text" id={`spocClientID-${index}`} name="spocClientID" value={spoc.spocClientID} disabled />
                </div>
                <div className="form-group">
                  <label htmlFor={`spocName-${index}`} className="field-label">SPOC Name *</label>
                  <input type="text" id={`spocName-${index}`} name="spocName" value={spoc.spocName} onChange={(e) => handleSpocChange(e, index)} required />
                  {spocErrors.spocName && <div className="error-text">{spocErrors.spocName}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor={`spocEmail-${index}`} className="field-label">Email *</label>
                  <input type="email" id={`spocEmail-${index}`} name="spocEmail" value={spoc.spocEmail} onChange={(e) => handleSpocChange(e, index)} required />
                  {spocErrors.spocEmail && <div className="error-text">{spocErrors.spocEmail}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor={`spocMobile-${index}`} className="field-label">Mobile</label>
                  <input type="tel" id={`spocMobile-${index}`} name="spocMobile" value={spoc.spocMobile} onChange={(e) => handleSpocChange(e, index)} />
                </div>
                <div className="form-group">
                  <label htmlFor={`spocLocation-${index}`} className="field-label">Location</label>
                  <input type="text" id={`spocLocation-${index}`} name="spocLocation" value={spoc.spocLocation} onChange={(e) => handleSpocChange(e, index)} />
                </div>
                <div className="form-group">
                  <label htmlFor={`spocDesignation-${index}`} className="field-label">Designation</label>
                  <input type="text" id={`spocDesignation-${index}`} name="spocDesignation" value={spoc.spocDesignation} onChange={(e) => handleSpocChange(e, index)} placeholder="e.g., Manager, VP" />
                </div>
                <div className="form-group">
                  <label htmlFor={`spocStatus-${index}`} className="field-label">Status *</label>
                  <select id={`spocStatus-${index}`} name="spocStatus" value={spoc.spocStatus} onChange={(e) => handleSpocChange(e, index)} required>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {spocErrors.spocStatus && <div className="error-text">{spocErrors.spocStatus}</div>}
                </div>
                <div className="form-group full-width">
                  <label htmlFor={`spocFunctionalRoles-${index}`} className="field-label">Functional Roles *</label>
                  <Select
                    isMulti
                    name="spocFunctionalRoles"
                    options={functionalRolesOptions}
                    value={functionalRolesOptions.filter(opt => spoc.spocFunctionalRoles.includes(opt.value))}
                    onChange={(selected, action) => handleSpocSelectChange(selected, action, index)}
                    classNamePrefix="react-select"
                    placeholder="Select functional roles..."
                  />
                  {spocErrors.spocFunctionalRoles && <div className="error-text">{spocErrors.spocFunctionalRoles}</div>}
                </div>
                <div className="form-group full-width">
                  <label htmlFor={`spocAccountsHandled-${index}`} className="field-label">Accounts Handled</label>
                  <Select
                    isMulti
                    name="spocAccountsHandled"
                    options={accountsHandledOptions}
                    value={accountsHandledOptions.filter(opt => spoc.spocAccountsHandled.includes(opt.value))}
                    onChange={(selected, action) => handleSpocSelectChange(selected, action, index)}
                    classNamePrefix="react-select"
                    placeholder="Select accounts handled..."
                  />
                </div>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-0.5rem' }}>
            <AddIcon
              style={{ cursor: 'pointer', fontSize: '2.5rem', color: 'blue' }}
              onClick={addSpoc}
            />
          </div>
        </div> {/* Close .form-section for SPOC */}
        <div className="form-actions">
          <button type="submit" className="btn-primary">Save All Details</button>
        </div>
      </form>
    {success && <div className="toast show success">{success}</div>}
  </div>
);
};

export default ClientDetailsForm;