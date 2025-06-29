// src/components/Forms/PublicationsForm.jsx - Updated to match your data structure
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField, ArrayField } from './BaseForm';
import ImageUpload from './ImageUpload';
// import { useLocalStorage } from '@/hooks/useLocalStorage';
// import { STORAGE_KEYS } from '@/lib/storage';
import { useDatabase } from '@/hooks/useDatabase';

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
  'Natural Language Processing',
  'Neural Networks',
  'Image Processing',
  'Pattern Recognition',
  'Other'
];

const PublicationsForm = ({ publicationId = null, onSuccess, onCancel }) => {
  // const { data: publicationsData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.PUBLICATIONS);
  const { data: publicationsData, addItem, updateItem, getItemById } = useDatabase('publications');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    authors: [''],
    publication: '',
    image: '',
    category: '',
    year: new Date().getFullYear(),
    downloadUrl: ''
  });

  useEffect(() => {
    if (publicationId) {
      const existingPublication = getItemById(publicationId);
      if (existingPublication) {
        setFormData({
          ...existingPublication,
          authors: existingPublication.authors || [''],
          year: existingPublication.year || new Date().getFullYear(),
          downloadUrl: existingPublication.downloadUrl || ''
        });
      }
    }
  }, [publicationId, publicationsData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value
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
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 10) {
      newErrors.year = 'Please enter a valid year';
    }

    // Validate download URL if provided
    if (formData.downloadUrl && !formData.downloadUrl.startsWith('http')) {
      newErrors.downloadUrl = 'Download URL must start with http:// or https://';
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
        publishedAt: new Date(`${formData.year}-01-01`).toISOString() // Convert year to publishedAt for compatibility
      };
      
      let result;
if (publicationId) {
  result = await updateItem(publicationId, publicationItem);
} else {
  result = await addItem(publicationItem);
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
        placeholder="Enter the full title of the publication"
        required
        error={errors.title}
      />

      <TextAreaField
        label="Abstract"
        name="abstract"
        value={formData.abstract}
        onChange={handleInputChange}
        placeholder="Enter the complete abstract of the publication. This should be a comprehensive summary of the research, methodology, results, and conclusions."
        rows={8}
        required
        error={errors.abstract}
      />

      <ArrayField
        label="Authors (in order of contribution)"
        values={formData.authors}
        onChange={handleArrayChange('authors')}
        placeholder="Enter author name with affiliation (e.g., John Doe, Department of Computer Science, University XYZ)"
        required
        error={errors.authors}
      />

      <TextAreaField
        label="Publication Details"
        name="publication"
        value={formData.publication}
        onChange={handleInputChange}
        placeholder="Enter complete publication information including journal/conference name, volume, issue, pages, DOI, ISSN, and publication date (e.g., International Journal of Engineering Research and Technology(IJERT), ISSN: 2278-0181, Vol. 13 Issue 01, August 2024)"
        rows={4}
        required
        error={errors.publication}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Research Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          options={PUBLICATION_CATEGORIES}
          required
          error={errors.category}
        />
        
        <FormField
          label="Publication Year"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleInputChange}
          min="1900"
          max={new Date().getFullYear() + 10}
          required
          error={errors.year}
        />
      </div>

      <FormField
        label="PDF Download URL (Optional)"
        name="downloadUrl"
        type="url"
        value={formData.downloadUrl}
        onChange={handleInputChange}
        placeholder="Enter the direct link to the PDF file"
        error={errors.downloadUrl}
      />

      <ImageUpload
        label="Publication Image/Figure"
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