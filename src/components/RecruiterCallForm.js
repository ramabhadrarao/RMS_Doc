import React, { useState } from 'react';

// RecruiterForm Component — Multi-step detailed form
function RecruiterForm() {
  const [form, setForm] = useState({
    candidateName: '',
    email: '',
    phoneNumber: '',
    lookingForJob: 'Yes',
    educationLevels: [],
    regularEducation: '',
    educationRemark: '',
    highestQualification: '',
    completionDate: '',
    maritalStatus: '',
    totalExperience: '',
    relevantExperience: '',
    currentCity: '',
    nativeState: '',
    nativePlace: '',
    jobLocation: '',
    jobLocationOk: '',
    willingToRelocate: '',
    relocationRemark: '',
    relocationReason: '',
    familyRelocate: '',
    relocateAlone: '',
    relocationPlan: '',
    relocationSupport: '',
    currentCTC: '',
    takeHome: '',
    expectedCTC: '',
    workStatus: '',
    startDate: '',
    estimatedLastWorkingDate: '',
    lastWorkingDate: '',
    expectedJoiningDate: '',
    currentCompany: '',
    payrollCompany: '',
    noticePeriod: '',
    joiningTimeline: '',
    shortNoticeReason: '',
    resignationReason: '',
    hasResignationProof: '',
    offersInHand: '',
    offersInPipeline: '',
    interviewsInPipeline: '',
    jobInterestReason: '',
    hasInternship: '',
    internshipCompany: '',
    internshipStartDate: '',
    internshipEndDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setForm(prevForm => {
      if (checked) {
        return { ...prevForm, educationLevels: [...prevForm.educationLevels, value] };
      } else {
        return { ...prevForm, educationLevels: prevForm.educationLevels.filter(level => level !== value) };
      }
    });
  };

  const styles = {
    modernForm: { padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '12px', marginTop: '2rem', backgroundColor: '#fdfdff' },
    formSection: { marginBottom: '2rem' },
    formSectionHeading: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#2d3748' },
    fontsemibold: { fontWeight: '600', marginBottom: '1rem', color: '#4a5568' },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' },
    formGroup: { marginBottom: '1.5rem' },
    formLabel: { display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#4a5568' },
    formInput: { width: '100%', border: '1px solid #cbd5e0', padding: '0.75rem', borderRadius: '8px', transition: 'border-color 0.2s', boxSizing: 'border-box' },
    formCheckbox: { marginRight: '0.5rem' },
    formSelect: { width: '100%', border: '1px solid #cbd5e0', padding: '0.75rem', borderRadius: '8px', boxSizing: 'border-box' },
    formTextarea: { width: '100%', border: '1px solid #cbd5e0', padding: '0.75rem', borderRadius: '8px', boxSizing: 'border-box', minHeight: '80px' },
    h3: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' },
    flexGap: { display: 'flex', gap: '1rem' },
    radioContainer: { display: 'flex', gap: '2rem', marginBottom: '1rem' }
  };

  return (
    <div style={styles.modernForm}>
      <h2 style={styles.formSectionHeading}>Candidate's education</h2>

      {/* Step 2: Education Background */}
      <div style={styles.formSection}>
        <p style={styles.fontsemibold}>Select all education levels completed:</p>
        <div style={styles.formGrid}>
          {["SSC", "Intermediate", "Diploma", "Graduation", "PG"].map(level => (
            <label key={level} style={styles.formGroup}>
              <input
                type="checkbox"
                name="educationLevels"
                value={level}
                checked={form.educationLevels.includes(level)}
                onChange={handleCheckboxChange}
                style={styles.formCheckbox}
              />
              {level}
            </label>
          ))}
        </div>
        {form.educationLevels.length > 0 && (
          <div style={{...styles.formGrid, gridTemplateColumns:'repeat(5,1fr)', gap:'1.5rem', marginTop:'1rem'}}>
            {form.educationLevels.map(level => (
              <div key={level} style={styles.formGroup}>
                <label>{level} Type</label>
                <select
                  name={`studyType_${level.toLowerCase()}`}
                  value={form[`studyType_${level.toLowerCase()}`] || 'both'}
                  onChange={e => setForm({ ...form, [`studyType_${level.toLowerCase()}`]: e.target.value })}
                  style={styles.formSelect}
                >
                  <option value="both">Both</option>
                  <option value="regular">Regular</option>
                  <option value="correspondence">Correspondence</option>
                </select>
              </div>
            ))}
          </div>
        )}
        {form.educationLevels.length > 0 && (
          <div style={{ marginTop: '0.7rem', color: '#374151', fontSize: '0.98em', fontStyle: 'italic' }}>
            <span style={{ background: '#fef3c7', padding: '0.3em 0.7em', borderRadius: '6px', color: '#92400e' }}>
              Note: <strong>Both</strong> represents <strong>Regular</strong> and <strong>Correspondence</strong>.
            </span>
          </div>
        )}
      </div>
      

      {/* Regular Education */}
      {form.educationLevels.length > 0 && (
        <div style={styles.formSection}>
          <div style={styles.formSectionHeading}>Academic Program Type</div>
          <div style={styles.radioContainer}>
            <label>
              <input
                type="radio"
                name="regularEducation"
                value="Regular"
                checked={form.regularEducation === 'Regular'}
                onChange={handleChange}
                style={styles.formCheckbox}
              />
              Regular
            </label>
            <label>
              <input
                type="radio"
                name="regularEducation"
                value="Non-Regular"
                checked={form.regularEducation === 'Non-Regular'}
                onChange={handleChange}
                style={styles.formCheckbox}
              />
              Non-Regular
            </label>
          </div>
        </div>
      )}

   {/* Step 3: Qualification */}
      {(form.regularEducation === 'Regular' || form.regularEducation === 'Non-Regular') && (
        <div style={{marginBottom: '1.5rem'}}>
          {form.regularEducation === 'Non-Regular' && (
            <>
              <p style={styles.fontsemibold}>Recruiter: "Your education is not regular. Please explain."</p>
              <input
                type="text"
                name="remarks"
                placeholder="Enter remarks (e.g. Distance education, Gap reason)"
                value={form.remarks}
                onChange={handleChange}
                style={styles.formInput}
              />
            </>
          )}

          <p style={styles.fontsemibold}>Recruiter: "What is your highest qualification and completion date?"</p>

          <input
            type="text"
            name="highestQualification"
            placeholder="e.g. B.Tech, MCA"
            value={form.highestQualification}
            onChange={handleChange}
            style={styles.formInput}
          />

          <input
            type="month"
            name="completionDate"
            value={form.completionDate}
            onChange={handleChange}
            style={styles.formInput}
          />
        </div>
      )}


      {/* Step 4: Marital Status */}
      {form.highestQualification && form.completionDate && (
        <div style={styles.formSection}>
          <p style={styles.fontsemibold}>Recruiter: "May I know your marital status?"</p>
          <div style={styles.radioContainer}>
            <label>
              <input type="radio" name="maritalStatus" value="Married"
                     checked={form.maritalStatus === 'Married'} onChange={handleChange} style={styles.formCheckbox}/>
              Married
            </label>
            <label>
              <input type="radio" name="maritalStatus" value="Unmarried"
                     checked={form.maritalStatus === 'Unmarried'} onChange={handleChange} style={styles.formCheckbox}/>
              Unmarried
            </label>
          </div>
        </div>
      )}

      {/* Step 5: Experience & Relocation */}
      {form.maritalStatus && (
        <div style={styles.formSection}>
          <label style={styles.formLabel}>Total Experience</label>
          <input type="text" name="totalExperience" value={form.totalExperience} onChange={handleChange}
                 style={styles.formInput}/>
          <label style={styles.formLabel}>Relevant Experience</label>
          <input type="text" name="relevantExperience" value={form.relevantExperience} onChange={handleChange}
                 style={styles.formInput}/>

          <p style={styles.fontsemibold}>Recruiter: “Could you please tell me your Current City ”</p>
          <label style={styles.formLabel}>Current City</label>
          <input type="text" name="currentCity" value={form.currentCity} onChange={handleChange}
                 style={styles.formInput}/>
          <label style={styles.formLabel}> Job Location</label>
          <input type="text" name="jobLocation" value={form.jobLocation} onChange={handleChange}
                 style={styles.formInput}/>

          {form.currentCity && form.jobLocation && (
            <div style={styles.formSection}>
              <p style={styles.fontsemibold}>Recruiter: “Is this Job Location okay for you?”</p>
              <div style={styles.radioContainer}>
                <label>
                  <input type="radio" name="jobLocationOk" value="Yes"
                         checked={form.jobLocationOk === 'Yes'} onChange={handleChange} style={styles.formCheckbox}/>
                  Yes
                </label>
                <label>
                  <input type="radio" name="jobLocationOk" value="No"
                         checked={form.jobLocationOk === 'No'} onChange={handleChange} style={styles.formCheckbox}/>
                  No
                </label>
              </div>
            </div>
          )}

          {form.jobLocationOk === 'Yes' && form.currentCity === form.jobLocation && (
            <p style={styles.fontsemibold}>Recruiter: “Great! Since your current location and job location are the same, let’s move ahead with your Salary Details.”</p>
          )}

          {form.jobLocationOk === 'Yes' && form.currentCity !== form.jobLocation && (
            <div style={styles.formSection}>
              <p style={styles.fontsemibold}>Recruiter: “Thanks. Since you’ll need to relocate, can I ask a few questions about your relocation plans?”</p>
              <label style={styles.formLabel}>Why are you planning to relocate?</label>
              <input type="text" name="relocationReason" value={form.relocationReason} onChange={handleChange}
                     style={styles.formInput}/>
              <label style={styles.formLabel}>Can your family relocate too?</label>
              <select name="familyRelocate" value={form.familyRelocate} onChange={handleChange}
                      style={styles.formSelect}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label style={styles.formLabel}>Will you relocate alone initially?</label>
              <select name="relocateAlone" value={form.relocateAlone} onChange={handleChange}
                      style={styles.formSelect}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label style={styles.formLabel}>How do you plan to move?</label>
              <textarea name="relocationPlan" value={form.relocationPlan} onChange={handleChange}
                        style={styles.formTextarea}></textarea>
              <label style={styles.formLabel}>Do you need company support for relocation?</label>
              <select name="relocationSupport" value={form.relocationSupport} onChange={handleChange}
                      style={styles.formSelect}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          )}

          {form.jobLocationOk === 'No' && (
            <div style={styles.formSection}>
              <p style={styles.fontsemibold}>
                Recruiter: “Since you haven’t selected if the job location is okay, please provide your preferred location and remarks.”
              </p>

              <label style={styles.formLabel}>Preferred Job Location</label>
              <input
                type="text"
                name="preferredLocation"
                value={form.preferredLocation}
                onChange={handleChange}
                style={styles.formInput}
                placeholder="Enter your preferred location"
              />

              <label style={styles.formLabel}>Remarks / Comments</label>
              <textarea
                name="preferredLocationRemarks"
                value={form.preferredLocationRemarks}
                onChange={handleChange}
                style={styles.formTextarea}
                placeholder="Write your remarks here"
              />

              {(form.preferredLocation || form.preferredLocationRemarks) && (
                <p style={{...styles.fontsemibold, marginTop: '1rem', color: '#065f46' }}>
                  Recruiter: “Thanks! Let’s proceed to the salary details.”
                </p>
              )}
            </div>
          )}

          {form.willingToRelocate === 'Yes' && (
            <div style={styles.formSection}>
              <p style={styles.fontsemibold}>Recruiter: “Thanks. Since you’ll need to relocate, can I ask a few questions about your relocation plans?”</p>
              <label style={styles.formLabel}>Why are you planning to relocate?</label>
              <input type="text" name="relocationReason" value={form.relocationReason} onChange={handleChange}
                     style={styles.formInput}/>
              <label style={styles.formLabel}>Can your family relocate too?</label>
              <select name="familyRelocate" value={form.familyRelocate} onChange={handleChange}
                      style={styles.formSelect}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label style={styles.formLabel}>Will you relocate alone initially?</label>
              <select name="relocateAlone" value={form.relocateAlone} onChange={handleChange}
                      style={styles.formSelect}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label style={styles.formLabel}>How do you plan to move?</label>
              <textarea name="relocationPlan" value={form.relocationPlan} onChange={handleChange}
                        style={styles.formTextarea}></textarea>
              <label style={styles.formLabel}>Do you need company support for relocation?</label>
              <select name="relocationSupport" value={form.relocationSupport} onChange={handleChange}
                      style={styles.formSelect}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* Step 7: Salary Details */}
      {((form.jobLocationOk === 'Yes' && form.currentCity === form.jobLocation) ||
        (form.jobLocationOk === 'Yes' && form.currentCity !== form.jobLocation) || (form.jobLocationOk === 'No' )||
        form.willingToRelocate === 'Yes') && (
        <div style={styles.formSection}>
          <h3 style={styles.h3}>Salary Details</h3>
          <label style={styles.formLabel}>Current CTC (Per Month)</label>
          <input type="number" name="currentCTC" value={form.currentCTC} onChange={handleChange}
                 style={styles.formInput}/>
          <label style={styles.formLabel}>Take Home (Per Month)</label>
          <input type="number" name="takeHome" value={form.takeHome} onChange={handleChange}
                 style={styles.formInput}/>
                  <label style={styles.formLabel}>Variable Salary (Per Month)</label>
  <input
    type="number"
    name="variableSalary"
    value={form.variableSalary}
    onChange={handleChange}
    style={styles.formInput}
  />
          <label style={styles.formLabel}>Expected CTC/Offered salary (Per Month)</label>
          <input type="number" name="expectedCTC" value={form.expectedCTC} onChange={handleChange}
                 style={styles.formInput}/>
        </div>
      )}

      {/* Step 8: Work Status and Offer Details */}
      {form.expectedCTC && (
        <div style={styles.formSection}>
          <h3 style={styles.h3}>Work Status & Offer Details</h3>

          <label style={styles.formLabel}>Work Status</label>
          <select name="workStatus" value={form.workStatus} onChange={handleChange}
                  style={styles.formSelect}>
            <option value="">Select</option>
            <option value="Working">Working</option>
            <option value="Not Working">Not Working</option>
            <option value="Fresher">Fresher</option>
          </select>

          {form.workStatus === 'Not Working' && (
            <div style={styles.formSection}>
              <h3 style={styles.h3}>Dates</h3>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Start Date</label>
                  <input type="date" name="startDate" value={form.startDate} onChange={handleChange} style={styles.formInput} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Last Working Date</label>
                  <input type="date" name="lastWorkingDate" value={form.lastWorkingDate} onChange={handleChange} style={styles.formInput} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Expected Joining Date</label>
                  <input type="date" name="expectedJoiningDate" value={form.expectedJoiningDate} onChange={handleChange} style={styles.formInput} />
                </div>
              </div>
            </div>
          )}

          {form.workStatus === 'Working' && (
            <>
              <label style={styles.formLabel}>Client Company</label>
              <input type="text" name="currentCompany" value={form.currentCompany} onChange={handleChange}
                     style={styles.formInput} />

              <label style={styles.formLabel}>Payroll Company</label>
              <input type="text" name="payrollCompany" value={form.payrollCompany} onChange={handleChange}
                     style={styles.formInput} />

              <label style={styles.formLabel}>Official Notice Period</label>
              <select name="noticePeriod" value={form.noticePeriod} onChange={handleChange}
                      style={styles.formSelect}>
                <option value="">Select</option>
                <option value="Immediate">Immediate</option>
                <option value="15 Days">15 Days</option>
                <option value="30 Days">30 Days</option>
                <option value="60 Days">60 Days</option>
                <option value="90 Days">90 Days</option>
              </select>

              {form.noticePeriod && (
                <div style={styles.formSection}>
                  <h3 style={styles.h3}>Dates</h3>
                  <div style={styles.formGrid}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Start Date</label>
                      <input type="date" name="startDate" value={form.startDate} onChange={handleChange} style={styles.formInput} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Estimated Last Working Date</label>
                      <input type="date" name="estimatedLastWorkingDate" value={form.estimatedLastWorkingDate} onChange={handleChange} style={styles.formInput} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Expected Joining Date</label>
                      <input type="date" name="expectedJoiningDate" value={form.expectedJoiningDate} onChange={handleChange} style={styles.formInput} />
                    </div>
                  </div>
                </div>
              )}

              {form.noticePeriod !== 'Immediate' && (
                <>
                  <label style={styles.formLabel}>Notice Period Status?</label>
                  <select name="shortNoticeReason" value={form.shortNoticeReason} onChange={handleChange}
                          style={styles.formSelect}>
                    <option value="">Select</option>
                    <option value="Resigned">Resigned</option>
                    <option value="Yet to resign">Yet to resign</option>
                    <option value="Serving Notice">Serving Notice</option>
                    <option value="Other">Other</option>
                  </select>

                  {form.shortNoticeReason === 'Yet to resign' && (
                    <>
                      <label style={{...styles.formLabel, marginTop: '0.5rem'}}>Please explain your resignation plan</label>
                      <input
                        type="text"
                        name="resignReason"
                        value={form.resignReason}
                        onChange={handleChange}
                        placeholder="e.g., Planning to resign by end of this month"
                        style={styles.formInput}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}

          {form.workStatus === 'Fresher' && (
            <div style={styles.formSection}>
              <p style={styles.fontsemibold}>Recruiter: "Have you done any internship?"</p>
              <div style={styles.radioContainer}>
                <label>
                  <input type="radio" name="hasInternship" value="Yes"
                         checked={form.hasInternship === 'Yes'} onChange={handleChange} style={styles.formCheckbox} />
                  Yes
                </label>
                <label>
                  <input type="radio" name="hasInternship" value="No"
                         checked={form.hasInternship === 'No'} onChange={handleChange} style={styles.formCheckbox} />
                  No
                </label>
              </div>

              {form.hasInternship === 'Yes' && (
                <>
                  <label style={styles.formLabel}>Internship Company Name</label>
                  <input type="text" name="internshipCompany" value={form.internshipCompany}
                         onChange={handleChange} style={styles.formInput} />

                  <label style={styles.formLabel}>Internship Duration</label>
                  <div style={styles.flexGap}>
                    <input type="date" name="internshipStartDate" value={form.internshipStartDate}
                           onChange={handleChange} style={styles.formInput} />
                    <input type="date" name="internshipEndDate" value={form.internshipEndDate}
                           onChange={handleChange} style={styles.formInput} />
                  </div>
                </>
              )}
            </div>
          )}

          {form.workStatus !== 'Fresher' && (
            <>
              {/* 🔁 Updated Resignation Reason Section */}
              <label style={styles.formLabel}>Reason for Job Changing</label>
              <select
                name="resignationReason"
                value={form.resignationReason}
                onChange={handleChange}
                style={styles.formSelect}
              >
                <option value="">Select</option>
                <option value="Bench">Bench</option>
                <option value="No Project">No Project</option>
                <option value="Not aligned with company goals">Not aligned with company goals</option>
                <option value="Career Growth">Career Growth</option>
                <option value="Less Salary">Less Salary</option>
                <option value="Personal Reasons">Personal Reasons</option>
                <option value="Other">Other</option>
              </select>

              {form.resignationReason === 'Other' && (
                <>
                  <label style={{...styles.formLabel, marginTop: '0.5rem'}}>Please specify your reason</label>
                  <input
                    type="text"
                    name="resignationOtherReason"
                    value={form.resignationOtherReason}
                    onChange={handleChange}
                    placeholder="Enter your custom reason"
                    style={styles.formInput}
                  />
                </>
              )}

              <label style={styles.formLabel}>Do You Have Resignation Proof?</label>
              <select name="hasResignationProof" value={form.hasResignationProof} onChange={handleChange}
                      style={styles.formSelect}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              <label style={styles.formLabel}>Do You Have Any Offers in Hand?</label>
              <select name="offersInHand" value={form.offersInHand} onChange={handleChange}
                      style={styles.formSelect}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              {form.offersInHand === 'Yes' && (
                <input type="text" name="offersInHandDetails" value={form.offersInHandDetails}
                       onChange={handleChange} placeholder="Enter offer details"
                       style={styles.formInput} />
              )}

              <label style={styles.formLabel}>Interviews in Pipeline</label>
              <select name="interviewsInPipeline" value={form.interviewsInPipeline} onChange={handleChange}
                      style={styles.formSelect}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              {form.interviewsInPipeline === 'Yes' && (
                <input type="text" name="interviewsInPipelineDetails"
                       value={form.interviewsInPipelineDetails} onChange={handleChange}
                       placeholder="Enter interview company names"
                       style={styles.formInput} />
              )}
            </>
          )}

          <label style={styles.formLabel}>Why Are You Interested in This Job?</label>
          <textarea name="jobInterestReason" value={form.jobInterestReason} onChange={handleChange}
                    style={styles.formTextarea}></textarea>
        </div>
      )}
    </div>
  );
};

// Main Recruiter Call Form
export default function RecruiterCallForm() {
  const [formData, setFormData] = useState({
    candidateName: '',
    contactNumber: '',
    email: '',
    candidateResponse: '',
    notInterestedReason: '',
    followUpDate: '',
    followUpTime: '',
    markAs: '',
    pitchBetterRole: '',
    askForReference: '',
    referenceName: '',
    referencePhoneNumber: ''
  });

  const [showSections, setShowSections] = useState({
    noResponseSection: false,
    recruiterForm: false,
    closeInteractionSection: false,
    callLaterDetails: false,
    offerPipelineSection: false,
    showReferenceSection: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'candidateResponse') {
      const isNo = value === 'No';
      const isYes = value === 'Yes';
      const isCallLater = value === 'Asked to call later (auto-schedule reminder)';
      const isNoResponseOrDisconnected = ['No response / Wrong Number', 'Disconnected'].includes(value);

      setShowSections({
        noResponseSection: isNo,
        recruiterForm: isYes,
        closeInteractionSection: isNoResponseOrDisconnected || isCallLater,
        callLaterDetails: isCallLater,
        offerPipelineSection: false,
        showReferenceSection: false // Reset when candidateResponse changes
      });

      if (!isNo) {
        setFormData(prev => ({ ...prev, notInterestedReason: '', pitchBetterRole: '' }));
      }
    }

    if (name === 'notInterestedReason') {
      const shouldShowForm = ['Only open to permanent roles', 'Not interested in current job location', 'Salary not matching expectations'].includes(value);
      const isOfferPipeline = value === 'Already got offer / interview pipeline';
      
      setShowSections(prev => ({
        ...prev,
        recruiterForm: shouldShowForm,
        offerPipelineSection: isOfferPipeline,
        showReferenceSection: false, // Reset reference section visibility
      }));

      setFormData(prev => ({ ...prev, pitchBetterRole: '', askForReference: '', referenceName: '', referencePhoneNumber: '' }));
    }

    if (name === 'pitchBetterRole') {
      if (value === 'Yes') {
        // If pitching a better role, and the reason was 'Already got offer / interview pipeline',
        // then show the reference section and hide the main recruiter form.
        if (formData.notInterestedReason === 'Already got offer / interview pipeline') {
          setShowSections(prev => ({ ...prev, showReferenceSection: true, recruiterForm: false }));
        } else {
          // Otherwise, show the main recruiter form
          setShowSections(prev => ({ ...prev, recruiterForm: true, showReferenceSection: false }));
        }
      } else {
        // If not pitching a better role, hide both the main recruiter form and the reference section
        setShowSections(prev => ({ ...prev, recruiterForm: false, showReferenceSection: false }));
        setFormData(prev => ({ ...prev, askForReference: '', referenceName: '', referencePhoneNumber: '' }));
      }
    }

    if (name === 'askForReference' && value === 'No') {
      setFormData(prev => ({ ...prev, referenceName: '', referencePhoneNumber: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Initial Form Data:', formData);
    alert('Initial Form Submitted!');
  };

  const styles = {
    container: { backgroundColor: '#f0f4f8', padding: '2rem', fontFamily: 'Arial, sans-serif', color: '#333' },
    header: { fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', color: '#1a202c' },
    form: { backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxWidth: '60rem', margin: '0 auto' },
    sectionHeader: { fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.5rem', color: '#2d3748', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' },
    formGroup: { marginBottom: '1.5rem' },
    formLabel: { display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#4a5568' },
    formInput: { width: '100%', border: '1px solid #cbd5e0', padding: '0.75rem', borderRadius: '8px', transition: 'border-color 0.2s', boxSizing: 'border-box' },
    radioGroup: { display: 'flex', alignItems: 'center', marginBottom: '0.75rem' },
    radioLabel: { marginLeft: '0.5rem', color: '#4a5568', cursor: 'pointer' },
    formSelect: { width: '100%', border: '1px solid #cbd5e0', padding: '0.75rem', borderRadius: '8px', boxSizing: 'border-box' },
    pipelineSection: { padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#f7fafc', margin: '1.5rem 0' },
    pipelineHeader: { fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2d3748' },
    pipelineText: { marginBottom: '1rem', color: '#4a5568' },
    radioFlex: { display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.5rem' },
    blueButton: { width: '100%', backgroundColor: '#3182ce', color: 'white', padding: '1rem', borderRadius: '8px', border: 'none', fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem' }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={{ textAlign: 'right', marginBottom: 12 }}>
          <a
            href={process.env.PUBLIC_URL + '/HTMLDOCS/recruiter_call_form_docs.html'}
            target="_blank"
            rel="noopener noreferrer"
            className="doc-link-btn"
          >
            View Documentation
          </a>
        </div>
        <h2 className="form-title mb-4">Recruiter Call Form</h2>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Candidate Name:</label>
          <input type="text" name="candidateName" value={formData.candidateName} onChange={handleInputChange} style={styles.formInput} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Contact Number:</label>
          <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} style={styles.formInput} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={styles.formInput} />
        </div>

        <h2 style={styles.sectionHeader}>Candidate Response</h2>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Are you currently looking for a job change?</label>
          {['Yes', 'No', 'No response / Wrong Number', 'Disconnected', 'Asked to call later (auto-schedule reminder)'].map(val => (
            <div key={val} >
              <input type="radio" id={`response${val}`} name="candidateResponse" value={val} checked={formData.candidateResponse === val} onChange={handleInputChange} />
              <label htmlFor={`response${val}`} style={styles.radioLabel}>{val}</label>
            </div>
          ))}
        </div>

        {showSections.noResponseSection && (
          <div style={styles.formGroup}>
            <h2 style={{...styles.sectionHeader, fontSize: '1.25rem', border: 'none'}}>Reason for "Not Interested"</h2>
            <select name="notInterestedReason" value={formData.notInterestedReason} onChange={handleInputChange} style={styles.formSelect}>
              <option value="">-- Select a reason --</option>
              <option value="Not actively looking">Not actively looking</option>
              <option value="Already working and happy">Already working and happy</option>
              <option value="Only open to permanent roles">Only open to permanent roles</option>
              <option value="Not interested in current job location">Not interested in current job location</option>
              <option value="Salary not matching expectations">Salary not matching expectations</option>
              <option value="Already got offer / interview pipeline">Already got offer / interview pipeline</option>
            </select>
          </div>
        )}

        {showSections.offerPipelineSection && (
          <div style={styles.pipelineSection}>
            <h3 style={styles.pipelineHeader}>Offer/Interview Pipeline Details</h3>
            <p style={styles.pipelineText}>Skill is critical. Try to pitch better role?</p>
            <div style={styles.radioFlex}>
              <label style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                <input type="radio" name="pitchBetterRole" value="Yes" checked={formData.pitchBetterRole === 'Yes'} onChange={handleInputChange} style={{ marginRight: '0.5rem' }} />
                Yes
              </label>
              <label style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                <input type="radio" name="pitchBetterRole" value="No" checked={formData.pitchBetterRole === 'No'} onChange={handleInputChange} style={{ marginRight: '0.5rem' }} />
                No
              </label>
            </div>
          </div>
        )}

        {showSections.recruiterForm && <RecruiterForm />}

        {showSections.showReferenceSection && (
          <div style={styles.formGroup}>
            <h3 style={{...styles.sectionHeader, fontSize: '1.25rem', border: 'none'}}>Reference Check</h3>
            <label style={styles.formLabel}>Do you have any references for this job?</label>
            <div style={styles.radioFlex}>
              <label style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                <input type="radio" name="askForReference" value="Yes" checked={formData.askForReference === 'Yes'} onChange={handleInputChange} style={{ marginRight: '0.5rem' }} />
                Yes
              </label>
              <label style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                <input type="radio" name="askForReference" value="No" checked={formData.askForReference === 'No'} onChange={handleInputChange} style={{ marginRight: '0.5rem' }} />
                No
              </label>
            </div>
            {formData.askForReference === 'Yes' && (
              <>
                <input type="text" name="referenceName" value={formData.referenceName} onChange={handleInputChange} style={styles.formInput} placeholder="Reference Name" />
                <input type="tel" name="referencePhoneNumber" value={formData.referencePhoneNumber} onChange={handleInputChange} style={styles.formInput} placeholder="Reference Phone Number" />
              </>
            )}
          </div>
        )}

        {showSections.callLaterDetails && (
          <div style={styles.formGroup}>
            <h3 style={{...styles.sectionHeader, fontSize: '1.25rem', border: 'none'}}>Schedule Follow-up</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={styles.formLabel}>Date:</label>
                <input type="date" name="followUpDate" value={formData.followUpDate} onChange={handleInputChange} style={styles.formInput} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.formLabel}>Time:</label>
                <input type="time" name="followUpTime" value={formData.followUpTime} onChange={handleInputChange} style={styles.formInput} />
              </div>
            </div>
          </div>
        )}

        {showSections.closeInteractionSection && (
          <div style={styles.formGroup}>
            <h2 style={{...styles.sectionHeader, fontSize: '1.25rem', border: 'none'}}>Close Interaction</h2>
            <label style={styles.formLabel}>Mark as:</label>
            <div>
              <div><input type="radio" name="markAs" value="FTE pipeline" checked={formData.markAs === 'FTE pipeline'} onChange={handleInputChange} /><label style={styles.radioLabel}>FTE pipeline</label></div>
              <div><input type="radio" name="markAs" value="Passive pipeline" checked={formData.markAs === 'Passive pipeline'} onChange={handleInputChange} /><label style={styles.radioLabel}>Passive pipeline</label></div>
              <div><input type="radio" name="markAs" value="Immediate match (if any)" checked={formData.markAs === 'Immediate match (if any)'} onChange={handleInputChange} /><label style={styles.radioLabel}>Immediate match (if any)</label></div>
            </div>
          </div>
        )}

        <button type="submit" style={styles.blueButton}>Submit for Lead Review</button>
      </form>
    </div>
  );
}