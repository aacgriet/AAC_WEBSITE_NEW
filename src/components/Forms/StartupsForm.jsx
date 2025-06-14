// src/components/Forms/StartupsForm.jsx - New Form Based on Schema
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField, ArrayField } from './BaseForm';
import { MultiImageUpload } from './ImageUpload';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const STARTUP_CATEGORIES = [
  'Tech Services',
  'E-commerce',
  'FinTech',
  'HealthTech',
  'EdTech',
  'AI/ML',
  'IoT',
  'SaaS',
  'Mobile Apps',
  'Web Development',
  'Consulting',
  'Other'
];

const STARTUP_STATUSES = [
  'Active',
  'Acquired',
  'Closed',
  'Paused',
  'Stealth Mode'
];

const StartupsForm = ({ startupId = null, onSuccess, onCancel }) => {
  const { data: startupsData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.STARTUPS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    founders: [''],
    description: '',
    reason: '',
    category: '',
    establishedDate: new Date().toISOString().split('T')[0],
    website: '',
    appScreenshots: [''],
    status: 'Active'
  });

  useEffect(() => {
    if (startupId) {
      const existingStartup = getItemById(startupId);
      if (existingStartup) {
        setFormData({
          ...existingStartup,
          establishedDate: existingStartup.establishedDate ? 
            new Date(existingStartup.establishedDate).toISOString().split('T')[0] : 
            new Date().toISOString().split('T')[0],
          founders: existingStartup.founders || [''],
          appScreenshots: existingStartup.appScreenshots || ['']
        });
      }
    }
  }, [startupId, getItemById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field) => (values) => {
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleLogoChange = (url) => {
    setFormData(prev => ({
      ...prev,
      logo: url
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Startup name is required';
    }
    
    const validFounders = formData.founders.filter(founder => founder.trim());
    if (validFounders.length === 0) {
      newErrors.founders = 'At least one founder is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason/inspiration is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.establishedDate) {
      newErrors.establishedDate = 'Establishment date is required';
    }

    // Validate website URL if provided
    if (formData.website && !formData.website.startsWith('http')) {
      newErrors.website = 'Website URL must start with http:// or https://';
    }

    if (!startupId) {
      const nameExists = startupsData.some(item => 
        item.name.toLowerCase() === formData.name.toLowerCase() && item.id !== startupId
      );
      if (nameExists) {
        newErrors.name = 'Startup name already exists';
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
      const startupItem = {
        ...formData,
        establishedDate: new Date(formData.establishedDate).toISOString(),
        founders: formData.founders.filter(founder => founder.trim()),
        appScreenshots: formData.appScreenshots.filter(screenshot => screenshot.trim())
      };
      
      let result;
      if (startupId) {
        result = updateItem(startupId, startupItem);
      } else {
        result = addItem(startupItem);
      }
      
      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving startup:', error);
      setErrors({ submit: 'Failed to save startup' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseForm
      title={startupId ? 'Edit Startup' : 'Add Startup'}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText={startupId ? 'Update' : 'Create'}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Startup Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter startup name"
          required
          error={errors.name}
        />
        
        <SelectField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          options={STARTUP_CATEGORIES}
          required
          error={errors.category}
        />
      </div>

      <ArrayField
        label="Founders"
        values={formData.founders}
        onChange={handleArrayChange('founders')}
        placeholder="Enter founder name"
        required
        error={errors.founders}
      />

      <TextAreaField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="What does your startup do? Describe your product/service..."
        rows={4}
        required
        error={errors.description}
      />

      <TextAreaField
        label="Reason/Inspiration"
        name="reason"
        value={formData.reason}
        onChange={handleInputChange}
        placeholder="What inspired you to start this company? What problem are you solving?"
        rows={4}
        required
        error={errors.reason}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Establishment Date"
          name="establishedDate"
          type="date"
          value={formData.establishedDate}
          onChange={handleInputChange}
          required
          error={errors.establishedDate}
        />

        <SelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          options={STARTUP_STATUSES}
          required
        />
      </div>

      <FormField
        label="Website URL"
        name="website"
        type="url"
        value={formData.website}
        onChange={handleInputChange}
        placeholder="https://yourcompany.com"
        error={errors.website}
      />

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Company Logo
          </label>
          <input
            type="url"
            value={formData.logo}
            onChange={(e) => handleLogoChange(e.target.value)}
            placeholder="Enter logo URL"
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          {formData.logo && (
            <div className="mt-2">
              <img 
                src={formData.logo} 
                alt="Logo preview" 
                className="w-16 h-16 object-contain bg-gray-100 rounded-lg p-2"
                onError={() => console.log('Logo failed to load')}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            App Screenshots/Product Images
          </label>
          <div className="space-y-2">
            {formData.appScreenshots.map((screenshot, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="url"
                  value={screenshot}
                  onChange={(e) => {
                    const newScreenshots = [...formData.appScreenshots];
                    newScreenshots[index] = e.target.value;
                    setFormData(prev => ({ ...prev, appScreenshots: newScreenshots }));
                  }}
                  placeholder={`Screenshot ${index + 1} URL`}
                  className="flex-1 px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newScreenshots = formData.appScreenshots.filter((_, i) => i !== index);
                    setFormData(prev => ({ ...prev, appScreenshots: newScreenshots }));
                  }}
                  className="px-3 py-2 bg-red-900 text-red-300 rounded-lg hover:bg-red-800 transition-colors border border-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({ ...prev, appScreenshots: [...prev.appScreenshots, ''] }));
              }}
              className="px-4 py-2 bg-green-900 text-green-300 rounded-lg hover:bg-green-800 transition-colors border border-green-700"
            >
              Add Screenshot
            </button>
          </div>
        </div>
      </div>

      {errors.submit && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
          {errors.submit}
        </div>
      )}
    </BaseForm>
  );
};

export default StartupsForm;