import React, { useState } from 'react';
import '../FormStyles.css';
import DeleteIcon from '@mui/icons-material/Delete';

const initialFormData = {
  
  // RPO fields as an array for multi-add
  rpo_entries: [],
  rpo_newEntry: { skillCategory: '', expRange: '', salaryRange: '', amount: '', invoiceValue: '' },
  // New fields for all subtypes
  industry: '',
  website: '',
  linkedIn:'',
  aboutUs: '',
  noOfEmployees: '',
  notes: '',
};

const subtypeOptions = {
  Contract: [
    { value: 'Contract', label: 'Contract' },
    { value: 'Contract MSP', label: 'Contract MSP' },
  ],
  Permanent: [
    { value: 'Permanent', label: 'Permanent' },
    { value: 'Permanent MSP', label: 'Permanent MSP' },
  ],
  RPO: [],
};

const formTemplates = {
  'Contract': [
    { label: 'Client Name', name: 'contract_ClientName', type: 'text' },
    { agreement: 'contract' },
    { label: 'Industry', name: 'industry', type: 'select', options: ['IT', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Other'] },
    { label: 'Website', name: 'website', type: 'url' },
    { label: 'LinkedIn', name: 'linkedIn', type: 'url' },
    { label: 'About Us', name: 'aboutUs', type: 'textarea' },
    { label: 'No. of Employees', name: 'noOfEmployees', type: 'number' },
    { label: 'Notes', name: 'notes', type: 'textarea' },
  ],
  'Contract MSP': [
    { label: 'MSP Name', name: 'msp_Name', type: 'text' },
    { label: 'Client Name', name: 'msp_ClientName', type: 'text' },
    { label: 'MSP %', name: 'msp_Percent', type: 'number' },
    { agreement: 'contract_MSP' },
    { label: 'Industry', name: 'industry', type: 'select', options: ['IT', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Other'] },
    { label: 'Website', name: 'website', type: 'url' },
    { label: 'LinkedIn', name: 'linkedIn', type: 'url' },
    { label: 'About Us', name: 'aboutUs', type: 'textarea' },
    { label: 'No. of Employees', name: 'noOfEmployees', type: 'number' },
    { label: 'Notes', name: 'notes', type: 'textarea' },
  ],
  'Permanent': [
    { label: 'Client Name', name: 'permanent_ClientName', type: 'text' },
    { label: '%', name: 'permanent_Percent', type: 'number' },
    { agreement: 'permanent' },
    { label: 'Industry', name: 'industry', type: 'select', options: ['IT', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Other'] },
    { label: 'Website', name: 'website', type: 'url' },
    { label: 'LinkedIn', name: 'linkedIn', type: 'url' },
    { label: 'About Us', name: 'aboutUs', type: 'textarea' },
    { label: 'No. of Employees', name: 'noOfEmployees', type: 'number' },
    { label: 'Notes', name: 'notes', type: 'textarea' },
  ],
  'Permanent MSP': [
    { label: 'MSP Name', name: 'permanentMSP_Name', type: 'text' },
    { label: 'Client Name', name: 'permanentMSP_ClientName', type: 'text' },
    { label: 'MSP %', name: 'permanentMSP_Percent', type: 'number' },
    { label: ' AFORV Billing %', name: 'permanentMSP_BillingPercent', type: 'number' },
    { label: 'Client %', name: 'permanentMSP_ClientPercent', type: 'number' },
    { agreement: 'permanentMSP' },
    { label: 'Industry', name: 'industry', type: 'select', options: ['IT', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Other'] },
    { label: 'Website', name: 'website', type: 'url' },
    { label: 'LinkedIn', name: 'linkedIn', type: 'url' },
    { label: 'About Us', name: 'aboutUs', type: 'textarea' },
    { label: 'No. of Employees', name: 'noOfEmployees', type: 'number' },
    { label: 'Notes', name: 'notes', type: 'textarea' },
  ],
  'RPO': [
    { label: 'Skill Category', name: 'skillCategory', type: 'text' },
    { label: 'Exp Range', name: 'expRange', type: 'text' },
     { label: 'Invoice Value', name: 'invoiceValue', type: 'number' },
  ],
};



const AddclientsATS = () => {
  const [businessType, setBusinessType] = useState('');
  const [subtype, setSubtype] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleBusinessTypeChange = e => {
    setBusinessType(e.target.value);
    setSubtype('');
    setFormData(initialFormData);
    setErrors({});
  };

  const handleSubtypeChange = e => {
    setSubtype(e.target.value);
    setFormData(initialFormData);
    setErrors({});
  };

  const handleInputChange = e => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(f => ({ ...f, [name]: files[0] }));
    } else {
      setFormData(f => ({ ...f, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!businessType) newErrors.businessType = 'Business Type is required';
    if ((businessType === 'Contract' || businessType === 'Permanent') && !subtype) newErrors.subtype = 'Please select a subtype';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Multi-add handlers for RPO
  // For new entry input fields
  const handleRpoNewEntryChange = (field, value) => {
    setFormData(f => ({
      ...f,
      rpo_newEntry: { ...f.rpo_newEntry, [field]: value }
    }));
  };

  // Add new entry to the list
  const handleAddRpoEntry = () => {
    setFormData(f => ({
      ...f,
      rpo_entries: [...f.rpo_entries, { ...f.rpo_newEntry }],
      rpo_newEntry: { skillCategory: '', expRange: '', salaryRange: '', amount: '', invoiceValue: '' }
    }));
  };

  // Remove entry from the list
  const handleRemoveRpoEntry = (idx) => {
    setFormData(f => ({
      ...f,
      rpo_entries: f.rpo_entries.filter((_, i) => i !== idx)
    }));
  };

 

  // Render dynamic form fields
  const renderFormFields = () => {
    if (!subtype || !formTemplates[subtype]) return null;
    
    return (
      <div className="form-grid">
        {formTemplates[subtype].map((field, idx) => {
          if (field.agreement) {
            return null;
          }
          if (field.type === 'textarea') {
            return (
              <div className="form-group" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
              </div>
            );
          } else if (field.type === 'select') {
            return (
              <div className="form-group" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select an Industry</option>
                  {field.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            );
          } else {
            return (
              <div className="form-group" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                />
              </div>
            );
          }
        })}
      </div>
    );
  };

return (
  <form className="modern-form max-w-3xl mx-auto"  autoComplete="off">
    <div style={{ textAlign: 'right', marginBottom: 12 }}>
      <a
        href={process.env.PUBLIC_URL + '/HTMLDOCS/add_client_form_docs.html'}
        target="_blank"
        rel="noopener noreferrer"
        className="doc-link-btn"
      >
        View Documentation
      </a>
    </div>
    <h1 className="form-title mb-4">Add Client</h1>
    <div className="form-grid mb-4">
      <div className="form-group">
        <label className="field-label">Business Type</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="businessType"
              value="Contract"
              checked={businessType === 'Contract'}
              onChange={handleBusinessTypeChange}
            />{' '}
            Contract
          </label>
          <label>
            <input
              type="radio"
              name="businessType"
              value="Permanent"
              checked={businessType === 'Permanent'}
              onChange={handleBusinessTypeChange}
            />{' '}
            Permanent
          </label>
          <label>
            <input
              type="radio"
              name="businessType"
              value="RPO"
              checked={businessType === 'RPO'}
              onChange={handleBusinessTypeChange}
            />{' '}
            RPO
          </label>
        </div>
        {errors.businessType && <div className="error-text">{errors.businessType}</div>}
      </div>
      {(businessType === 'Contract' || businessType === 'Permanent') && (
        <div className="form-group">
          <label className="field-label">Select {businessType} Subtype</label>
          <div className="radio-group">
            {subtypeOptions[businessType].map(opt => (
              <label key={opt.value}>
                <input
                  type="radio"
                  name="subtype"
                  value={opt.value}
                  checked={subtype === opt.value}
                  onChange={handleSubtypeChange}
                />{' '}
                {opt.label}
              </label>
            ))}
          </div>
          {errors.subtype && <div className="error-text">{errors.subtype}</div>}
        </div>
      )}
    </div>
    {/* Dynamic Form Fields */}
    {businessType === 'RPO' ? (
      <div>
        {/* List of added RPO entries as summary */}
        {formData.rpo_entries.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            {formData.rpo_entries.map((entry, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, border: '1px solid #eee', borderRadius: 6, padding: 8 }}>
                <span><b>Skill:</b> {entry.skillCategory}</span>
                <span><b>Exp:</b> {entry.expRange}</span>
                <span><b>Salary:</b> {entry.salaryRange}</span>
                <span><b>Amount:</b> {entry.amount}</span>
                <span><b>Invoice:</b> {entry.invoiceValue}</span>
                <button
                  type="button"
                  title="Delete"
                  onClick={() => handleRemoveRpoEntry(idx)}
                  style={{
                    background: '#f5f5f5',
                    border: '1px solid #ccc',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    marginLeft: 8
                  }}
                >
                  <DeleteIcon style={{ fontSize: 18, color: '#d32f2f' }} />
                </button>
              </div>
            ))}
          </div>
        )}
        {/* Input fields for new RPO entry */}
        <div className="form-grid" style={{ border: '1px solid #eee', marginBottom: 12, padding: 12, borderRadius: 6 }}>
          {formTemplates['RPO'].map((field) => (
            <div className="form-group" key={field.name}>
              <label htmlFor={`rpo_new_${field.name}`}>{field.label}</label>
              <input
                type={field.type}
                id={`rpo_new_${field.name}`}
                name={`rpo_new_${field.name}`}
                value={formData.rpo_newEntry[field.name] || ''}
                onChange={e => handleRpoNewEntryChange(field.name, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddRpoEntry}
          style={{
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            padding: '4px 16px',
            fontSize: 14,
            minWidth: 0,
            height: 32,
            borderRadius: 16,
            marginTop: 4,
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(25, 118, 210, 0.08)'
          }}
        >
          Add
        </button>
      </div>
    ) : renderFormFields()}

  </form>
);
}

export default AddclientsATS;