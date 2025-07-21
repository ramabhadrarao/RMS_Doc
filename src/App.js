import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

import AddclientsATS from './components/AddclientsATS';
import AddBGVVendor from './components/AddBGVVendor';
 import CandidateForm from './components/CandidateForm';
import ClientDetailsForm from './components/ClientDetailsForm';
import EducationDetails from './components/EducationDetails';
import LeavePolicyForm from './components/LeavePolicyForclients';
import EmploymentDetails from './components/EmploymentDetails';
import RecruiterWorkflowSatgeone from './components/RecruiterWorkflowSatgeone';
import AddRequirement from './components/AddRequirement';
import AllocateRequirement from './components/AllocateRequirement';
import RecruiterForm from './components/RecruiterCallForm';
import KYCCandidate from './components/KYCCandidate'
import FreelanceRecruiterOnboarding from './components/FreelanceRecruiterOnboarding';
import AgencyOnboarding from './components/AgencyOnboarding';

function App() {
  return (
    
    <Router>
      <div className="App">
        <div className="sidebar">
          <h3>Forms</h3>
          <ul>
            <li className="highlight-nav"><Link to="/client-details-form" >Client Details</Link></li>
            <li className="highlight-nav"><Link to="/BGV-Vendor-details-form" >BGV Vendor Details</Link></li>
            <li className="highlight-nav"><Link to="/add-requirement">Add Requirement</Link></li>
            <li className="highlight-nav"><Link to="/allocate-requirement">Allocate Requirement</Link></li>
            <li className="highlight-nav"><Link to="/candidate-details">Candidate Details</Link></li>
            <li className="highlight-nav"><Link to="/recruiter-call-form">Recruiter Call Form</Link></li>
            <li className="highlight-nav"><Link to="/freelance-recruiter-onboarding">Freelance Recruiter Onboarding</Link></li>
            <li className="highlight-nav"><Link to="/agency-onboarding">Agency Onboarding</Link></li>

           {/* <li className="highlight-nav"><Link to="/education-details">Education Details</Link></li> */}
            {/* <li className="highlight-nav"><Link to="/employment-details">Employment Details</Link></li> */}
            {/* <li className="pending-nav"><Link to="/business-type-form">Business Type Form</Link></li> */}
            {/* <li className="pending-nav"><Link to="/leave-policy-form">Leave Policy Form</Link></li> */}
            {/* <li className="pending-nav"><Link to="/recruiter-workflow-stage-one">Recruiter Workflow Stage One</Link></li> */}
            {/* <li className="pending-nav"><Link to="/add-clients-ats">Client Bussiness type</Link></li> */}
           </ul>
        </div>
        <div className="content">
          <Routes>
          <Route path="/recruiter-call-form" element={<RecruiterForm />} />
          <Route path="/KYC" element={<KYCCandidate/>} />
            {/* <Route path="/add-clients-ats" element={<AddclientsATS />} /> */}
            {/* <Route path="/business-type-form" element={<BusinessTypeForm />} /> */}
            <Route path="/candidate-details" element={<CandidateForm />} />
            <Route path="/client-details-form" element={<ClientDetailsForm />} />
            <Route path="/BGV-Vendor-details-form" element={<AddBGVVendor />} />
            {/* <Route path="/leave-policy-form" element={<LeavePolicyForm />} /> */}
            <Route path="/education-details" element={<EducationDetails />} />
            <Route path="/employment-details" element={<EmploymentDetails />} />
            {/* <Route path="/recruiter-workflow-stage-one" element={<RecruiterWorkflowSatgeone />} /> */}
            <Route path="/add-requirement" element={<AddRequirement />} />
            <Route path="/allocate-requirement" element={<AllocateRequirement />} />
            <Route path="/freelance-recruiter-onboarding" element={<FreelanceRecruiterOnboarding />} />
            <Route path="/agency-onboarding" element={<AgencyOnboarding />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;