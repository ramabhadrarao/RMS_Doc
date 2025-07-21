import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Select from 'react-select';

const initialContact = { name: '', email: '', phone: '', designation: '' };
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
const initialSpoc = {
  name: '',
  email: '',
  phone: '',
  designation: '',
  location: '',
  status: 'Active',
  functionalRoles: [], // array of option objects
  accountsHandled: [], // array of option objects
};
const initialDocument = { file: null, name: '', validity: false, startDate: '', endDate: '' };

const AddBGVVendor = () => {
  const [selectedClient, setSelectedClient] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [website, setWebsite] = useState('');
   const [address, setAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [invoicePaymentTerms, setInvoicePaymentTerms] = useState('');
  const [documents, setDocuments] = useState([initialDocument]);
  const [spocs, setSpocs] = useState([initialSpoc]);

  // Document handlers
  const handleDocumentChange = (e, idx) => {
    const { name, value, type, checked, files } = e.target;
    setDocuments(prev => prev.map((doc, i) => {
      if (i !== idx) return doc;
      if (type === 'checkbox') return { ...doc, [name]: checked };
      if (type === 'file') return { ...doc, [name]: files[0] };
      return { ...doc, [name]: value };
    }));
  };
  const addDocument = () => setDocuments(prev => [...prev, initialDocument]);
  const removeDocument = idx => setDocuments(prev => prev.filter((_, i) => i !== idx));

  // SPOC handlers
  const handleSpocChange = (e, idx) => {
    const { name, value, type } = e.target;
    setSpocs(prev => prev.map((spoc, i) => i === idx ? { ...spoc, [name]: value } : spoc));
  };
  const handleSpocSelectChange = (selected, action, idx) => {
    setSpocs(prev => prev.map((spoc, i) => i === idx ? { ...spoc, [action.name]: selected || [] } : spoc));
  };
  const addSpoc = () => setSpocs(prev => [...prev, initialSpoc]);
  const removeSpoc = idx => setSpocs(prev => prev.filter((_, i) => i !== idx));

  // Form submit (placeholder)
  const handleSubmit = e => {
    e.preventDefault();
    // TODO: handle form submission
    alert('BGV Vendor added!');
  };

  return (
    <div className="add-bgv-vendor-form modern-form max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div style={{ textAlign: 'right', marginBottom: 12 }}>
          <a
            href={process.env.PUBLIC_URL + '/HTMLDOCS/bgv_vendor_workflow_docs.html'}
            target="_blank"
            rel="noopener noreferrer"
            className="doc-link-btn"
          >
            View Documentation
          </a>
        </div>
        <h2 className="form-title mb-4">Add BGV Vendor</h2>
        {/* Client Selection */}
        <div className="form-section">
          <h3 className="form-section-heading">Select Client</h3>
          <div className="form-group">
            <label htmlFor="clientSelect">Client</label>
            <select id="clientSelect" value={selectedClient} onChange={e => setSelectedClient(e.target.value)} required>
              <option value="">-- Select Client --</option>
              <option value="ClientA">Client A</option>
              <option value="ClientB">Client B</option>
              {/* TODO: Populate from actual client list */}
            </select>
          </div>
        </div>
        {/* Vendor Details */}
        <div className="form-section">
          <h3 className="form-section-heading">Vendor Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="vendorName">Vendor Name</label>
              <input type="text" id="vendorName" value={vendorName} onChange={e => setVendorName(e.target.value)} required placeholder="e.g., Acme Background Services" />
            </div>
            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input type="url" id="website" value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://vendorwebsite.com" />
            </div>
          </div>
        </div>
        {/* Contact Section */}
        
        {/* Addresses Section */}
        <div className="form-section">
          <h3 className="form-section-heading">BGV Vendor & Address Details</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                rows={3}
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="123 Business Rd, Commerce City, ST 12345"
              />
              <div style={{ fontSize: '0.95em', color: '#6b7280', marginTop: '0.3rem' }}>
                The primary physical or mailing address of the vendor's main office. Captured in a textarea.
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="billingAddress">Billing Address</label>
              <textarea
                id="billingAddress"
                rows={3}
                value={billingAddress}
                onChange={e => setBillingAddress(e.target.value)}
                placeholder="e.g., 456 Invoice Lane, Finance City, ST 54321"
              />
            </div>
          </div>
        </div>
        {/* Billing Info Section */}
        <div className="form-section">
          <h3 className="form-section-heading">Billing Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="gstNumber">GST Number</label>
              <input type="text" id="gstNumber" value={gstNumber} onChange={e => setGstNumber(e.target.value)} placeholder="e.g., 22AAAAA0000A1Z5" />
            </div>
            <div className="form-group">
              <label htmlFor="invoicePaymentTerms">Invoice Payment Terms (days)</label>
              <input type="number" id="invoicePaymentTerms" value={invoicePaymentTerms} onChange={e => setInvoicePaymentTerms(e.target.value)} placeholder="e.g., 30" />
            </div>
          </div>
        </div>
        {/* Documents Section */}
        <div className="form-section">
          <h3 className="form-section-heading">Documents</h3>
          {documents.map((doc, idx) => (
            <div key={idx} className="document-entry" style={{ position: 'relative', marginBottom: '1rem' }}>
              {documents.length > 1 && (
                <RemoveIcon
                  style={{ cursor: 'pointer', fontSize: '1.8rem', color: 'red', position: 'absolute', top: '-1rem', right: '0.5rem', zIndex: 2 }}
                  onClick={() => removeDocument(idx)}
                  titleAccess="Remove document"
                />
              )}
              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', alignItems: 'center', gap: '1rem' }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                  <label>Upload Document</label>
                  <label className="btn btn-upload" style={{ cursor: 'pointer', padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', textAlign: 'center' }}>
                    Choose File
                    <input type="file" name="file" style={{ display: 'none' }} onChange={e => handleDocumentChange(e, idx)} />
                  </label>
                  {doc.file && <span className="file-name" style={{ marginTop: '0.5rem' }}>{doc.file.name}</span>}
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                  <label>Document Name</label>
                  <input type="text" name="name" value={doc.name} onChange={e => handleDocumentChange(e, idx)} placeholder="e.g., Service Agreement" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                  <input type="checkbox" name="validity" checked={doc.validity} onChange={e => handleDocumentChange(e, idx)} style={{ width: '1.1em', height: '1.1em', accentColor: '#2563eb', margin: 0 }} />
                  <label style={{ fontSize: '0.97em', margin: 0, fontWeight: 500, color: '#4b5563', cursor: 'pointer' }}>Validity</label>
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', opacity: doc.validity ? 1 : 0.5 }}>
                  <label>Start Date</label>
                  <input type="date" name="startDate" value={doc.startDate} onChange={e => handleDocumentChange(e, idx)} disabled={!doc.validity} placeholder="Start Date" />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', opacity: doc.validity ? 1 : 0.5 }}>
                  <label>End Date</label>
                  <input type="date" name="endDate" value={doc.endDate} onChange={e => handleDocumentChange(e, idx)} disabled={!doc.validity} placeholder="End Date" />
                </div>
              </div>
              <hr />
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-0.5rem' }}>
            <AddIcon style={{ cursor: 'pointer', fontSize: '2.5rem', color: 'blue' }} onClick={addDocument} />
          </div>
        </div>
        {/* Vendor SPOC Details Section */}
        <div className="form-section">
          <h3 className="form-section-heading">Vendor SPOC Details</h3>
          {spocs.map((spoc, idx) => (
            <div key={idx} className="spoc-entry" style={{ position: 'relative', marginBottom: '1rem' }}>
              {spocs.length > 1 && (
                <RemoveIcon
                  style={{ cursor: 'pointer', fontSize: '1.8rem', color: 'red', position: 'absolute', top: '-1rem', right: '0.5rem', zIndex: 2 }}
                  onClick={() => removeSpoc(idx)}
                  titleAccess="Remove SPOC"
                />
              )}
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor={`spocName-${idx}`}>Name</label>
                  <input type="text" id={`spocName-${idx}`} name="name" value={spoc.name} onChange={e => handleSpocChange(e, idx)} placeholder="e.g., Jane Smith" />
                </div>
                <div className="form-group">
                  <label htmlFor={`spocEmail-${idx}`}>Email</label>
                  <input type="email" id={`spocEmail-${idx}`} name="email" value={spoc.email} onChange={e => handleSpocChange(e, idx)} placeholder="jane.smith@email.com" />
                </div>
                <div className="form-group">
                  <label htmlFor={`spocPhone-${idx}`}>Phone</label>
                  <input type="tel" id={`spocPhone-${idx}`} name="phone" value={spoc.phone} onChange={e => handleSpocChange(e, idx)} placeholder="+91-9988776655" />
                </div>
                <div className="form-group">
                  <label htmlFor={`spocDesignation-${idx}`}>Designation</label>
                  <input type="text" id={`spocDesignation-${idx}`} name="designation" value={spoc.designation} onChange={e => handleSpocChange(e, idx)} placeholder="e.g., Operations Head" />
                </div>
                <div className="form-group">
                  <label htmlFor={`spocLocation-${idx}`}>Location</label>
                  <input type="text" id={`spocLocation-${idx}`} name="location" value={spoc.location} onChange={e => handleSpocChange(e, idx)} placeholder="e.g., Mumbai" />
                </div>
                <div className="form-group">
                  <label htmlFor={`spocStatus-${idx}`}>Status *</label>
                  <select id={`spocStatus-${idx}`} name="status" value={spoc.status} onChange={e => handleSpocChange(e, idx)} required>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor={`spocFunctionalRoles-${idx}`}>Functional Roles *</label>
                  <Select
                    id={`spocFunctionalRoles-${idx}`}
                    name="functionalRoles"
                    isMulti
                    options={functionalRolesOptions}
                    value={spoc.functionalRoles}
                    onChange={(selected, action) => handleSpocSelectChange(selected, action, idx)}
                    placeholder="Select functional roles..."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`spocAccountsHandled-${idx}`}>Accounts Handled</label>
                  <Select
                    id={`spocAccountsHandled-${idx}`}
                    name="accountsHandled"
                    isMulti
                    options={accountsHandledOptions}
                    value={spoc.accountsHandled}
                    onChange={(selected, action) => handleSpocSelectChange(selected, action, idx)}
                    placeholder="Select accounts handled..."
                  />
                </div>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-0.5rem' }}>
            <AddIcon style={{ cursor: 'pointer', fontSize: '2.5rem', color: 'blue' }} onClick={addSpoc} />
          </div>
        </div>
        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddBGVVendor; 