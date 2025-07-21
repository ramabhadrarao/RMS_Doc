import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../FormStyles.css'
const initialState = {
  jobTitle: '',
  employmentType: '',
  keySkills: [], // { name, experience }
  skillName: '',
  skillExperience: '',
  departmentCategory: '',
  clientDetails: '',
  backgroundCheck: '',
  workMode: 'hybrid',
  hybridNorm: '',
  shiftType: '',
  otherShift: '',
  dayRange: '',
  otherDayRange: '',
  jobLocation: '',
  relocateCandidates: false,
  workExpMin: '',
  workExpMax: '',
  salaryType: '',
  salaryMin: '',
  salaryMax: '',
  variableSalary: '',
  hideSalaryDetails: false,
  companyIndustry: '',
  educationalQualification: '',
  diversity: [],
  perksBenefits: [],
  perkToAdd: '',
  otherPerksBenefits: '',
  jobDescription: '',
  numInterviewRounds: 0,
  interviewRounds: [], // [{name, mode, type}]
  moreVacancy: 'no',
  vacancyCount: '',
  companyName: '',
  companyWebsite: '',
  aboutCompany: '',
  companyAddress: '',
  refreshJob: false,
};

const interviewModes = [
  'Face to face',
  'Telephonic Interview',
  'Video Interview (Online)',
  'Walk-in Interview',
  'Telephonic / Video Call Interview',
];
const interviewTypes = [
  'Screening Interview',
  'Technical Interview',
  'HR Interview',
  'Managerial/Final Interview',
];
const perksOptions = [
  'Health Insurance',
  'Work from Home',
  'Paid Time Off',
  'Provident Fund',
  'Cell Phone Reimbursement',
  'Paid Sick Time',
  'Internet Reimbursement',
  'Food Provided',
  'Commuter Assistance',
  'Life Insurance',
  'Leave Encashment',
  'Flexible Schedule',
  'Other',
];

function AddRequirement() {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  // Handlers for all fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Key Skills logic
  const handleAddSkill = () => {
    if (!form.skillName) return;
    if (form.keySkills.some(s => s.name.toLowerCase() === form.skillName.toLowerCase())) return;
    setForm((prev) => ({
      ...prev,
      keySkills: [
        ...prev.keySkills,
        { name: prev.skillName, experience: prev.skillExperience || null },
      ],
      skillName: '',
      skillExperience: '',
    }));
  };
  const handleRemoveSkill = (idx) => {
    setForm((prev) => ({
      ...prev,
      keySkills: prev.keySkills.filter((_, i) => i !== idx),
    }));
  };

  // Perks logic
  const handleAddPerk = () => {
    if (!form.perkToAdd) return;
    if (form.perksBenefits.includes(form.perkToAdd)) return;
    setForm((prev) => ({
      ...prev,
      perksBenefits: [...prev.perksBenefits, prev.perkToAdd],
      perkToAdd: '',
    }));
  };
  const handleRemovePerk = (idx) => {
    setForm((prev) => ({
      ...prev,
      perksBenefits: prev.perksBenefits.filter((_, i) => i !== idx),
    }));
  };

  // Diversity logic
  const handleDiversityChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      let newArr = prev.diversity.slice();
      if (checked) {
        if (!newArr.includes(value)) newArr.push(value);
      } else {
        newArr = newArr.filter(v => v !== value);
      }
      return { ...prev, diversity: newArr };
    });
  };

  // Interview rounds logic
  const handleNumInterviewRoundsChange = (e) => {
    const num = parseInt(e.target.value, 10) || 0;
    setForm((prev) => ({
      ...prev,
      numInterviewRounds: num,
      interviewRounds: Array.from({ length: num }, (_, i) => prev.interviewRounds[i] || { name: `${i + 1}st Round`, mode: '', type: '' }),
    }));
  };
  const handleInterviewRoundChange = (idx, field, value) => {
    setForm((prev) => {
      const rounds = prev.interviewRounds.slice();
      rounds[idx] = { ...rounds[idx], [field]: value };
      return { ...prev, interviewRounds: rounds };
    });
  };

  // Vacancy logic
  const handleMoreVacancyChange = (e) => {
    setForm((prev) => ({ ...prev, moreVacancy: e.target.value, vacancyCount: '' }));
  };

  // Salary type logic
  const handleSalaryTypeChange = (e) => {
    setForm((prev) => ({ ...prev, salaryType: e.target.value, salaryMin: '', salaryMax: '' }));
  };

  // Work mode logic
  const handleWorkModeChange = (e) => {
    setForm((prev) => ({ ...prev, workMode: e.target.value, hybridNorm: '' }));
  };

  // Shift type logic
  const handleShiftTypeChange = (e) => {
    setForm((prev) => ({ ...prev, shiftType: e.target.value, otherShift: '' }));
  };

  // Day range logic
  const handleDayRangeChange = (e) => {
    setForm((prev) => ({ ...prev, dayRange: e.target.value, otherDayRange: '' }));
  };

  // Perks 'Other' logic
  const showOtherPerks = form.perksBenefits.includes('Other');

  // Save button handler
  const handleSave = (e) => {
    e.preventDefault();
    // You can add validation or API call here if needed
    navigate('/allocate-requirement');
  };

  // Render
  return (
    <form className="modern-form max-w-3xl mx-auto" autoComplete="off">
      <div style={{ textAlign: 'right', marginBottom: 12 }}>
        <a
          href={process.env.PUBLIC_URL + '/HTMLDOCS/add_requirement_docs.html'}
          target="_blank"
          rel="noopener noreferrer"
          className="doc-link-btn"
        >
          View Documentation
        </a>
      </div>
      <h2 className="form-title mb-4">Add Requirement</h2>

      {/* Job Details Section */}
      <div className="form-section">
        <div className="form-section-heading">Job Details</div>
        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="jobTitle" className="required-indicator">Job title / Designation</label>
            <input type="text" id="jobTitle" name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder="Enter a clear & specific title to get better responses" required />
          </div>
          <div className="form-group">
            <label htmlFor="employmentType" className="required-indicator">Employment type</label>
            <select id="employmentType" name="employmentType" value={form.employmentType} onChange={handleChange} required>
              <option value="">Select Employment Type</option>
              <option value="fullTime">Full Time / Permanent</option>
              <option value="contract">Contract / Temporary</option>
              <option value="temporary">Freelance / Self-Employment </option>
            </select>
          </div>
          {/* Client Details and Background Check as per HTML */}
          <div className="form-group">
            <label htmlFor="clientDetails">Client Details</label>
            <select id="clientDetails" name="clientDetails" value={form.clientDetails} onChange={handleChange} required>
              <option value="">Select the client Details</option>
              <option value="TCS">TCS</option>
              <option value="IBM">IBM</option>
              <option value="HCL">HCL</option>
              <option value="Capgemini">Capgemini</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="backgroundCheck">Background Check</label>
            <select id="backgroundCheck" name="backgroundCheck" value={form.backgroundCheck} onChange={handleChange} required>
              <option value="">Select the Background Check</option>
              <option value="Stating - Ending PF Details">Stating - Ending PF Details</option>
            </select>
          </div>
          <div className="form-group">
            <label className="required-indicator">Key skills</label>
            <div className="inline-fields" style={{ marginBottom: 10 }}>
              <input type="text" id="skillNameInput" name="skillName" value={form.skillName} onChange={handleChange} placeholder="Skill Name" style={{ flexGrow: 2 }}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); document.getElementById('skillExperienceInput').focus(); } }}
              />
              <input type="number" id="skillExperienceInput" name="skillExperience" value={form.skillExperience} onChange={handleChange} placeholder="Relevant experience" min="0" style={{ width: 80 }}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
              />
              <button type="button" onClick={handleAddSkill} style={{ padding: '8px 15px', fontSize: 14 }}>Add Skill</button>
            </div>
            <div className="skills-input-container">
              {form.keySkills.map((skill, idx) => (
                <span className="skill-chip" key={idx}>
                  {skill.name}{skill.experience ? ` - ${skill.experience} years Relevant Experience` : ''}
                  <span className="close-btn" onClick={() => handleRemoveSkill(idx)}>&times;</span>
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="departmentCategory" className="required-indicator">Department & Role category</label>
            <input type="text" id="departmentCategory" name="departmentCategory" value={form.departmentCategory} onChange={handleChange} placeholder="Search & select the best matching option" required />
          </div>
          {/* Work mode and hybrid norm */}
          <div className="form-group">
            <label className="required-indicator">Work mode</label>
            <span className="sub-label">Select where the candidate will be working from</span>
            <div className="radio-group">
              <input type="radio" id="workModeHybrid" name="workMode" value="hybrid" checked={form.workMode === 'hybrid'} onChange={handleWorkModeChange} />
              <label htmlFor="workModeHybrid">Hybrid</label>
              <input type="radio" id="workModeRemote" name="workMode" value="remote" checked={form.workMode === 'remote'} onChange={handleWorkModeChange} />
              <label htmlFor="workModeRemote">Remote</label>
              <input type="radio" id="workModeOffice" name="workMode" value="office" checked={form.workMode === 'office'} onChange={handleWorkModeChange} />
              <label htmlFor="workModeOffice">Office</label>
            </div>
            {form.workMode === 'hybrid' && (
              <div className="form-group" style={{ marginTop: 15 }}>
                <label htmlFor="hybridNorm">Hybrid Norm</label>
                <input type="text" id="hybridNorm" name="hybridNorm" value={form.hybridNorm} onChange={handleChange} placeholder="e.g., 3 days in office, 2 days remote" required />
              </div>
            )}
          </div>
          {/* Shift type and other shift */}
          <div className="form-group">
            <label htmlFor="shiftType" className="required-indicator">Shift</label>
            <select id="shiftType" name="shiftType" value={form.shiftType} onChange={handleShiftTypeChange} required>
              <option value="">Select Shift</option>
              <option value="Morning Shift">Early Morning Shift</option>
              <option value="Evening Shift">After-Non Shift</option>
              <option value="Evening Shift">Evening Shift</option>
              <option value="Day shift">Day shift</option>
              <option value="Night Shift">Night Shift</option>
              <option value="Fixed Shift">Fixed Shift</option>
              <option value="Rotational Shift">Rotational Shift</option>
              <option value="UK Shift">UK Shift</option>
              <option value="US Shift">US Shift</option>
              <option value="None">None</option>
              <option value="Other">Other</option>
            </select>
            {form.shiftType === 'Other' && (
              <div className="form-group" style={{ marginTop: 15 }}>
                <label htmlFor="otherShift">Specify Other Shift</label>
                <input type="text" id="otherShift" name="otherShift" value={form.otherShift} onChange={handleChange} placeholder="Enter other shift type" required />
              </div>
            )}
          </div>
          {/* Day range and other day range */}
          <div className="form-group">
            <label htmlFor="dayRange" className="required-indicator">Day range</label>
            <select id="dayRange" name="dayRange" value={form.dayRange} onChange={handleDayRangeChange} required>
              <option value="">Select Day Range</option>
              <option value="Monday to Friday">Monday to Friday</option>
              <option value="Monday to Saturday">Monday to Saturday</option>
              <option value="Weekends Only">Weekends Only</option>
              <option value="None">None</option>
              <option value="Other">Other</option>
            </select>
            {form.dayRange === 'Other' && (
              <div className="form-group" style={{ marginTop: 15 }}>
                <label htmlFor="otherDayRange">Specify Other Day Range</label>
                <input type="text" id="otherDayRange" name="otherDayRange" value={form.otherDayRange} onChange={handleChange} placeholder="Enter other day range" required />
              </div>
            )}
          </div>
          {/* Job location and relocate */}
          <div className="form-group">
            <label htmlFor="jobLocation" className="required-indicator">Job location</label>
            <input type="text" id="jobLocation" name="jobLocation" value={form.jobLocation} onChange={handleChange} placeholder="Search and add locations" required />
          </div>
          <div className="form-group checkbox-group">
            <input type="checkbox" id="relocateCandidates" name="relocateCandidates" checked={form.relocateCandidates} onChange={handleChange} />
            <label htmlFor="relocateCandidates">Include candidates willing to relocate to above location(s)</label>
          </div>
        </div>
      </div>

      {/* Experience & Salary Section */}
      <div className="form-section">
        <div className="form-section-heading">Experience & Salary</div>
        <div className="form-grid">
          {/* workExpMin, workExpMax, salaryType, salaryMin, salaryMax, variableSalary, hideSalaryDetails */}
          <div className="form-group">
            <label className="required-indicator">Work experience (years)</label>
            <div className="inline-fields">
              <input type="number" id="workExpMin" name="workExpMin" value={form.workExpMin} onChange={handleChange} placeholder="Min" min="0" required />
              <span>to</span>
              <input type="number" id="workExpMax" name="workExpMax" value={form.workExpMax} onChange={handleChange} placeholder="Max" min="0" required />
            </div>
          </div>
          {/* Salary range and type */}
          <div className="form-group">
            <label className="required-indicator">Salary range</label>
            <div className="radio-group">
              <input type="radio" id="salaryTypeAnnual" name="salaryType" value="annual" checked={form.salaryType === 'annual'} onChange={handleSalaryTypeChange} />
              <label htmlFor="salaryTypeAnnual">Annual</label>
              <input type="radio" id="salaryTypeMonthly" name="salaryType" value="monthly" checked={form.salaryType === 'monthly'} onChange={handleSalaryTypeChange} />
              <label htmlFor="salaryTypeMonthly">Monthly</label>
            </div>
            <span className="sub-label">Enter the salary offered for this job</span>
            {form.salaryType && (
              <div className="inline-fields salary-range-inputs" style={{ display: 'flex' }}>
                <span>₹</span>
                <input type="number" id="salaryMin" name="salaryMin" value={form.salaryMin} onChange={handleChange} placeholder="Min" min="0" required />
                <span>to</span>
                <input type="number" id="salaryMax" name="salaryMax" value={form.salaryMax} onChange={handleChange} placeholder="Max" min="0" required />
              </div>
            )}
          </div>
          {/* Variable salary */}
          <div className="form-group">
            <label htmlFor="variableSalary">Percentage of salary that is variable</label>
            <input type="number" id="variableSalary" name="variableSalary" value={form.variableSalary} onChange={handleChange} min="0" max="100" />
            <span className="sub-label">Specify the percentage of variable component which is included in the salary above</span>
          </div>
          {/* Hide salary details */}
          <div className="form-group checkbox-group">
            <input type="checkbox" id="hideSalaryDetails" name="hideSalaryDetails" checked={form.hideSalaryDetails} onChange={handleChange} />
            <label htmlFor="hideSalaryDetails">Hide salary details from candidates</label>
          </div>
        </div>
      </div>

      {/* Education & Diversity Section */}
      <div className="form-section">
        <div className="form-section-heading">Education & Diversity</div>
        <div className="form-grid">
          {/* educationalQualification, diversity checkboxes */}
          <div className="form-group">
            <label htmlFor="educationalQualification" className="required-indicator">Educational qualification</label>
            <input type="text" id="educationalQualification" name="educationalQualification" value={form.educationalQualification} onChange={handleChange} placeholder="Add educational qualification" required />
          </div>
          {/* Diversity checkboxes */}
          <div className="form-group">
            <label>Select groups you prefer to hire from</label>
            <div className="checkbox-group">
              <input type="checkbox" id="diversityAll" name="diversity" value="All" checked={form.diversity.includes('All')} onChange={handleDiversityChange} />
              <label htmlFor="diversityAll">All</label>
              <input type="checkbox" id="diversityMale" name="diversity" value="Male" checked={form.diversity.includes('Male')} onChange={handleDiversityChange} />
              <label htmlFor="diversityMale">Male</label>
              <input type="checkbox" id="diversityFemale" name="diversity" value="Female" checked={form.diversity.includes('Female')} onChange={handleDiversityChange} />
              <label htmlFor="diversityFemale">Female</label>
              <input type="checkbox" id="diversityWomenReturning" name="diversity" value="womenReturning" checked={form.diversity.includes('womenReturning')} onChange={handleDiversityChange} />
              <label htmlFor="diversityWomenReturning">Women returning to work</label>
              <input type="checkbox" id="diversityDifferentlyAbled" name="diversity" value="differentlyAbled" checked={form.diversity.includes('differentlyAbled')} onChange={handleDiversityChange} />
              <label htmlFor="diversityDifferentlyAbled">Differently-abled</label>
            </div>
          </div>
        </div>
      </div>

      {/* Perks & Benefits Section */}
      <div className="form-section">
        <div className="form-section-heading">Perks & Benefits</div>
        <div className="form-grid">
          {/* perksBenefits chips, otherPerksBenefits */}
          <div className="form-group">
            <label htmlFor="perksBenefitsInput">Add perks and benefits</label>
            <div className="inline-fields" style={{ marginBottom: 10 }}>
              <select id="perksBenefitsInput" name="perkToAdd" value={form.perkToAdd} onChange={handleChange} style={{ flexGrow: 2 }}>
                <option value="">Select a perk or benefit</option>
                {perksOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <button type="button" onClick={handleAddPerk} style={{ padding: '8px 15px', fontSize: 14 }}>Add</button>
            </div>
            <div className="skills-input-container">
              {form.perksBenefits.map((perk, idx) => (
                <span className="skill-chip" key={idx}>
                  {perk}
                  <span className="close-btn" onClick={() => handleRemovePerk(idx)}>&times;</span>
                </span>
              ))}
            </div>
            {showOtherPerks && (
              <div className="form-group" style={{ marginTop: 15 }}>
                <label htmlFor="otherPerksBenefits">Specify Other Perk/Benefit</label>
                <input type="text" id="otherPerksBenefits" name="otherPerksBenefits" value={form.otherPerksBenefits} onChange={handleChange} placeholder="Enter other perk or benefit" required />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Description Section */}
      <div className="form-section">
        <div className="form-section-heading">Job Description</div>
        <div className="form-grid">
          {/* jobDescription textarea */}
          <div className="form-group">
            <label htmlFor="jobDescription" className="required-indicator">Job description</label>
            <textarea id="jobDescription" name="jobDescription" value={form.jobDescription} onChange={handleChange} placeholder="Role & responsibilities" required />
            <span className="sub-label">Preferred candidate profile</span>
          </div>
        </div>
      </div>

      {/* Interview Rounds Section */}
      <div className="form-section">
        <div className="form-section-heading">Interview Rounds</div>
        <div className="form-grid">
          {/* numInterviewRounds, interviewRounds dynamic fields */}
          <div className="form-group">
            <label htmlFor="numInterviewRounds" className="required-indicator">Number of Interview Rounds</label>
            <input type="number" id="numInterviewRounds" name="numInterviewRounds" min="0" value={form.numInterviewRounds} onChange={handleNumInterviewRoundsChange} />
          </div>
          {form.numInterviewRounds > 0 && (
            <div id="interviewRoundsContainer">
              {form.interviewRounds.map((round, idx) => (
                <div className="form-group" key={idx} style={{ border: '1px solid #eee', padding: 15, marginTop: 15, borderRadius: 5 }}>
                  <div className="inline-fields" style={{ gap: 10, alignItems: 'center' }}>
                    <input type="text" name={`interviewRoundName_${idx + 1}`} value={round.name} onChange={e => handleInterviewRoundChange(idx, 'name', e.target.value)} placeholder="e.g., 1st Round" style={{ flexGrow: 1 }} />
                    <select name={`interviewMode_${idx + 1}`} value={round.mode} onChange={e => handleInterviewRoundChange(idx, 'mode', e.target.value)} required style={{ flexGrow: 1 }}>
                      <option value="">Interview Mode</option>
                      {interviewModes.map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </select>
                    <select name={`interviewType_${idx + 1}`} value={round.type} onChange={e => handleInterviewRoundChange(idx, 'type', e.target.value)} required style={{ flexGrow: 1 }}>
                      <option value="">Interview Type</option>
                      {interviewTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Vacancy Section */}
      <div className="form-section">
        <div className="form-section-heading">Vacancy</div>
        <div className="form-grid">
          {/* moreVacancy, vacancyCount */}
          <div className="form-group">
            <label className="required-indicator">Do you have more than one vacancy for this job?</label>
            <div className="radio-group">
              <input type="radio" id="moreVacancyYes" name="moreVacancy" value="yes" checked={form.moreVacancy === 'yes'} onChange={handleMoreVacancyChange} required />
              <label htmlFor="moreVacancyYes">Yes</label>
              <input type="radio" id="moreVacancyNo" name="moreVacancy" value="no" checked={form.moreVacancy === 'no'} onChange={handleMoreVacancyChange} />
              <label htmlFor="moreVacancyNo">No</label>
            </div>
            {form.moreVacancy === 'yes' && (
              <div className="form-group" style={{ marginTop: 15 }}>
                <label htmlFor="vacancyCount">How many vacancies for this job?</label>
                <input type="number" id="vacancyCount" name="vacancyCount" value={form.vacancyCount} onChange={handleChange} min="1" placeholder="Enter number of vacancies" required />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Company Info Section */}
      <div className="form-section">
        <div className="form-section-heading">Company Info</div>
        <div className="form-grid">
          {/* companyName, companyWebsite, aboutCompany, companyAddress */}
          <div className="form-group">
            <label htmlFor="companyName" className="required-indicator">Company name</label>
            <input type="text" id="companyName" name="companyName" value={form.companyName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="companyWebsite">Add company website</label>
            <input type="text" id="companyWebsite" name="companyWebsite" value={form.companyWebsite} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="aboutCompany" className="required-indicator">About company</label>
            <textarea id="aboutCompany" name="aboutCompany" value={form.aboutCompany} onChange={handleChange} placeholder="Mention about your company profile, things you would want to highlight to jobseekers" required />
          </div>
          <div className="form-group">
            <label htmlFor="companyAddress">Company's address</label>
            <textarea id="companyAddress" name="companyAddress" value={form.companyAddress} onChange={handleChange} placeholder="Add client company address" />
          </div>
          {/* Refresh job */}
          <div className="form-group checkbox-group">
            <input type="checkbox" id="refreshJob" name="refreshJob" checked={form.refreshJob} onChange={handleChange} />
            <label htmlFor="refreshJob">Refresh this job automatically at defined intervals of time. Schedule refresh</label>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="form-section">
        <div className="form-grid">
          <div className="button-group">
            <button type="submit">Save</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddRequirement; 