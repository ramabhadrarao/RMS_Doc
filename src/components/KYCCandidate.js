import React, { useState } from 'react';
import '../FormStyles.css';

const initialState = {
  aadhaarNumber: '',
  aadhaarFile: null,
  panNumber: '',
  panFile: null,
  panSelfie: null,
  passportNumber: '',
  passportFile: null,
  // Permanent Address
  permAddressLine1: '',
  permAddressLine2: '',
  permCity: '',
  permState: '',
  permPincode: '',
  // Current Address
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
  rentalDocument: null,
  currentBill: null,
  sameAsPermanent: false,
  salaryAccountChoice: '',
  bankAccountNumber: '',
  ifsc: '',
  branchName: '',
  passbookFile: null,
};

function KYCCandidate() {
  const [form, setForm] = useState(initialState);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
      ...(name === 'sameAsPermanent' && checked
        ? {
            addressLine1: prev.permAddressLine1,
            addressLine2: prev.permAddressLine2,
            city: prev.permCity,
            state: prev.permState,
            pincode: prev.permPincode,
          }
        : {}),
      ...(name === 'salaryAccountChoice' && value === 'new'
        ? {
            bankAccountNumber: '',
            ifsc: '',
            branchName: '',
            passbookFile: null,
          }
        : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation or API call here if needed
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setForm(initialState);
  };

  return (
    <form className="modern-form" onSubmit={handleSubmit} autoComplete="off">
      <div className="form-title">KYC & Address Details</div>

      {/* KYC Section */}
      <div className="form-section">
        <div className="form-section-heading">KYC Details</div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="aadhaarNumber" className="required-indicator">Aadhaar Number</label>
            <input
              type="text"
              id="aadhaarNumber"
              name="aadhaarNumber"
              value={form.aadhaarNumber}
              onChange={handleChange}
              placeholder="Enter Aadhaar Number"
              maxLength={12}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="aadhaarFile" className="required-indicator">Upload Aadhaar (PDF or Image)</label>
            <input
              type="file"
              id="aadhaarFile"
              name="aadhaarFile"
              accept="application/pdf,image/*"
              onChange={handleChange}
              required
            />
            {form.aadhaarFile && <span className="file-name">{form.aadhaarFile.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="panNumber" className="required-indicator">PAN Number</label>
            <input
              type="text"
              id="panNumber"
              name="panNumber"
              value={form.panNumber}
              onChange={handleChange}
              placeholder="Enter PAN Number"
              maxLength={10}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="panFile" className="required-indicator">Upload PAN (PDF or Image)</label>
            <input
              type="file"
              id="panFile"
              name="panFile"
              accept="application/pdf,image/*"
              onChange={handleChange}
              required
            />
            {form.panFile && <span className="file-name">{form.panFile.name}</span>}
          </div>
          <div className="form-group full-width">
            <label htmlFor="panSelfie" className="required-indicator">Upload PAN Selfie (Photo of candidate holding PAN)</label>
            <input
              type="file"
              id="panSelfie"
              name="panSelfie"
              accept="image/*,application/pdf"
              onChange={handleChange}
              required
            />
            {form.panSelfie && <span className="file-name">{form.panSelfie.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="passportNumber" className="required-indicator">Passport Number</label>
            <input
              type="text"
              id="passportNumber"
              name="passportNumber"
              value={form.passportNumber}
              onChange={handleChange}
              placeholder="Enter Passport Number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="passportFile" className="required-indicator">Upload Passport (PDF or Image)</label>
            <input
              type="file"
              id="passportFile"
              name="passportFile"
              accept="application/pdf,image/*"
              onChange={handleChange}
              required
            />
            {form.passportFile && <span className="file-name">{form.passportFile.name}</span>}
          </div>
        </div>
      </div>
  {/* Salary Account Section */}
      <div className="form-section">
        <div className="form-section-heading">Salary Account Preference</div>
        <div className="form-group">
          <label>Are you okay with your existing salary bank account, or do you want a new account from the company?</label>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
            <label>
              <input
                type="radio"
                name="salaryAccountChoice"
                value="existing"
                checked={form.salaryAccountChoice === 'existing'}
                onChange={handleChange}
              /> Yes,I use my existing bank account
            </label>
            <label>
              <input
                type="radio"
                name="salaryAccountChoice"
                value="new"
                checked={form.salaryAccountChoice === 'new'}
                onChange={handleChange}
              /> No, I want a new account from the company
            </label>
          </div>
        </div>

        {form.salaryAccountChoice === 'existing' && (
          <div className="form-grid mt-2">
            <div className="form-group">
              <label htmlFor="bankAccountNumber">Bank Account Number</label>
              <input
                type="text"
                id="bankAccountNumber"
                name="bankAccountNumber"
                value={form.bankAccountNumber || ''}
                onChange={handleChange}
                placeholder="Enter account number"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="ifsc">IFSC Code</label>
              <input
                type="text"
                id="ifsc"
                name="ifsc"
                value={form.ifsc || ''}
                onChange={handleChange}
                placeholder="Enter IFSC code"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="branchName">Branch Name</label>
              <input
                type="text"
                id="branchName"
                name="branchName"
                value={form.branchName || ''}
                onChange={handleChange}
                placeholder="Enter branch name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="passbookFile">Upload Passbook/Cancelled Cheque</label>
              <input
                type="file"
                id="passbookFile"
                name="passbookFile"
                accept="application/pdf,image/*"
                onChange={handleChange}
                required
              />
              {form.passbookFile && <span className="file-name">{form.passbookFile.name}</span>}
            </div>
          </div>
        )}
        {form.salaryAccountChoice === 'new' && (
          <div className="mt-2" style={{ color: '#2563eb', fontWeight: 500 }}>
            You will be provided a new salary bank account by the company. Details will be shared soon.
          </div>
        )}
      </div>
      {/* Permanent Address Section */}
      <div className="form-section">
        <div className="form-section-heading">Permanent Address</div>
        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="permAddressLine1" className="required-indicator">Address Line 1</label>
            <input
              type="text"
              id="permAddressLine1"
              name="permAddressLine1"
              value={form.permAddressLine1}
              onChange={handleChange}
              placeholder="House/Flat No, Street, Area"
              required
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="permAddressLine2">Address Line 2</label>
            <input
              type="text"
              id="permAddressLine2"
              name="permAddressLine2"
              value={form.permAddressLine2}
              onChange={handleChange}
              placeholder="Landmark, Locality (optional)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="permCity" className="required-indicator">City</label>
            <input
              type="text"
              id="permCity"
              name="permCity"
              value={form.permCity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="permState" className="required-indicator">State</label>
            <input
              type="text"
              id="permState"
              name="permState"
              value={form.permState}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="permPincode" className="required-indicator">Pincode</label>
            <input
              type="text"
              id="permPincode"
              name="permPincode"
              value={form.permPincode}
              onChange={handleChange}
              maxLength={6}
              required
            />
          </div>
        </div>
      </div>

      {/* Current Address Section */}
      <div className="form-section">
        <div className="form-section-heading">Current Address</div>
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="sameAsPermanent"
            name="sameAsPermanent"
            checked={form.sameAsPermanent}
            onChange={handleChange}
          />
          <label htmlFor="sameAsPermanent">Address is same as permanent address</label>
        </div>
        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="addressLine1" className="required-indicator">Address Line 1</label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={form.sameAsPermanent ? form.permAddressLine1 : form.addressLine1}
              onChange={handleChange}
              placeholder="House/Flat No, Street, Area"
              required
              disabled={form.sameAsPermanent}
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="addressLine2">Address Line 2</label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={form.sameAsPermanent ? form.permAddressLine2 : form.addressLine2}
              onChange={handleChange}
              placeholder="Landmark, Locality (optional)"
              disabled={form.sameAsPermanent}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city" className="required-indicator">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={form.sameAsPermanent ? form.permCity : form.city}
              onChange={handleChange}
              required
              disabled={form.sameAsPermanent}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state" className="required-indicator">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={form.sameAsPermanent ? form.permState : form.state}
              onChange={handleChange}
              required
              disabled={form.sameAsPermanent}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pincode" className="required-indicator">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={form.sameAsPermanent ? form.permPincode : form.pincode}
              onChange={handleChange}
              maxLength={6}
              required
              disabled={form.sameAsPermanent}
            />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="rentalDocument">Upload Rental Document</label>
            <input
              type="file"
              id="rentalDocument"
              name="rentalDocument"
              accept="application/pdf,image/*"
              onChange={handleChange}
              disabled={form.sameAsPermanent}
            />
            {form.rentalDocument && <span className="file-name">{form.rentalDocument.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="currentBill">Upload Current Bill</label>
            <input
              type="file"
              id="currentBill"
              name="currentBill"
              accept="application/pdf,image/*"
              onChange={handleChange}
              disabled={form.sameAsPermanent}
            />
            {form.currentBill && <span className="file-name">{form.currentBill.name}</span>}
          </div>
        </div>
      </div>

    

      <div className="form-section">
        <div className="form-grid">
          <div className="button-group">
            <button type="submit">Save</button>
          </div>
        </div>
      </div>
      {success && <div className="toast show success">KYC & Address details saved successfully!</div>}
    </form>
  );
}

export default KYCCandidate; 