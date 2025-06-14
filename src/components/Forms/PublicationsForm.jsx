// src/components/Forms/PublicationsForm.jsx - Updated with Schema
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField, ArrayField } from './BaseForm';
import ImageUpload from './ImageUpload';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const PUBLICATION_CATEGORIES = [
  'Machine Learning',
  'Deep Learning',
  'Computer Vision',
  'Healthcare',
  'IoT',
  'Cybersecurity',
  'Data Science',
  'Artificial Intelligence',
  'Software Engineering',
  'Web Development',
  'Mobile Computing',
  'Robotics',
  'Signal Processing',
  'Other'
];

const PublicationsForm = ({ publicationId = null, onSuccess, onCancel }) => {
  const { data: publicationsData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.PUBLICATIONS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    authors: [''],
    publication: '',
    publishedAt: new Date().toISOString().split('T')[0],
    category: '',
    image: ''
  });

  useEffect(() => {
    if (publicationId) {
      const existingPublication = getItemById(publicationId);
      if (existingPublication) {
        setFormData({
          ...existingPublication,
          publishedAt: existingPublication.publishedAt ? 
            new Date(existingPublication.publishedAt).toISOString().split('T')[0] : 
            new Date().toISOString().split('T')[0],
          authors: existingPublication.authors || ['']
        });
      }
    }
  }, [publicationId, getItemById]);

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

  const handleImageChange = (url) => {
    setFormData(prev => ({
      ...prev,
      image: url
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.abstract.trim()) {
      newErrors.abstract = 'Abstract is required';
    }
    
    const validAuthors = formData.authors.filter(author => author.trim());
    if (validAuthors.length === 0) {
      newErrors.authors = 'At least one author is required';
    }
    
    if (!formData.publication.trim()) {
      newErrors.publication = 'Publication details are required';
    }
    
    if (!formData.publishedAt) {
      newErrors.publishedAt = 'Publication date is required';
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
      const publicationItem = {
        ...formData,
        authors: formData.authors.filter(author => author.trim()),
        publishedAt: new Date(formData.publishedAt).toISOString()
      };
      
      let result;
      if (publicationId) {
        result = updateItem(publicationId, publicationItem);
      } else {
        result = addItem(publicationItem);
      }
      
      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving publication:', error);
      setErrors({ submit: 'Failed to save publication' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseForm
      title={publicationId ? 'Edit Publication' : 'Add Publication'}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText={publicationId ? 'Update' : 'Create'}
      isSubmitting={isSubmitting}
    >
      <FormField
        label="Publication Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Enter publication title"
        required
        error={errors.title}
      />

      <TextAreaField
        label="Abstract"
        name="abstract"
        value={formData.abstract}
        onChange={handleInputChange}
        placeholder="Enter publication abstract"
        rows={6}
        required
        error={errors.abstract}
      />

      <ArrayField
        label="Authors (with affiliations)"
        values={formData.authors}
        onChange={handleArrayChange('authors')}
        placeholder="Enter author name with affiliation"
        required
        error={errors.authors}
      />

      <TextAreaField
        label="Publication Details"
        name="publication"
        value={formData.publication}
        onChange={handleInputChange}
        placeholder="Journal/Conference name, volume, pages, DOI, etc."
        rows={3}
        required
        error={errors.publication}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          options={PUBLICATION_CATEGORIES}
          required
          error={errors.category}
        />
        
        <FormField
          label="Publication Date"
          name="publishedAt"
          type="date"
          value={formData.publishedAt}
          onChange={handleInputChange}
          required
          error={errors.publishedAt}
        />
      </div>

      <ImageUpload
        label="Publication Image/Thumbnail"
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

export default PublicationsForm;