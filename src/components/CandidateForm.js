import React from 'react'
import CandidatePersonalDetails from '../components/CandidatePersonalDetails';
import EducationDetails from '../components/EducationDetails';
import EmploymentDetails from '../components/EmploymentDetails';
import KYCCandidate from '../components/KYCCandidate';
import BusinessTypeForm from "../components/BusinessTypeForm"
export default function CandidateForm() {
  return (
    <div>
        <div style={{ textAlign: 'right', marginBottom: 12 }}>
          <a
            href={process.env.PUBLIC_URL + '/HTMLDOCS/candidate_details_workflow_docs.html'}
            target="_blank"
            rel="noopener noreferrer"
            className="doc-link-btn"
          >
            View Documentation
          </a>
        </div>
        <h2 className="form-title mb-4">Candidate Form</h2>
        <CandidatePersonalDetails />
        <EducationDetails />
        <EmploymentDetails />
        <KYCCandidate />
        <BusinessTypeForm/>
      
    </div>
  )
}
