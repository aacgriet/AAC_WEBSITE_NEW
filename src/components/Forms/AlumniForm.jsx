// src/components/Forms/AlumniForm.jsx
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField } from './BaseForm';
import ImageUpload from './ImageUpload';
// import { useLocalStorage } from '@/hooks/useLocalStorage';
// import { STORAGE_KEYS } from '@/lib/storage';
import { useDatabase } from '@/hooks/useDatabase';

const DEPARTMENTS = [
  'Computer Science Engineering',
  'Information Technology',
  'Electronics and Communication Engineering',
  'Electrical and Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Artificial Intelligence and Machine Learning',
  'Data Science',
  'Other'
];

const ALUMNUS_STATUS = [
  'Active',
  'Inactive',
  'Lost Contact'
];

const AlumniForm = ({ alumnusId = null, onSuccess, onCancel }) => {
  // const { data: alumniData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.ALUMNI);
  const { data: alumniData, addItem, updateItem, getItemById } = useDatabase('alumni');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    Id: '',
    Name: '',
    Designation: '',
    Company: '',
    Image: '',
    graduationYear: new Date().getFullYear(),
    department: '',
    status: 'Active',
    email: '',
    linkedin: '',
    currentLocation: '',
    achievements: '',
    bio: ''
  });

  useEffect(() => {
    if (alumnusId) {
      const existingAlumnus = getItemById(alumnusId);
      if (existingAlumnus) {
        setFormData({
          ...existingAlumnus,
          graduationYear: existingAlumnus.graduationYear || new Date().getFullYear(),
          department: existingAlumnus.department || '',
          status: existingAlumnus.status || 'Active',
          email: existingAlumnus.email || '',
          linkedin: existingAlumnus.linkedin || '',
          currentLocation: existingAlumnus.currentLocation || '',
          achievements: existingAlumnus.achievements || '',
          bio: existingAlumnus.bio || ''
        });
      }
    }
  }, [alumnusId, alumniData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'graduationYear' ? parseInt(value) : value
    }));
    
    // Auto-generate ID from name if creating new alumnus
    if (name === 'Name' && !alumnusId) {
      const id = value.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim() + '-' + Date.now();
      setFormData(prev => ({
        ...prev,
        Id: id
      }));
    }
  };

  const handleImageChange = (url) => {
    setFormData(prev => ({
      ...prev,
      Image: url
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.Name.trim()) {
      newErrors.Name = 'Name is required';
    }
    
    if (!formData.Image.trim()) {
      newErrors.Image = 'Profile image is required';
    }
    
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.graduationYear || formData.graduationYear < 1980 || formData.graduationYear > new Date().getFullYear() + 10) {
      newErrors.graduationYear = 'Please enter a valid graduation year';
    }

    if (!alumnusId) {
      const nameExists = alumniData.some(item => 
        item.Name.toLowerCase() === formData.Name.toLowerCase() && item.Id !== alumnusId
      );
      if (nameExists) {
        newErrors.Name = 'Alumni with this name already exists';
      }
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
      const alumnusItem = {
        ...formData,
        Id: alumnusId || formData.Id,
        createdAt: alumnusId ? undefined : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      let result;
if (alumnusId) {
  result = await updateItem(alumnusId, alumnusItem);
} else {
  result = await addItem(alumnusItem);
}

if (result) {
  onSuccess?.(result);
}
    } catch (error) {
      console.error('Error saving alumnus:', error);
      setErrors({ submit: 'Failed to save alumnus' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseForm
      title={alumnusId ? 'Edit Alumni' : 'Add Alumni'}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText={alumnusId ? 'Update' : 'Create'}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          name="Name"
          value={formData.Name}
          onChange={handleInputChange}
          placeholder="Enter alumni full name"
          required
          error={errors.Name}
        />
        
        <FormField
          label="ID (Auto-generated)"
          name="Id"
          value={formData.Id}
          onChange={handleInputChange}
          placeholder="Auto-generated from name"
          required
          error={errors.Id}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Current Designation/Role"
          name="Designation"
          value={formData.Designation}
          onChange={handleInputChange}
          placeholder="e.g., Software Engineer, Product Manager"
          error={errors.Designation}
        />
        
        <FormField
          label="Company/Organization"
          name="Company"
          value={formData.Company}
          onChange={handleInputChange}
          placeholder="e.g., Google, Microsoft, Startup"
          error={errors.Company}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectField
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          options={DEPARTMENTS}
          required
          error={errors.department}
        />
        
        <FormField
          label="Graduation Year"
          name="graduationYear"
          type="number"
          value={formData.graduationYear}
          onChange={handleInputChange}
          min="1980"
          max={new Date().getFullYear() + 10}
          required
          error={errors.graduationYear}
        />

        <SelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          options={ALUMNUS_STATUS}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="alumni@example.com"
          error={errors.email}
        />
        
        <FormField
          label="Current Location"
          name="currentLocation"
          value={formData.currentLocation}
          onChange={handleInputChange}
          placeholder="e.g., Hyderabad, India"
          error={errors.currentLocation}
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

      <TextAreaField
        label="Achievements/Recognition"
        name="achievements"
        value={formData.achievements}
        onChange={handleInputChange}
        placeholder="Notable achievements, awards, recognitions, or career milestones..."
        rows={3}
        error={errors.achievements}
      />

      <TextAreaField
        label="Bio/Description"
        name="bio"
        value={formData.bio}
        onChange={handleInputChange}
        placeholder="Brief biography, career journey, or personal message..."
        rows={4}
        error={errors.bio}
      />

      <ImageUpload
        label="Profile Image"
        value={formData.Image}
        onChange={handleImageChange}
        required
        error={errors.Image}
      />

      {errors.submit && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
          {errors.submit}
        </div>
      )}
    </BaseForm>
  );
};

export default AlumniForm;