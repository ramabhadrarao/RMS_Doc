import React, { useState } from 'react';

const sampleData = {
  recruiters: ['Recruiter 1', 'Recruiter 2', 'Recruiter 3', 'Recruiter 4', 'Recruiter 5'],
  teams: [
    {
      lead: 'Team Lead 1',
      members: ['Recruiter 1.1', 'Recruiter 1.2', 'Recruiter 1.3']
    },
    {
      lead: 'Team Lead 2',
      members: ['Recruiter 2.1', 'Recruiter 2.2', 'Recruiter 2.3']
    },
    {
      lead: 'Team Lead 3',
      members: ['Recruiter 3.1', 'Recruiter 3.2', 'Recruiter 3.3']
    }
  ],
  freelancers: ['Freelancer 1', 'Freelancer 2'],
  vendors: ['Vendor 1', 'Vendor 2']
};

function AllocateRequirement() {
  const [allocate, setAllocate] = useState({
    all: false,
    recruiters: false,
    teams: false,
    freelancers: false,
    vendors: false
  });
  const [selected, setSelected] = useState({
    recruiters: [],
    teams: {}, // {lead: bool, members: []}
    freelancers: [],
    vendors: []
  });

  // Handle main allocation checkboxes
  const handleAllocateChange = (e) => {
    const { value, checked } = e.target;
    if (value === 'all') {
      setAllocate({
        all: checked,
        recruiters: checked,
        teams: checked,
        freelancers: checked,
        vendors: checked
      });
    } else {
      setAllocate((prev) => ({ ...prev, [value]: checked, all: false }));
    }
  };

  // Handle recruiters/freelancers/vendors checkboxes
  const handleListChange = (type, name) => {
    setSelected((prev) => {
      let arr = prev[type];
      if (arr.includes(name)) {
        arr = arr.filter((n) => n !== name);
      } else {
        arr = [...arr, name];
      }
      return { ...prev, [type]: arr };
    });
  };

  // Handle teams checkboxes
  const handleTeamLeadChange = (lead) => {
    setSelected((prev) => {
      const teams = { ...prev.teams };
      teams[lead] = teams[lead] || { lead: false, members: [] };
      teams[lead].lead = !teams[lead].lead;
      return { ...prev, teams };
    });
  };
  const handleTeamMemberChange = (lead, member) => {
    setSelected((prev) => {
      const teams = { ...prev.teams };
      teams[lead] = teams[lead] || { lead: false, members: [] };
      if (teams[lead].members.includes(member)) {
        teams[lead].members = teams[lead].members.filter((m) => m !== member);
      } else {
        teams[lead].members = [...teams[lead].members, member];
      }
      return { ...prev, teams };
    });
  };

  // Render
  return (
    <div className="container" style={{ maxWidth: 600, margin: 'auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 12px #0001', padding: 32 }}>
      <form className="modern-form max-w-3xl mx-auto" autoComplete="off">
        <div style={{ textAlign: 'right', marginBottom: 12 }}>
          <a
            href={process.env.PUBLIC_URL + '/HTMLDOCS/allocate_requirement_workflow_docs.html'}
            target="_blank"
            rel="noopener noreferrer"
            className="doc-link-btn"
          >
            View Documentation
          </a>
        </div>
        <h2 className="form-title mb-4">Allocate Requirement</h2>
        <div className="form-section" style={{ marginBottom: 28 }}>
          <label style={{ fontWeight: 600, fontSize: 18, marginBottom: 10, display: 'block' }}>Allocate to:</label>
          <div className="checkbox-group" style={{ gap: 24, flexWrap: 'wrap', display: 'flex', marginTop: 10 }}>
            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" id="all" name="allocate" value="all" checked={allocate.all} onChange={handleAllocateChange} /> All
            </label>
            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" id="recruiters" name="allocate" value="recruiters" checked={allocate.recruiters} onChange={handleAllocateChange} /> Recruiters
            </label>
            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" id="teams" name="allocate" value="teams" checked={allocate.teams} onChange={handleAllocateChange} /> Teams
            </label>
            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" id="freelancers" name="allocate" value="freelancers" checked={allocate.freelancers} onChange={handleAllocateChange} /> Freelancers
            </label>
            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" id="vendors" name="allocate" value="vendors" checked={allocate.vendors} onChange={handleAllocateChange} /> Vendors
            </label>
          </div>
        </div>
        {/* Recruiters */}
        {allocate.recruiters && (
          <div className="form-section card" style={{ marginBottom: 24, background: '#f8fafc', borderRadius: 8, padding: 18, boxShadow: '0 1px 4px #0001' }}>
            <div style={{ fontWeight: 600, marginBottom: 10 }}>Recruiters</div>
            <div className="checkbox-list" style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
              {sampleData.recruiters.map((name) => (
                <label className="checkbox-item" key={name} style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 140 }}>
                  <input type="checkbox" id={name} checked={selected.recruiters.includes(name)} onChange={() => handleListChange('recruiters', name)} />
                  {name}
                </label>
              ))}
            </div>
          </div>
        )}
        {/* Teams */}
        {allocate.teams && (
          <div className="form-section card" style={{ marginBottom: 24, background: '#f8fafc', borderRadius: 8, padding: 18, boxShadow: '0 1px 4px #0001' }}>
            <div style={{ fontWeight: 600, marginBottom: 10 }}>Teams</div>
            <div className="checkbox-list" style={{ display: 'flex', flexDirection: 'column' }}>
              {sampleData.teams.map((team) => (
                <div key={team.lead} style={{ marginBottom: 8 }}>
                  <div className="team-lead checkbox-item" >
                    <input type="checkbox" id={team.lead} checked={selected.teams[team.lead]?.lead || false} onChange={() => handleTeamLeadChange(team.lead)} />
                    {team.lead}
                  </div>
                  <div className="team-members" style={{  display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {team.members.map((member) => (
                      <label className="checkbox-item" key={member} style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 120 }}>
                        <input type="checkbox" id={member} checked={selected.teams[team.lead]?.members?.includes(member) || false} onChange={() => handleTeamMemberChange(team.lead, member)} />
                        {member}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Freelancers */}
        {allocate.freelancers && (
          <div className="form-section card" style={{ marginBottom: 24, background: '#f8fafc', borderRadius: 8, padding: 18, boxShadow: '0 1px 4px #0001' }}>
            <div style={{ fontWeight: 600, marginBottom: 10 }}>Freelancers</div>
            <div className="checkbox-list" style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
              {sampleData.freelancers.map((name) => (
                <label className="checkbox-item" key={name} style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 140 }}>
                  <input type="checkbox" id={name} checked={selected.freelancers.includes(name)} onChange={() => handleListChange('freelancers', name)} />
                  {name}
                </label>
              ))}
            </div>
          </div>
        )}
        {/* Vendors */}
        {allocate.vendors && (
          <div className="form-section card" style={{ marginBottom: 24, background: '#f8fafc', borderRadius: 8, padding: 18, boxShadow: '0 1px 4px #0001' }}>
            <div style={{ fontWeight: 600, marginBottom: 10 }}>Vendors</div>
            <div className="checkbox-list" style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
              {sampleData.vendors.map((name) => (
                <label className="checkbox-item" key={name} style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 140 }}>
                  <input type="checkbox" id={name} checked={selected.vendors.includes(name)} onChange={() => handleListChange('vendors', name)} />
                  {name}
                </label>
              ))}
            </div>
          </div>
        )}
        <div className="button-group" style={{ textAlign: 'center', marginTop: 32 }}>
          <button type="submit" style={{ background: '#22c55e', color: '#fff', fontWeight: 600, fontSize: 18, border: 'none', borderRadius: 6, padding: '12px 32px', cursor: 'pointer' }}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AllocateRequirement; 