// import React, { useState } from 'react';
// import '../FormStyles.css';

// const initialFormData = {
//   firstName: '',
//   middleName: '',
//   lastName: '',
//   dateOfBirth: '',
//   gender: 'Male',
//   maritalStatus: 'Single',
//   phone: '',
//   alternatePhone: '',
//   email: '',
//   emergencyContact: '',
//   emergencyPhone: '',
//   emergencyRelation: '',
//   passportImage: null,
// };

// const CandidatePersonalDetails = () => {
//   const [formData, setFormData] = useState(initialFormData);
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === 'file') {
//       setFormData((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.firstName) newErrors.firstName = 'First Name is required';
//     if (!formData.lastName) newErrors.lastName = 'Last Name is required';
//     if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
//     if (!formData.gender) newErrors.gender = 'Gender is required';
//     if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital Status is required';
//     if (!formData.phone) newErrors.phone = 'Phone is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!formData.emergencyContact) newErrors.emergencyContact = 'Contact Person is required';
//     if (!formData.emergencyPhone) newErrors.emergencyPhone = 'Contact Phone is required';
//     if (!formData.emergencyRelation) newErrors.emergencyRelation = 'Relationship is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setSuccess(true);
//     setTimeout(() => setSuccess(false), 3000);
//     setFormData(initialFormData);
//     setErrors({});
//   };

//   return (
//     <form className="candidate-personal-details-form" onSubmit={handleSubmit} autoComplete="off">
//       <h2>Candidate Personal Details</h2>
//       {/* Name Section */}
//       <div className="form-section">
//         <h3 className="form-section-heading">Personal Information</h3>
//         <div className="form-grid" >
//           <div className="form-group" >
//             <label htmlFor="firstName">First Name</label>
//             <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
//             {errors.firstName && <div className="error-text">{errors.firstName}</div>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="middleName">Middle Name (Optional)</label>
//             <input type="text" id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName">Last Name</label>
//             <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
//             {errors.lastName && <div className="error-text">{errors.lastName}</div>}
//           </div>
//         </div>
     
//         <div className="form-grid" style={{marginTop:'25px'}}>
//           <div className="form-group">
//             <label htmlFor="dateOfBirth">Date of Birth</label>
//             <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
//             {errors.dateOfBirth && <div className="error-text">{errors.dateOfBirth}</div>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="gender">Gender</label>
//             <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             {errors.gender && <div className="error-text">{errors.gender}</div>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="maritalStatus">Marital Status</label>
//             <select id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
//               <option value="">Select Status</option>
//               <option value="Single">Single</option>
//               <option value="Married">Married</option>
//             </select>
//             {errors.maritalStatus && <div className="error-text">{errors.maritalStatus}</div>}
//           </div>
//         </div>
      
//         <div className="form-grid" style={{marginTop:'25px'}}>
//           <div className="form-group">
//             <label htmlFor="passportImage">Upload Passport Image</label>
//             <input type="file" id="passportImage" name="passportImage" accept="image/*" onChange={handleChange} />
//             {formData.passportImage && <span className="file-name">{formData.passportImage.name}</span>}
//           </div>
//         </div>
//       </div>
//       {/* Contact Info Section */}
//       <div className="form-section">
//         <h3 className="form-section-heading">Contact Information</h3>
//         <div className="form-grid">
//           <div className="form-group">
//             <label htmlFor="phone">Phone</label>
//             <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
//             {errors.phone && <div className="error-text">{errors.phone}</div>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="alternatePhone">Alternate Phone (Optional)</label>
//             <input type="tel" id="alternatePhone" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
//             {errors.email && <div className="error-text">{errors.email}</div>}
//           </div>
//         </div>
//       </div>
//       {/* Emergency Contact Section */}
//       <div className="form-section">
//         <h3 className="form-section-heading">Emergency Contact</h3>
//         <div className="form-grid">
//           <div className="form-group">
//             <label htmlFor="emergencyContact">Contact Person</label>
//             <input type="text" id="emergencyContact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
//             {errors.emergencyContact && <div className="error-text">{errors.emergencyContact}</div>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="emergencyPhone">Contact Phone</label>
//             <input type="tel" id="emergencyPhone" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} required />
//             {errors.emergencyPhone && <div className="error-text">{errors.emergencyPhone}</div>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="emergencyRelation">Relationship</label>
//             <input type="text" id="emergencyRelation" name="emergencyRelation" value={formData.emergencyRelation} onChange={handleChange} required />
//             {errors.emergencyRelation && <div className="error-text">{errors.emergencyRelation}</div>}
//           </div>
//         </div>
//       </div>
//       {/* Submit Button */}
//       <div className="button-container">
//         <button type="submit" className="submit-btn">Save Personal Details</button>
//       </div>
//       {success && <div className="toast show success">Candidate Personal Details Saved Successfully!</div>}
//     </form>
//   );
// };

// export default CandidatePersonalDetails;
import React, { useState } from 'react';
import '../FormStyles.css';

const initialFormData = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  gender: 'Male',
  maritalStatus: 'Single',
  phone: '',
  whatsappNumber: '',
  alternatePhone: '',
  email: '',
  emergencyContact: '',
  emergencyPhone: '',
  emergencyRelation: '',
  passportImage: null,
};

const CandidatePersonalDetails = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isWhatsappSameAsPhone, setIsWhatsappSameAsPhone] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital Status is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!isWhatsappSameAsPhone && !formData.whatsappNumber) {
      newErrors.whatsappNumber = 'WhatsApp Number is required';
    }
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.emergencyContact) newErrors.emergencyContact = 'Contact Person is required';
    if (!formData.emergencyPhone) newErrors.emergencyPhone = 'Contact Phone is required';
    if (!formData.emergencyRelation) newErrors.emergencyRelation = 'Relationship is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const finalData = {
      ...formData,
      whatsappNumber: isWhatsappSameAsPhone ? formData.phone : formData.whatsappNumber,
    };

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setFormData(initialFormData);
    setErrors({});
    setIsWhatsappSameAsPhone(true);
  };

  return (
    <form className="candidate-personal-details-form" onSubmit={handleSubmit} autoComplete="off">
      <h2>Candidate Personal Details</h2>

      {/* Personal Info Section */}
      <div className="form-section">
        <h3 className="form-section-heading">Personal Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            {errors.firstName && <div className="error-text">{errors.firstName}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="middleName">Middle Name (Optional)</label>
            <input type="text" id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            {errors.lastName && <div className="error-text">{errors.lastName}</div>}
          </div>
        </div>

        <div className="form-grid" style={{ marginTop: '25px' }}>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            {errors.dateOfBirth && <div className="error-text">{errors.dateOfBirth}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <div className="error-text">{errors.gender}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="maritalStatus">Marital Status</label>
            <select id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
            {errors.maritalStatus && <div className="error-text">{errors.maritalStatus}</div>}
          </div>
        </div>

        <div className="form-grid" style={{ marginTop: '25px' }}>
          <div className="form-group">
            <label htmlFor="passportImage">Upload Passport Image</label>
            <input type="file" id="passportImage" name="passportImage" accept="image/*" onChange={handleChange} />
            {formData.passportImage && <span className="file-name">{formData.passportImage.name}</span>}
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="form-section">
        <h3 className="form-section-heading">Contact Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            {errors.phone && <div className="error-text">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={isWhatsappSameAsPhone}
                onChange={() => {
                  setIsWhatsappSameAsPhone(!isWhatsappSameAsPhone);
                  setFormData((prev) => ({ ...prev, whatsappNumber: '' }));
                }}
              />
              WhatsApp number is the same as phone number
            </label>
          </div>

          {!isWhatsappSameAsPhone && (
            <div className="form-group">
              <label htmlFor="whatsappNumber">WhatsApp Number</label>
              <input
                type="tel"
                id="whatsappNumber"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                required
              />
              {errors.whatsappNumber && <div className="error-text">{errors.whatsappNumber}</div>}
            </div>
          )}

          {isWhatsappSameAsPhone && (
            <div className="form-group">
              <label htmlFor="alternatePhone">Alternate Phone (Optional)</label>
              <input
                type="tel"
                id="alternatePhone"
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>
        </div>
      </div>

      {/* Emergency Contact Section */}
      <div className="form-section">
        <h3 className="form-section-heading">Emergency Contact</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="emergencyContact">Contact Person</label>
            <input type="text" id="emergencyContact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
            {errors.emergencyContact && <div className="error-text">{errors.emergencyContact}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="emergencyPhone">Contact Phone</label>
            <input type="tel" id="emergencyPhone" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} required />
            {errors.emergencyPhone && <div className="error-text">{errors.emergencyPhone}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="emergencyRelation">Relationship</label>
            <input type="text" id="emergencyRelation" name="emergencyRelation" value={formData.emergencyRelation} onChange={handleChange} required />
            {errors.emergencyRelation && <div className="error-text">{errors.emergencyRelation}</div>}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="button-container">
        <button type="submit" className="submit-btn">Save Personal Details</button>
      </div>
      {success && <div className="toast show success">Candidate Personal Details Saved Successfully!</div>}
    </form>
  );
};

export default CandidatePersonalDetails;