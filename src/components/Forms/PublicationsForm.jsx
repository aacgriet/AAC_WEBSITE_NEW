// src/components/Forms/PublicationsForm.jsx
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
  'Other'
];

const PUBLICATION_TYPES = [
  'Journal Paper',
  'Conference Paper',
  'Workshop Paper',
  'Book Chapter',
  'Technical Report',
  'Thesis',
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
    year: new Date().getFullYear(),
    category: '',
    type: 'Journal Paper',
    image: '',
    status: 'published',
    doi: '',
    url: '',
    pdfUrl: '',
    keywords: [''],
    pages: '',
    volume: '',
    issue: '',
    publisher: ''
  });

  useEffect(() => {
    if (publicationId) {
      const existingPublication = getItemById(publicationId);
      if (existingPublication) {
        setFormData({
          ...existingPublication,
          authors: existingPublication.authors || [''],
          keywords: existingPublication.keywords || ['']
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
      newErrors.publication = 'Publication venue is required';
    }
    
    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 5) {
      newErrors.year = 'Valid year is required';
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
        keywords: formData.keywords.filter(keyword => keyword.trim()),
        year: parseInt(formData.year)
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
        label="Authors"
        values={formData.authors}
        onChange={handleArrayChange('authors')}
        placeholder="Enter author name"
        required
        error={errors.authors}
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
        
        <SelectField
          label="Publication Type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          options={PUBLICATION_TYPES}
        />
      </div>

      <FormField
        label="Publication Venue"
        name="publication"
        value={formData.publication}
        onChange={handleInputChange}
        placeholder="Journal/Conference name, volume, pages, etc."
        required
        error={errors.publication}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Publisher"
          name="publisher"
          value={formData.publisher}
          onChange={handleInputChange}
          placeholder="Publisher name"
        />

        <FormField
          label="Year"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleInputChange}
          min="1900"
          max={new Date().getFullYear() + 5}
          required
          error={errors.year}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Volume"
          name="volume"
          value={formData.volume}
          onChange={handleInputChange}
          placeholder="Volume number"
        />

        <FormField
          label="Issue"
          name="issue"
          value={formData.issue}
          onChange={handleInputChange}
          placeholder="Issue number"
        />

        <FormField
          label="Pages"
          name="pages"
          value={formData.pages}
          onChange={handleInputChange}
          placeholder="e.g., 123-135"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="DOI"
          name="doi"
          value={formData.doi}
          onChange={handleInputChange}
          placeholder="10.1000/123456"
        />

        <FormField
          label="Publication URL"
          name="url"
          type="url"
          value={formData.url}
          onChange={handleInputChange}
          placeholder="https://..."
        />
      </div>

      <FormField
        label="PDF URL"
        name="pdfUrl"
        type="url"
        value={formData.pdfUrl}
        onChange={handleInputChange}
        placeholder="https://... (link to PDF)"
      />

      <ArrayField
        label="Keywords"
        values={formData.keywords}
        onChange={handleArrayChange('keywords')}
        placeholder="Enter keyword"
      />

      <ImageUpload
        label="Publication Image/Diagram"
        value={formData.image}
        onChange={handleImageChange}
      />

      <SelectField
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleInputChange}
        options={[
          { value: 'published', label: 'Published' },
          { value: 'accepted', label: 'Accepted' },
          { value: 'under-review', label: 'Under Review' },
          { value: 'draft', label: 'Draft' }
        ]}
        required
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