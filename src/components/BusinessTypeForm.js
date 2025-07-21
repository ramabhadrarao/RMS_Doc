import React, { useState } from 'react';
import '../FormStyles.css';

const BusinessTypeForm = () => {
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({});
  const [calculatedFields, setCalculatedFields] = useState({});

  // Hardcoded values for salary fields
  const RAW_LAST_WITHDRAWN_SALARY = 500000;
  const RAW_OFFERED_SALARY = 1000000;

  const businessTypeConfig = {
    "Contract": {
      inputs: ["last_withdrawn_salary", "offered_salary", "bill_rate"],
      calculations: {
        "hike_per_month": (data) => ((data.offered_salary - data.last_withdrawn_salary) / data.last_withdrawn_salary) * 100,
        "gross_margin_amount": (data) => data.bill_rate - data.offered_salary,
        "gross_margin_percentage": (data) => ((data.bill_rate - data.offered_salary) / data.bill_rate) * 100,
        "leave_cost": (data) => (data.offered_salary / 21) * 1.5,
        "after_leave_cost_margin_amount": (data) => (data.bill_rate - data.offered_salary) - ((data.offered_salary / 21) * 1.5),
        "after_leave_cost_margin_percentage": (data) => (((data.bill_rate - data.offered_salary) - ((data.offered_salary / 21) * 1.5)) / data.bill_rate) * 100
      }
    },
    "Contract MSP": {
      inputs: ["last_withdrawn_salary", "offered_salary", "bill_rate", "msp_fee_percent_on_bill_rate"],
      calculations: {
        "hike_per_month": (data) => ((data.offered_salary - data.last_withdrawn_salary) / data.last_withdrawn_salary) * 100,
        "gross_margin_amount": (data) => data.bill_rate - data.offered_salary,
        "gross_margin_percentage": (data) => ((data.bill_rate - data.offered_salary) / data.bill_rate) * 100,
        "gross_margin_amount_after_msp": (data) => (data.bill_rate - data.offered_salary) - ((data.bill_rate - data.offered_salary) * (data.msp_fee_percent_on_bill_rate / 100)),
        "gross_margin_percentage_after_msp": (data) => (((data.bill_rate - data.offered_salary) - ((data.bill_rate - data.offered_salary) * (data.msp_fee_percent_on_bill_rate / 100))) / data.bill_rate) * 100,
        "leave_cost": (data) => (data.offered_salary / 21) * 1.5,
        "after_leave_cost_margin_amount": (data) => ((data.bill_rate - data.offered_salary) - ((data.bill_rate - data.offered_salary) * (data.msp_fee_percent_on_bill_rate / 100))) - ((data.offered_salary / 21) * 1.5),
        "after_leave_cost_margin_percentage": (data) => ((((data.bill_rate - data.offered_salary) - ((data.bill_rate - data.offered_salary) * (data.msp_fee_percent_on_bill_rate / 100))) - ((data.offered_salary / 21) * 1.5)) / data.bill_rate) * 100
      }
    },
    "Permanent": {
      inputs: ["last_withdrawn_salary", "offered_salary", "bill_rate"],
      calculations: {
        "hike_per_month": (data) => ((data.offered_salary - data.last_withdrawn_salary) / data.last_withdrawn_salary) * 100,
        "billable_amount": (data) => data.bill_rate
      }
    },
    "Permanent MSP": {
      inputs: ["last_withdrawn_salary", "offered_salary", "bill_rate"],
      calculations: {
        "hike_per_month": (data) => ((data.offered_salary - data.last_withdrawn_salary) / data.last_withdrawn_salary) * 100,
        "billable_amount": (data) => data.bill_rate
      }
    }
  };

  const formatLabel = (id) => {
    return id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleInputChange = (fieldId, value) => {
    // For salary fields, ignore input changes
    if (fieldId === 'last_withdrawn_salary' || fieldId === 'offered_salary') return;
    const newFormData = { ...formData, [fieldId]: parseFloat(value) || 0 };
    setFormData(newFormData);
    calculateFields(selectedType, newFormData);
  };

  const calculateFields = (type, data) => {
    if (!type || !businessTypeConfig[type]) return;

    const config = businessTypeConfig[type];
    const newCalculatedFields = {};

    // Use hardcoded values for salary fields in calculations
    const dataWithRawSalaries = {
      ...data,
      last_withdrawn_salary: RAW_LAST_WITHDRAWN_SALARY,
      offered_salary: RAW_OFFERED_SALARY,
    };

    Object.keys(config.calculations).forEach(id => {
      const result = config.calculations[id](dataWithRawSalaries);
      if (isFinite(result)) {
        newCalculatedFields[id] = result.toFixed(2);
      } else {
        newCalculatedFields[id] = '';
      }
    });

    setCalculatedFields(newCalculatedFields);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setFormData({});
    setCalculatedFields({});
  };

  const renderFields = () => {
    if (!selectedType || !businessTypeConfig[selectedType]) return null;

    const config = businessTypeConfig[selectedType];
    let allFields = [...config.inputs, ...Object.keys(config.calculations)];
    // For Permanent MSP, remove msp_fee_percent_on_bill_rate from inputs for UI
    if (selectedType === 'Permanent MSP') {
      allFields = allFields.filter(f => f !== 'msp_fee_percent_on_bill_rate');
    }

    return (
      <div className="fields-grid">
        {allFields.map(fieldId => {
          // Dynamic label for bill_rate
          let labelOverride = null;
          if (fieldId === 'bill_rate' && (selectedType === 'Permanent' || selectedType === 'Permanent MSP')) {
            labelOverride = 'Invoice Value';
          }
          if (fieldId === 'last_withdrawn_salary') {
            return (
              <div key={fieldId} className="field-wrapper">
                <label className="field-label">Last Withdrawn Salary</label>
                <span style={{ display: 'block', padding: '8px 0', fontWeight: 500 }}>₹{RAW_LAST_WITHDRAWN_SALARY.toLocaleString()}</span>
              </div>
            );
          }
          if (fieldId === 'offered_salary') {
            return (
              <>
                <div key={fieldId} className="field-wrapper">
                  <label className="field-label">Offered Salary</label>
                  <span style={{ display: 'block', padding: '8px 0', fontWeight: 500 }}>₹{RAW_OFFERED_SALARY.toLocaleString()}</span>
                </div>
                {selectedType === 'Permanent' && (
                  <div key="client_percent" className="field-wrapper">
                    <label className="field-label">Client %</label>
                    <span style={{ display: 'block', padding: '8px 0', fontWeight: 500 }}>8.5%</span>
                  </div>
                )}
                {selectedType === 'Permanent MSP' && (
                  <div key="aforv_percent" className="field-wrapper">
                    <label className="field-label">AFORV %</label>
                    <span style={{ display: 'block', padding: '8px 0', fontWeight: 500 }}>5%</span>
                  </div>
                )}
              </>
            );
          }
          return (
            <div key={fieldId} className="field-wrapper">
              <label className="field-label" htmlFor={fieldId}>
                {labelOverride || formatLabel(fieldId)}
              </label>
              <input
                type="number"
                id={fieldId}
                name={fieldId}
                placeholder={formatLabel(fieldId)}
                value={config.calculations[fieldId] ? calculatedFields[fieldId] || '' : formData[fieldId] || ''}
                onChange={(e) => handleInputChange(fieldId, e.target.value)}
                disabled={!!config.calculations[fieldId]}
                className={config.calculations[fieldId] ? 'calculated-field' : ''}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="business-type-form">
      <h1>Financial Information</h1>
      
      <div className="form-group">
        <label htmlFor="businessTypeSelect">Select Business Type</label>
        <select 
          id="businessTypeSelect" 
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="">-- Please select --</option>
          <option value="Contract">Contract</option>
          <option value="Contract MSP">Contract MSP</option>
          <option value="Permanent">Permanent</option>
          <option value="Permanent MSP">Permanent MSP</option>
        </select>
      </div>

      {renderFields()}
    </div>
  );
};

export default BusinessTypeForm;
