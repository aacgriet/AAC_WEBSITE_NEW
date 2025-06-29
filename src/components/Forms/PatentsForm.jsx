// // src/components/Forms/PatentsForm.jsx - Updated with fixed date input (no default)
// import React, { useState, useEffect } from 'react';
// import BaseForm, { FormField, TextAreaField, SelectField, ArrayField } from './BaseForm';
// import ImageUpload from './ImageUpload';
// import { useDatabase } from '@/hooks/useDatabase';

// const PATENT_OFFICES = [
//   'India',
//   'USA',
//   'Europe',
//   'China',
//   'Japan',
//   'Other'
// ];

// const PATENT_STATUSES = [
//   'Published Online',
//   'Pending',
//   'Approved',
//   'Granted',
//   'Rejected',
//   'Withdrawn'
// ];

// const PATENT_CATEGORIES = [
//   'Healthcare',
//   'Assistive Technology',
//   'IoT',
//   'Robotics',
//   'Machine Learning',
//   'Software',
//   'Hardware',
//   'Communication',
//   'Security',
//   'Other'
// ];

// const PATENT_COLORS = [
//   { value: 'purple', label: 'Purple' },
//   { value: 'blue', label: 'Blue' },
//   { value: 'green', label: 'Green' },
//   { value: 'red', label: 'Red' },
//   { value: 'orange', label: 'Orange' }
// ];

// const PatentsForm = ({ patentId = null, onSuccess, onCancel }) => {
//   const { data: patentsData, addItem, updateItem, getItemById } = useDatabase('patents');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});
  
//   const [formData, setFormData] = useState({
//     title: '',
//     shortTitle: '',
//     inventors: [''],
//     patentOffice: 'India',
//     applicationNumber: '',
//     date: '', // REMOVED DEFAULT DATE - Now empty by default
//     status: 'Published Online',
//     description: '',
//     category: '',
//     color: 'purple',
//     image: ''
//   });

//   useEffect(() => {
//     if (patentId) {
//       const existingPatent = getItemById(patentId);
//       if (existingPatent) {
//         setFormData({
//           ...existingPatent,
//           // Convert date to proper date format for date input
//           date: existingPatent.date ? 
//             new Date(existingPatent.date).toISOString().split('T')[0] : 
//             '', // Keep empty if no date exists
//           inventors: Array.isArray(existingPatent.inventors) ? existingPatent.inventors : ['']
//         });
//       }
//     }
//   }, [patentId, getItemById]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleArrayChange = (field) => (values) => {
//     setFormData(prev => ({ ...prev, [field]: values }));
//   };

//   const handleImageChange = (url) => {
//     setFormData(prev => ({ ...prev, image: url }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.title.trim()) {
//       newErrors.title = 'Full patent title is required';
//     }
    
//     if (!formData.shortTitle.trim()) {
//       newErrors.shortTitle = 'Short title is required';
//     }
    
//     const validInventors = formData.inventors.filter(inv => inv.trim());
//     if (validInventors.length === 0) {
//       newErrors.inventors = 'At least one inventor is required';
//     }
    
//     if (!formData.applicationNumber.trim()) {
//       newErrors.applicationNumber = 'Application number is required';
//     }
    
//     if (!formData.date) {
//       newErrors.date = 'Filing date is required';
//     }
    
//     if (!formData.description.trim()) {
//       newErrors.description = 'Patent description is required';
//     }
    
//     if (!formData.category) {
//       newErrors.category = 'Category is required';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       const patentItem = {
//         ...formData,
//         inventors: formData.inventors.filter(inv => inv.trim()),
//         // Convert the date input to ISO string for storage
//         date: new Date(formData.date).toISOString(),
//         id: patentId || formData.shortTitle.toLowerCase().replace(/[^a-z0-9]/g, ''),
//         createdAt: patentId ? undefined : new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       };
      
//       let result;
//       if (patentId) {
//         result = await updateItem(patentId, patentItem);
//       } else {
//         result = await addItem(patentItem);
//       }

//       if (result) {
//         onSuccess?.(result);
//       } else {
//         setErrors({ submit: 'Failed to save patent' });
//       }
//     } catch (error) {
//       console.error('Error saving patent:', error);
//       setErrors({ submit: 'Error saving patent: ' + error.message });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <BaseForm
//       title={patentId ? 'Edit Patent' : 'Add Patent'}
//       onSubmit={handleSubmit}
//       onCancel={onCancel}
//       submitText={patentId ? 'Update' : 'Create'}
//       isSubmitting={isSubmitting}
//     >
//       <FormField
//         label="Short Title (for display)"
//         name="shortTitle"
//         value={formData.shortTitle}
//         onChange={handleInputChange}
//         placeholder="e.g., Automated Pill Reminder Device"
//         required
//         error={errors.shortTitle}
//       />

//       <TextAreaField
//         label="Full Patent Title"
//         name="title"
//         value={formData.title}
//         onChange={handleInputChange}
//         placeholder="Enter complete patent title as filed"
//         rows={3}
//         required
//         error={errors.title}
//       />

//       <TextAreaField
//         label="Patent Description"
//         name="description"
//         value={formData.description}
//         onChange={handleInputChange}
//         placeholder="Describe what the patent covers, its innovation, and applications"
//         rows={4}
//         required
//         error={errors.description}
//       />

//       <ArrayField
//         label="Inventors"
//         values={formData.inventors}
//         onChange={handleArrayChange('inventors')}
//         placeholder="Enter inventor name"
//         required
//         error={errors.inventors}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <SelectField
//           label="Patent Office"
//           name="patentOffice"
//           value={formData.patentOffice}
//           onChange={handleInputChange}
//           options={PATENT_OFFICES}
//           required
//         />
        
//         <FormField
//           label="Application Number"
//           name="applicationNumber"
//           value={formData.applicationNumber}
//           onChange={handleInputChange}
//           placeholder="e.g., 201941002559"
//           required
//           error={errors.applicationNumber}
//         />

//         {/* FIXED: Date input with calendar picker (no default) */}
//         <div className="space-y-2">
//           <label htmlFor="date" className="block text-sm font-medium text-gray-300">
//             Filing Date <span className="text-red-400">*</span>
//           </label>
//           <input
//             type="date"
//             id="date"
//             name="date"
//             value={formData.date}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//             style={{ colorScheme: 'dark' }}
//           />
//           {errors.date && <p className="text-red-400 text-sm">{errors.date}</p>}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <SelectField
//           label="Status"
//           name="status"
//           value={formData.status}
//           onChange={handleInputChange}
//           options={PATENT_STATUSES}
//           required
//         />
        
//         <SelectField
//           label="Category"
//           name="category"
//           value={formData.category}
//           onChange={handleInputChange}
//           options={PATENT_CATEGORIES}
//           required
//           error={errors.category}
//         />

//         <SelectField
//           label="Card Color Theme"
//           name="color"
//           value={formData.color}
//           onChange={handleInputChange}
//           options={PATENT_COLORS}
//           required
//         />
//       </div>

//       <ImageUpload
//         label="Patent Diagram/Illustration (Optional)"
//         value={formData.image}
//         onChange={handleImageChange}
//         error={errors.image}
//       />

//       {errors.submit && (
//         <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
//           {errors.submit}
//         </div>
//       )}
//     </BaseForm>
//   );
// };

// export default PatentsForm;

// src/components/Forms/PatentsForm.jsx - Updated with fixed date input (no default)
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField, ArrayField } from './BaseForm';
import ImageUpload from './ImageUpload';
import { useDatabase } from '@/hooks/useDatabase';


const PATENT_OFFICES = [
  'India',
  'USA',
  'Europe',
  'China',
  'Japan',
  'Other'
];

const PATENT_STATUSES = [
  'Published Online',
  'Pending',
  'Approved',
  'Granted',
  'Rejected',
  'Withdrawn'
];

const PATENT_CATEGORIES = [
  'Healthcare',
  'Assistive Technology',
  'IoT',
  'Robotics',
  'Machine Learning',
  'Software',
  'Hardware',
  'Communication',
  'Security',
  'Other'
];

const PATENT_COLORS = [
  { value: 'purple', label: 'Purple' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' }
];

const PatentsForm = ({ patentId = null, onSuccess, onCancel }) => {
  const { data: patentsData, addItem, updateItem, getItemById } = useDatabase('patents');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [dateKey, setDateKey] = useState(0);
  
  const [formData, setFormData] = useState({
    title: '',
    shortTitle: '',
    inventors: [''],
    patentOffice: 'India',
    applicationNumber: '',
    date: '', // REMOVED DEFAULT DATE - Now empty by default
    status: 'Published Online',
    description: '',
    category: '',
    color: 'purple',
    image: ''
  });

  useEffect(() => {
    if (patentId) {
      const existingPatent = getItemById(patentId);
      if (existingPatent) {
        setFormData({
          ...existingPatent,
          // Convert date to proper date format for date input
          date: existingPatent.date ? 
            new Date(existingPatent.date).toISOString().split('T')[0] : 
            '', // Keep empty if no date exists
          inventors: Array.isArray(existingPatent.inventors) ? existingPatent.inventors : ['']
        });
      }

      setDateKey(prev => prev + 1);
    }
  }, [patentId, patentsData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'date') {
      // Handle date field specifically
      setFormData(prev => ({
        ...prev,
        date: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (field) => (values) => {
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleImageChange = (url) => {
    setFormData(prev => ({
      ...prev,
      image: url
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Full patent title is required';
    }
    
    if (!formData.shortTitle.trim()) {
      newErrors.shortTitle = 'Short title is required';
    }
    
    const validInventors = formData.inventors.filter(inv => inv.trim());
    if (validInventors.length === 0) {
      newErrors.inventors = 'At least one inventor is required';
    }
    
    if (!formData.applicationNumber.trim()) {
      newErrors.applicationNumber = 'Application number is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Filing date is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Patent description is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const patentItem = {
        ...formData,
        inventors: formData.inventors.filter(inv => inv.trim()),
        // Convert the date input to ISO string for storage
        date: new Date(formData.date).toISOString(),
        id: patentId || formData.shortTitle.toLowerCase().replace(/[^a-z0-9]/g, ''),
        createdAt: patentId ? undefined : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      let result;
      if (patentId) {
        result = await updateItem(patentId, patentItem);
      } else {
        result = await addItem(patentItem);
      }

      if (result) {
        onSuccess?.(result);
      } else {
        setErrors({ submit: 'Failed to save patent' });
      }
    } catch (error) {
      console.error('Error saving patent:', error);
      setErrors({ submit: 'Error saving patent: ' + error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseForm
      title={patentId ? 'Edit Patent' : 'Add Patent'}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText={patentId ? 'Update' : 'Create'}
      isSubmitting={isSubmitting}
    >
      <FormField
        label="Short Title (for display)"
        name="shortTitle"
        value={formData.shortTitle}
        onChange={handleInputChange}
        placeholder="e.g., Automated Pill Reminder Device"
        required
        error={errors.shortTitle}
      />

      <TextAreaField
        label="Full Patent Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Enter complete patent title as filed"
        rows={3}
        required
        error={errors.title}
      />

      <TextAreaField
        label="Patent Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Describe what the patent covers, its innovation, and applications"
        rows={4}
        required
        error={errors.description}
      />

      <ArrayField
        label="Inventors"
        values={formData.inventors}
        onChange={handleArrayChange('inventors')}
        placeholder="Enter inventor name"
        required
        error={errors.inventors}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectField
          label="Patent Office"
          name="patentOffice"
          value={formData.patentOffice}
          onChange={handleInputChange}
          options={PATENT_OFFICES}
          required
        />
        
        <FormField
          label="Application Number"
          name="applicationNumber"
          value={formData.applicationNumber}
          onChange={handleInputChange}
          placeholder="e.g., 201941002559"
          required
          error={errors.applicationNumber}
        />

        {/* FIXED: Date input with calendar picker (no default) */}
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-300">
            Filing Date <span className="text-red-400">*</span>
          </label>
          <input
  type="date"
  id="date"
  name="date"
  value={formData.date || ''}
  onChange={handleInputChange}
  required
  className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
  style={{ colorScheme: 'dark' }}
  key={`date-${dateKey}-${formData.date}`}
/>
          {errors.date && <p className="text-red-400 text-sm">{errors.date}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          options={PATENT_STATUSES}
          required
        />
        
        <SelectField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          options={PATENT_CATEGORIES}
          required
          error={errors.category}
        />

        <SelectField
          label="Card Color Theme"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          options={PATENT_COLORS}
          required
        />
      </div>

      <ImageUpload
        label="Patent Diagram/Illustration (Optional)"
        value={formData.image}
        onChange={handleImageChange}
        error={errors.image}
      />

      {errors.submit && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
          {errors.submit}
        </div>
      )}
    </BaseForm>
  );
};

export default PatentsForm;