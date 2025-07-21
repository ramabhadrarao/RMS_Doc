import React, { useState } from "react";
import Select from "react-select";

const LeavePolicyForm = () => {
  const leaveOptions = [
    { value: "EL", label: "Earned Leave (EL)" },
    { value: "SL", label: "Sick Leave (SL)" },
    { value: "CL", label: "Casual Leave (CL)" },
    { value: "Optional", label: "Optional / Floating Leave" },
    { value: "CompOff", label: "Comp-Off" },
    { value: "Maternity", label: "Maternity Leave" },
    { value: "Paternity", label: "Paternity Leave" },
  ];

  const [employmentStage, setEmploymentStage] = useState("post");
  const [selectedLeaves, setSelectedLeaves] = useState([]);
  const [leaveData, setLeaveData] = useState({});
  const handleMultiLeaveSelect = (selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setSelectedLeaves(values);
    const updatedData = { ...leaveData };
    Object.keys(updatedData).forEach((key) => {
      if (!values.includes(key)) {
        delete updatedData[key];
      }
    });
    setLeaveData(updatedData);
  };

  const handleLeaveChange = (type, field, value) => {
    setLeaveData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handleFinalSubmit = () => {
    console.log("Leave Data:", leaveData);
    alert("Leave policies submitted for: " + selectedLeaves.join(", "));
  };

  const expiryCycleOptions = ["Monthly", "Quarterly", "Half-Yearly", "Yearly", "Specific Date"];

  const renderExpiryCycle = (type) => {
    if (type === "Maternity") return null;
    return (
      <>
        <label className="block mt-2">Expiry Cycle:</label>
        <select
          className="input"
          value={leaveData[type]?.expiryCycle || ""}
          onChange={(e) => handleLeaveChange(type, "expiryCycle", e.target.value)}
        >
          <option value="">Select</option>
          {expiryCycleOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {leaveData[type]?.expiryCycle === "Specific Date" && (
          <>
            <label className="block mt-2">Expiry Date:</label>
            <input
              type="date"
              className="input"
              value={leaveData[type]?.expiryDate || ""}
              onChange={(e) => handleLeaveChange(type, "expiryDate", e.target.value)}
            />
          </>
        )}
      </>
    );
  };

  const renderLeaveForm = (type) => {
    const label = leaveOptions.find((x) => x.value === type)?.label;
    return (
      <div key={type} className="mb-6 border p-4 rounded">
        <h2 className="font-semibold mb-2">{label}</h2>

        <label className="block mb-2">
          <input
            type="checkbox"
            checked={leaveData[type]?.enabled || false}
            onChange={(e) => handleLeaveChange(type, "enabled", e.target.checked)}
          />{" "}
          Apply {label}
        </label>

        {leaveData[type]?.enabled && (
          <>
            {['EL', 'SL', 'CL'].includes(type) && (
              <>
                <label className="block mt-2">{type} per Month:</label>
                <input
                  type="number"
                  className="input"
                  value={leaveData[type]?.perMonth || ""}
                  onChange={(e) => handleLeaveChange(type, "perMonth", e.target.value)}
                />
                <label className="block mt-2">Carry Forward?</label>
                <select
                  className="input"
                  value={leaveData[type]?.carryForward || ""}
                  onChange={(e) => handleLeaveChange(type, "carryForward", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {leaveData[type]?.carryForward === "Yes" && (
                  <>
                    <label className="block mt-2">Carry Forward Per Year (Days):</label>
                    <input
                      type="number"
                      className="input"
                      value={leaveData[type]?.carryForwardLimit || ""}
                      onChange={(e) => handleLeaveChange(type, "carryForwardLimit", e.target.value)}
                    />
                  </>
                )}
                <label className="block mt-2">Leave Credit Frequency:</label>
                <select
                  className="input"
                  value={leaveData[type]?.creditFrequency || ""}
                  onChange={(e) => handleLeaveChange(type, "creditFrequency", e.target.value)}
                >
                  <option value="">Select Frequency</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Half-Yearly">Half-Yearly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </>
            )}

            {(type === "EL" || type === "CompOff") && (
              <>
                <label className="block mt-2">Encashable?</label>
                <select
                  className="input"
                  value={leaveData[type]?.encashable || ""}
                  onChange={(e) => handleLeaveChange(type, "encashable", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {leaveData[type]?.encashable === "Yes" && (
                  <p className="text-sm text-gray-600 mt-1">
                    Eligibility: Must complete 1 year of service
                  </p>
                )}
              </>
            )}

            {type === "SL" && (
              <>
                <label className="block mt-2">Medical Certificate Rule:</label>
                <input
                  type="text"
                  className="input"
                  value={leaveData[type]?.medicalRule || ""}
                  onChange={(e) => handleLeaveChange(type, "medicalRule", e.target.value)}
                />
              </>
            )}

            {type === "Optional" && (
              <>
                <label className="block mt-2">Optional Leaves per Year:</label>
                <input
                  type="number"
                  className="input"
                  value={leaveData[type]?.perYear || ""}
                  onChange={(e) => handleLeaveChange(type, "perYear", e.target.value)}
                />
              </>
            )}

            {type === "CompOff" && (
              <>
                <label className="block mt-2">Validity (Days):</label>
                <input
                  type="number"
                  className="input"
                  value={leaveData[type]?.validity || ""}
                  onChange={(e) => handleLeaveChange(type, "validity", e.target.value)}
                />
              </>
            )}

            {type === "Maternity" && (
              <>
                <label className="block mt-2">Duration (Weeks):</label>
                <input
                  type="number"
                  className="input"
                  value={leaveData[type]?.duration || ""}
                  onChange={(e) => handleLeaveChange(type, "duration", e.target.value)}
                />
                <label className="block mt-2">Extension Allowed?</label>
                <select
                  className="input"
                  value={leaveData[type]?.extensionAllowed || ""}
                  onChange={(e) => handleLeaveChange(type, "extensionAllowed", e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <p className="text-sm text-gray-600 mt-1">
                  Eligibility: Must have completed at least 80 working days in the last 12 months
                  (Post-Provision period only)
                </p>
              </>
            )}

            {type === "Paternity" && (
              <>
                <label className="block mt-2">Duration (Days):</label>
                <input
                  type="number"
                  className="input"
                  value={leaveData[type]?.duration || ""}
                  onChange={(e) => handleLeaveChange(type, "duration", e.target.value)}
                />
                <label className="block mt-2">Avail Within (Days from childbirth):</label>
                <input
                  type="number"
                  className="input"
                  value={leaveData[type]?.availWithin || ""}
                  onChange={(e) => handleLeaveChange(type, "availWithin", e.target.value)}
                />
              </>
            )}

            {renderExpiryCycle(type)}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Leave Policy</h1>

      <label className="font-semibold block mb-2">Employee Stage:</label>
      <select
        className="input mb-6"
        value={employmentStage}
        onChange={(e) => setEmploymentStage(e.target.value)}
      >
        <option value="pre">In Probation</option>
        <option value="post">After Probation</option>
      </select>

      <label className="font-semibold">Select Leave Types:</label>
      <Select
        isMulti
        options={leaveOptions}
        value={leaveOptions.filter((opt) => selectedLeaves.includes(opt.value))}
        onChange={handleMultiLeaveSelect}
        className="mb-6"
      />

      {selectedLeaves.map((leave) => renderLeaveForm(leave))}

      {selectedLeaves.length > 0 && (
        <div className="text-right mt-6">
          <button
            onClick={handleFinalSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default LeavePolicyForm;