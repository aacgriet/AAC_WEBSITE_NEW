import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, SelectField } from './BaseForm';
import ImageUpload from './ImageUpload';
import { useDatabase } from '@/hooks/useDatabase';

const STATUS_OPTIONS = [
  'active',
  'inactive'
];

const CoreCommitteeForm = ({ memberId = null, onSuccess, onCancel }) => {
  const { data: membersData, addItem, updateItem, getItemById } = useDatabase('corecommittee');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    image: '',
    year: new Date().getFullYear(),
    department: '',
    status: 'active',
    linkedin: ''
  });

  useEffect(() => {
    if (memberId) {
      const existingMember = getItemById(memberId);
      if (existingMember) {
        setFormData({
          ...existingMember,
          year: existingMember.year || new Date().getFullYear(),
          status: existingMember.status || 'active',
          department: existingMember.department || '',
          linkedin: existingMember.linkedin || ''
        });
      }
    }
  }, [memberId, membersData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }
    
    if (!formData.year || formData.year < 2000 || formData.year > new Date().getFullYear() + 5) {
      newErrors.year = 'Please enter a valid year';
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
      const memberItem = {
        ...formData
      };
      
      let result;
      if (memberId) {
        result = await updateItem(memberId, memberItem);
      } else {
        result = await addItem(memberItem);
      }

      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving core committee member:', error);
      setErrors({ submit: 'Failed to save core committee member' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const uniqueDesignations = Array.from(new Set(membersData?.map(m => m.designation) || [])).filter(Boolean).sort();
  const designationOptions = [
    'President', 
    'Vice President', 
    'Training & Development Head', 
    'Database & Asset Management Head', 
    'Accounting & Operations Head', 
    'Public & Corporate Relations Head', 
    'CAP Head', 
    'Assistant Coordinator Training & Development', 
    'Assistant Coordinator Database & Asset Management', 
    'Assistant Coordinator Accounting & Operations', 
    'Assistant Coordinator Public & Corporate Relations'
  ];

  return (
    <BaseForm
      title={memberId ? 'Edit Committee Member' : 'Add Committee Member'}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText={memberId ? 'Update' : 'Create'}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="e.g., John Doe"
          required
          error={errors.name}
        />
        
        <SelectField
          label="Designation"
          name="designation"
          value={formData.designation}
          onChange={handleInputChange}
          options={designationOptions}
          required
          error={errors.designation}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Year"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleInputChange}
          required
          error={errors.year}
        />

        <FormField
          label="Department (Optional)"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          placeholder="e.g., CSE, IT"
          error={errors.department}
        />

        <SelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          options={STATUS_OPTIONS}
          required
        />
      </div>

      <FormField
        label="LinkedIn Profile URL"
        name="linkedin"
        type="url"
        value={formData.linkedin}
        onChange={handleInputChange}
        placeholder="https://linkedin.com/in/username"
        error={errors.linkedin}
      />

      <ImageUpload
        label="Profile Image"
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

export default CoreCommitteeForm;
