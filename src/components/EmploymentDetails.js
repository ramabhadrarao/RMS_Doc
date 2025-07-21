import React, { useState, useEffect } from 'react';
import '../FormStyles.css';

const emptyEntry = () => ({
  employement_type: 'Contract',
  working_type: 'Working',
  designation: '',
  work_location: '',
  payroll_company: '',
  client_company: '',
  end_client: '',
  start_date: '',
  end_date: '',
  Exp_last_working_date: '',
  expected_joining_date: '',
  notice_period: '',
  Pipelinequery: 'No',
  pipeline_details: '',
  OfferInHand: 'No',
  offer_in_hand_details: '',
  offer_proof_doc: null,
  resignation_available: '',
  upload_resignation: null,
  resignation_remarks: '',
  pf_available: '',
  pf: null,
  pf_remarks: '',
  payslips_available: '',
  three_months_payslips: null,
  payslips_remarks: '',
  form16_available: '',
  form16: null,
  form16_remarks: '',
  bank_statement_available: '',
  bank_statement: null,
  bank_statement_remarks: '',
  offer_letter_available: '',
  offer_letter: null,
  offer_letter_remarks: '',
  relieving_letter_available: '',
  relieving_letter: null,
  relieving_letter_remarks: '',
  experience_letter_available: '',
  experience_letter: null,
  experience_letter_remarks: '',
  collected_by: '',
  remarks: '',
  estimated_last_working_date: '',
  last_working_date: '',
});

const employmentTypeOptions = ['Contract', 'Permanent', 'Freelance'];
const workingTypeOptions = ['Working', 'Not Working'];

const EmploymentDetails = () => {
  const [entries, setEntries] = useState([emptyEntry()]);
  const [success, setSuccess] = useState(false);

  // Calculate notice period days
  const calculateNoticePeriod = (dateStr) => {
    if (!dateStr) return '';
    const today = new Date();
    const target = new Date(dateStr);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days` : '0 days';
  };

  // Update notice period when relevant date changes
  useEffect(() => {
    setEntries((prev) => prev.map((entry) => {
      let notice_period = entry.notice_period;
      if (entry.working_type === 'Working' && entry.estimated_last_working_date) {
        notice_period = calculateNoticePeriod(entry.estimated_last_working_date);
      } else if (entry.working_type !== 'Working' && entry.last_working_date) {
        notice_period = calculateNoticePeriod(entry.last_working_date);
      }
      return { ...entry, notice_period };
    }));
    // eslint-disable-next-line
  }, [entries.map(e => e.estimated_last_working_date).join(), entries.map(e => e.last_working_date).join(), entries.map(e => e.working_type).join()]);

  const handleChange = (idx, e) => {
    const { name, value, type, files } = e.target;
    setEntries((prev) => prev.map((entry, i) => {
      if (i === idx) {
        if (type === 'file') {
          return { ...entry, [name]: files[0] };
        } else if (type === 'radio') {
          return { ...entry, [name]: value };
        } else {
          return { ...entry, [name]: value };
        }
      }
      return entry;
    }));
  };

  const addEntry = () => {
    setEntries((prev) => [...prev, emptyEntry()]);
  };

  const removeEntry = (idx) => {
    setEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entries.length === 0) return;
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setEntries([emptyEntry()]);
  };

  return (
    <form className="employment-details-form" onSubmit={handleSubmit} autoComplete="off">
      <h2>Employment Details</h2>
      {entries.map((entry, idx) => (
        <div className="employment-entry" key={idx}>
          {entries.length > 1 && (
            <button type="button" className="remove-btn" title="Remove this entry" onClick={() => removeEntry(idx)}>&times;</button>
          )}
          <div className="form-section">
            <h3 className="section-title">Role & Company</h3>
            <div className="form-grid">
              {/* Role & Company fields here */}
              <div className="form-group">
                <label>Employment Type</label>
                <select name="employement_type" value={entry.employement_type} onChange={e => handleChange(idx, e)}>
                  {employmentTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Working Status</label>
                <select name="working_type" value={entry.working_type} onChange={e => handleChange(idx, e)}>
                  {workingTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              {entry.employement_type !== 'Freelance' && (
                <>
                  <div className="form-group">
                    <label>Designation</label>
                    <input type="text" name="designation" value={entry.designation} onChange={e => handleChange(idx, e)} />
                  </div>
                  <div className="form-group">
                    <label>Work Location</label>
                    <input type="text" name="work_location" value={entry.work_location} onChange={e => handleChange(idx, e)} />
                  </div>
                  <div className="form-group">
                    <label>Payroll Company</label>
                    <input type="text" name="payroll_company" value={entry.payroll_company} onChange={e => handleChange(idx, e)} />
                  </div>
                </>
              )}
              <div className="form-group">
                <label>Client Company</label>
                <input type="text" name="client_company" value={entry.client_company} onChange={e => handleChange(idx, e)} />
              </div>
              <div className="form-group full-width">
                <label>End Client</label>
                <input type="text" name="end_client" value={entry.end_client} onChange={e => handleChange(idx, e)} />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3 className="section-title">Dates & Notice Period</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Start Date</label>
                <input type="date" name="start_date" value={entry.start_date} onChange={e => handleChange(idx, e)} />
              </div>
              {entry.working_type === 'Working' ? (
                <div className="form-group">
                  <label>Estimated Last Working Date</label>
                  <input type="date" name="estimated_last_working_date" value={entry.estimated_last_working_date} onChange={e => handleChange(idx, e)} />
                </div>
              ) : (
                <div className="form-group">
                  <label>Last Working Date</label>
                  <input type="date" name="last_working_date" value={entry.last_working_date} onChange={e => handleChange(idx, e)} />
                </div>
              )}
              <div className="form-group">
                <label>Expected Joining Date</label>
                <input type="date" name="expected_joining_date" value={entry.expected_joining_date} onChange={e => handleChange(idx, e)} />
              </div>
              <div className="form-group">
                <label>Notice Period</label>
                <input type="text" name="notice_period" value={entry.notice_period} readOnly placeholder="e.g., 30 days" />
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3 className="section-title">Pipeline & Offer Status</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>In another pipeline?</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="Pipelinequery" value="Yes" checked={entry.Pipelinequery === 'Yes'} onChange={e => handleChange(idx, e)} /> Yes
                  </label>
                  <label>
                    <input type="radio" name="Pipelinequery" value="No" checked={entry.Pipelinequery === 'No'} onChange={e => handleChange(idx, e)} /> No
                  </label>
                </div>
                {entry.Pipelinequery === 'Yes' && (
                  <div>
                    <label className="field-label">Pipeline Details</label>
                    <textarea 
                      name="pipeline_details" 
                      value={entry.pipeline_details} 
                      onChange={e => handleChange(idx, e)} 
                      placeholder="Provide details about other hiring pipelines..." 
                    />
                  </div>
                )}
              </div>
              <div className="form-group full-width">
                <label>Offer in hand?</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="OfferInHand" value="Yes" checked={entry.OfferInHand === 'Yes'} onChange={e => handleChange(idx, e)} /> Yes
                  </label>
                  <label>
                    <input type="radio" name="OfferInHand" value="No" checked={entry.OfferInHand === 'No'} onChange={e => handleChange(idx, e)} /> No
                  </label>
                </div>
                {entry.OfferInHand === 'Yes' && (
                  <div>
                    <label className="field-label">Offer Details</label>
                    <textarea 
                      name="offer_in_hand_details" 
                      value={entry.offer_in_hand_details} 
                      onChange={e => handleChange(idx, e)} 
                      placeholder="Provide details about other offers..." 
                    />
                    <label className="field-label">Upload Offer Proof Document</label>
                    <input type="file" name="offer_proof_doc" onChange={e => handleChange(idx, e)} />
                    {entry.offer_proof_doc && <span className="file-name">{entry.offer_proof_doc.name}</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="form-section">
            <h3 className="section-title">Documents & Remarks</h3>
            <div className="form-grid">
              {/* Resignation */}
              <div className="form-group">
                <label>Resignation Available?</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="resignation_available" value="Yes" checked={entry.resignation_available === 'Yes'} onChange={e => handleChange(idx, e)} /> Yes
                  </label>
                  <label>
                    <input type="radio" name="resignation_available" value="No" checked={entry.resignation_available === 'No'} onChange={e => handleChange(idx, e)} /> No
                  </label>
                </div>
                {entry.resignation_available === 'Yes' && (
                  <>
                    <label>Upload Resignation</label>
                    <input type="file" name="upload_resignation" onChange={e => handleChange(idx, e)} />
                    {entry.upload_resignation && <span className="file-name">{entry.upload_resignation.name}</span>}
                  </>
                )}
                {entry.resignation_available === 'No' && (
                  <>
                    <label>Remarks</label>
                    <input type="text" name="resignation_remarks" value={entry.resignation_remarks} onChange={e => handleChange(idx, e)} />
                  </>
                )}
              </div>
              {/* PF */}
              <div className="form-group">
                <label>PF Document Available?</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="pf_available" value="Yes" checked={entry.pf_available === 'Yes'} onChange={e => handleChange(idx, e)} /> Yes
                  </label>
                  <label>
                    <input type="radio" name="pf_available" value="No" checked={entry.pf_available === 'No'} onChange={e => handleChange(idx, e)} /> No
                  </label>
                </div>
                {entry.pf_available === 'Yes' && (
                  <>
                    <label>Upload PF Document</label>
                    <input type="file" name="pf" onChange={e => handleChange(idx, e)} />
                    {entry.pf && <span className="file-name">{entry.pf.name}</span>}
                  </>
                )}
                {entry.pf_available === 'No' && (
                  <>
                    <label>Remarks</label>
                    <input type="text" name="pf_remarks" value={entry.pf_remarks} onChange={e => handleChange(idx, e)} />
                  </>
                )}
              </div>
              {/* Payslips */}
              <div className="form-group">
                <label>3 Months Payslips Available?</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="payslips_available" value="Yes" checked={entry.payslips_available === 'Yes'} onChange={e => handleChange(idx, e)} /> Yes
                  </label>
                  <label>
                    <input type="radio" name="payslips_available" value="No" checked={entry.payslips_available === 'No'} onChange={e => handleChange(idx, e)} /> No
                  </label>
                </div>
                {entry.payslips_available === 'Yes' && (
                  <>
                    <label>Upload 3 Months Payslips</label>
                    <input type="file" name="three_months_payslips" onChange={e => handleChange(idx, e)} />
                    {entry.three_months_payslips && <span className="file-name">{entry.three_months_payslips.name}</span>}
                  </>
                )}
                {entry.payslips_available === 'No' && (
                  <>
                    <label>Remarks</label>
                    <input type="text" name="payslips_remarks" value={entry.payslips_remarks} onChange={e => handleChange(idx, e)} />
                  </>
                )}
              </div>
              {/* Form 16 */}
              <div className="form-group">
                <label>Form 16 Available?</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="form16_available" value="Yes" checked={entry.form16_available === 'Yes'} onChange={e => handleChange(idx, e)} /> Yes
                  </label>
                  <label>
                    <input type="radio" name="form16_available" value="No" checked={entry.form16_available === 'No'} onChange={e => handleChange(idx, e)} /> No
                  </label>
                </div>
                {entry.form16_available === 'Yes' && (
                  <>
                    <label>Upload Form 16</label>
                    <input type="file" name="form16" onChange={e => handleChange(idx, e)} />
                    {entry.form16 && <span className="file-name">{entry.form16.name}</span>}
                  </>
                )}
                {entry.form16_available === 'No' && (
                  <>
                    <label>Remarks</label>
                    <input type="text" name="form16_remarks" value={entry.form16_remarks} onChange={e => handleChange(idx, e)} />
                  </>
                )}
              </div>
              {/* Bank Statement */}
              <div className="form-group">
                <label>Bank Statement Available?</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="bank_statement_available" value="Yes" checked={entry.bank_statement_available === 'Yes'} onChange={e => handleChange(idx, e)} /> Yes
                  </label>
                  <label>
                    <input type="radio" name="bank_statement_available" value="No" checked={entry.bank_statement_available === 'No'} onChange={e => handleChange(idx, e)} /> No
                  </label>
                </div>
                {entry.bank_statement_available === 'Yes' && (
                  <>
                    <label>Upload Bank Statement</label>
                    <input type="file" name="bank_statement" onChange={e => handleChange(idx, e)} />
                    {entry.bank_statement && <span className="file-name">{entry.bank_statement.name}</span>}
                  </>
                )}
                {entry.bank_statement_available === 'No' && (
                  <>
                    <label>Remarks</label>
                    <input type="text" name="bank_statement_remarks" value={entry.bank_statement_remarks} onChange={e => handleChange(idx, e)} />
                  </>
                )}
              </div>
              {/* Offer Letter */}
              <div className="form-group">
                <label>Offer Letter Available?</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="offer_letter_available" value="Yes" checked={entry.offer_letter_available === 'Yes'} onChange={e => handleChange(idx, e)} /> Yes
                  </label>
                  <label>
                    <input type="radio" name="offer_letter_available" value="No" checked={entry.offer_letter_available === 'No'} onChange={e => handleChange(idx, e)} /> No
                  </label>
                </div>
                {entry.offer_letter_available === 'Yes' && (
                  <>
                    <label>Upload Offer Letter</label>
                    <input type="file" name="offer_letter" onChange={e => handleChange(idx, e)} />
                    {entry.offer_letter && <span className="file-name">{entry.offer_letter.name}</span>}
                  </>
                )}
                {entry.offer_letter_available === 'No' && (
                  <>
                    <label>Remarks</label>
                    <input type="text" name="offer_letter_remarks" value={entry.offer_letter_remarks} onChange={e => handleChange(idx, e)} />
                  </>
                )}
              </div>
              {/* Relieving Letter */}
              <div className="form-group">
                <label>Relieving Letter Available?</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="relieving_letter_available" value="Yes" checked={entry.relieving_letter_available === 'Yes'} onChange={e => handleChange(idx, e)} /> Yes
                  </label>
                  <label>
                    <input type="radio" name="relieving_letter_available" value="No" checked={entry.relieving_letter_available === 'No'} onChange={e => handleChange(idx, e)} /> No
                  </label>
                </div>
                {entry.relieving_letter_available === 'Yes' && (
                  <>
                    <label>Upload Relieving Letter</label>
                    <input type="file" name="relieving_letter" onChange={e => handleChange(idx, e)} />
                    {entry.relieving_letter && <span className="file-name">{entry.relieving_letter.name}</span>}
                  </>
                )}
                {entry.relieving_letter_available === 'No' && (
                  <>
                    <label>Remarks</label>
                    <input type="text" name="relieving_letter_remarks" value={entry.relieving_letter_remarks} onChange={e => handleChange(idx, e)} />
                  </>
                )}
              </div>
              {/* Experience Letter */}
              <div className="form-group">
                <label>Experience Letter Available?</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="experience_letter_available" value="Yes" checked={entry.experience_letter_available === 'Yes'} onChange={e => handleChange(idx, e)} /> Yes
                  </label>
                  <label>
                    <input type="radio" name="experience_letter_available" value="No" checked={entry.experience_letter_available === 'No'} onChange={e => handleChange(idx, e)} /> No
                  </label>
                </div>
                {entry.experience_letter_available === 'Yes' && (
                  <>
                    <label>Upload Experience Letter</label>
                    <input type="file" name="experience_letter" onChange={e => handleChange(idx, e)} />
                    {entry.experience_letter && <span className="file-name">{entry.experience_letter.name}</span>}
                  </>
                )}
                {entry.experience_letter_available === 'No' && (
                  <>
                    <label>Remarks</label>
                    <input type="text" name="experience_letter_remarks" value={entry.experience_letter_remarks} onChange={e => handleChange(idx, e)} />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="form-group full-width">
            <label>Remarks</label>
            <textarea name="remarks" rows={4} value={entry.remarks} onChange={e => handleChange(idx, e)} />
          </div>
        </div>
      ))}
      <div className="button-container">
        <button type="button" className="add-btn" onClick={addEntry}>Add More Employment</button>
      </div>
      <div>
        <button type="submit" className="submit-btn">Save All Employment Details</button>
      </div>
      {success && <div className="toast show success">Successfully saved {entries.length} employment entr{entries.length === 1 ? 'y' : 'ies'}!</div>}
    </form>
  );
};

export default EmploymentDetails;
