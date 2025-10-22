// src/components/Forms/AchievementsForm.jsx
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField, ArrayField } from './BaseForm';
import { MultiImageUpload } from './ImageUpload';
import { useDatabase } from '@/hooks/useDatabase';

const ACHIEVEMENT_CATEGORIES = [
  'Awards',
  'Jobs',
  'Internships',
  'Hackathons',
  'Others'
];

const ACHIEVEMENT_STATUSES = [
  'published',
  'draft',
  'archived'
];

const AchievementsForm = ({ achievementId = null, onSuccess, onCancel }) => {
  const { data: achievementsData, addItem, updateItem, getItemById } = useDatabase('achievements');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [dateKey, setDateKey] = useState(0);
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    date: '', // No default date
    names: [''],
    images: [],
    mainImage: '',
    category: '',
    status: 'published'
  });

  useEffect(() => {
    if (achievementId) {
      const existingAchievement = getItemById(achievementId);
      if (existingAchievement) {
        setFormData({
          ...existingAchievement,
          date: existingAchievement.date ? 
            new Date(existingAchievement.date).toISOString().split('T')[0] : 
            '',
          names: existingAchievement.names || [''],
          images: existingAchievement.images || []
        });
        setDateKey(prev => prev + 1);
      }
    }
  }, [achievementId, achievementsData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-generate ID from title if creating new achievement
    if (name === 'title' && !achievementId) {
      const id = value.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim() + '-' + Date.now();
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

  const handleImagesChange = (images) => {
    setFormData(prev => {
      const updatedFormData = {
        ...prev,
        images
      };
      
      // Set the first image as the main image if not already set
      if (images.length > 0 && !prev.mainImage) {
        updatedFormData.mainImage = images[0];
      }
      
      return updatedFormData;
    });
  };

  const handleMainImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      mainImage: e.target.value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Achievement date is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    const validNames = formData.names.filter(name => name.trim());
    if (validNames.length === 0) {
      newErrors.names = 'At least one contributor name is required';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    if (!achievementId) {
      const titleExists = achievementsData.some(item => 
        item.title.toLowerCase() === formData.title.toLowerCase() && item.id !== achievementId
      );
      if (titleExists) {
        newErrors.title = 'Achievement title already exists';
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
      const achievementItem = {
        ...formData,
        id: achievementId || formData.id,
        date: new Date(formData.date).toISOString(),
        names: formData.names.filter(name => name.trim()),
        mainImage: formData.mainImage || formData.images[0] || '',
        createdAt: achievementId ? undefined : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      let result;
      if (achievementId) {
        result = await updateItem(achievementId, achievementItem);
      } else {
        result = await addItem(achievementItem);
      }
      
      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving achievement:', error);
      setErrors({ submit: 'Failed to save achievement: ' + error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseForm
      title={achievementId ? 'Edit Achievement' : 'Add Achievement'}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText={achievementId ? 'Update' : 'Create'}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Achievement Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter achievement title"
          required
          error={errors.title}
        />
        
        <FormField
          label="Achievement ID (Auto-generated)"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          placeholder="Auto-generated from title"
          required
          error={errors.id}
        />
      </div>

      <TextAreaField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Describe the achievement, recognition, or accomplishment..."
        rows={4}
        required
        error={errors.description}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          options={ACHIEVEMENT_CATEGORIES}
          required
          error={errors.category}
        />
        
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-300">
            Achievement Date <span className="text-red-400">*</span>
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

        <SelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          options={ACHIEVEMENT_STATUSES}
          required
        />
      </div>

      <ArrayField
        label="Contributors/Team Members"
        values={formData.names}
        onChange={handleArrayChange('names')}
        placeholder="Enter contributor name"
        required
        error={errors.names}
      />

      <FormField
        label="Main Image URL"
        name="mainImage"
        type="url"
        value={formData.mainImage}
        onChange={handleMainImageChange}
        placeholder="URL for the main achievement image (will auto-fill from gallery)"
        error={errors.mainImage}
      />

      <MultiImageUpload
        label="Achievement Images (Gallery)"
        values={formData.images}
        onChange={handleImagesChange}
        maxImages={8}
        required
        error={errors.images}
      />

      {errors.submit && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
          {errors.submit}
        </div>
      )}
    </BaseForm>
  );
};

export default AchievementsForm;