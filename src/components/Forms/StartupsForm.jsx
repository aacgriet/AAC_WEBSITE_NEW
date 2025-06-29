// src/components/Forms/StartupsForm.jsx - Updated with fixed date input (no default)
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField, ArrayField } from './BaseForm';
import ImageUpload from './ImageUpload';
import { useDatabase } from '@/hooks/useDatabase';

const STARTUP_CATEGORIES = [
  'Event Planning',
  'Education & Art',
  'Technology',
  'Food & Sustainability',
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

const STARTUP_COLORS = [
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'green', label: 'Green' },
  { value: 'indigo', label: 'Indigo' },
  { value: 'red', label: 'Red' }
];

const STARTUP_STATUSES = [
  'Active',
  'Acquired',
  'Closed',
  'Paused',
  'Stealth Mode'
];

const StartupsForm = ({ startupId = null, onSuccess, onCancel }) => {
  const { data: startupsData, addItem, updateItem, getItemById } = useDatabase('startups');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [dateKey, setDateKey] = useState(0);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    logo: '',
    description: '',
    mission: '',
    image: '',
    category: '',
    color: 'blue',
    status: 'Active',
    founders: [''],
    establishedDate: '', // REMOVED DEFAULT DATE - Now empty by default
    website: '',
    appScreenshots: ['']
  });

  useEffect(() => {
    if (startupId) {
      const existingStartup = getItemById(startupId);
      if (existingStartup) {
        setFormData({
          ...existingStartup,
          // Convert establishedDate to proper date format for date input
          establishedDate: existingStartup.establishedDate ? 
            new Date(existingStartup.establishedDate).toISOString().split('T')[0] : 
            '', // Keep empty if no date exists
          founders: existingStartup.founders || [''],
          appScreenshots: existingStartup.appScreenshots || ['']
        });
      }

      setDateKey(prev => prev + 1);
    }
  }, [startupId, startupsData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-generate ID from name if creating new startup
    if (name === 'name' && !startupId) {
      const id = value.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({
        ...prev,
        id: id
      }));
    }
  };

  const handleArrayChange = (field) => (values) => {
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleImageChange = (field) => (url) => {
    setFormData(prev => ({
      ...prev,
      [field]: url
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Startup name is required';
    }
    
    if (!formData.logo.trim()) {
      newErrors.logo = 'Logo is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.mission.trim()) {
      newErrors.mission = 'Mission/Vision statement is required';
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'Product/App image is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.establishedDate) {
      newErrors.establishedDate = 'Establishment date is required';
    }

    const validFounders = formData.founders.filter(founder => founder.trim());
    if (validFounders.length === 0) {
      newErrors.founders = 'At least one founder is required';
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
        // Convert the date input to ISO string for storage
        establishedDate: new Date(formData.establishedDate).toISOString(),
        founders: formData.founders.filter(founder => founder.trim()),
        appScreenshots: formData.appScreenshots.filter(screenshot => screenshot.trim()),
        id: startupId || formData.id,
        createdAt: startupId ? undefined : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      let result;
      if (startupId) {
        result = await updateItem(startupId, startupItem);
      } else {
        result = await addItem(startupItem);
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
        
        <FormField
          label="ID (URL Slug)"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          placeholder="Auto-generated from name"
          required
          error={errors.id}
        />
      </div>

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
        label="Mission/Vision Statement"
        name="mission"
        value={formData.mission}
        onChange={handleInputChange}
        placeholder="What inspired you to start this company? What problem are you solving? What's your vision for the future?"
        rows={6}
        required
        error={errors.mission}
      />

      <ArrayField
        label="Founders"
        values={formData.founders}
        onChange={handleArrayChange('founders')}
        placeholder="Enter founder name"
        required
        error={errors.founders}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          options={STARTUP_CATEGORIES}
          required
          error={errors.category}
        />
        
        <SelectField
          label="Card Color Theme"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          options={STARTUP_COLORS}
          required
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FIXED: Date input with calendar picker (no default) */}
        <div className="space-y-2">
          <label htmlFor="establishedDate" className="block text-sm font-medium text-gray-300">
            Establishment Date <span className="text-red-400">*</span>
          </label>
          <input
  type="date"
  id="establishedDate"
  name="establishedDate"
  value={formData.establishedDate || ''}
  onChange={handleInputChange}
  required
  className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
  style={{ colorScheme: 'dark' }}
  key={`establishedDate-${dateKey}-${formData.establishedDate}`}
/>

          {errors.establishedDate && <p className="text-red-400 text-sm">{errors.establishedDate}</p>}
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
      </div>

      <ImageUpload
        label="Company Logo"
        value={formData.logo}
        onChange={handleImageChange('logo')}
        required
        error={errors.logo}
      />

      <ImageUpload
        label="Product/App Screenshot (Main Image)"
        value={formData.image}
        onChange={handleImageChange('image')}
        required
        error={errors.image}
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Additional App Screenshots (Optional)
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

      {errors.submit && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
          {errors.submit}
        </div>
      )}
    </BaseForm>
  );
};

export default StartupsForm;