// src/components/Forms/NewsForm.jsx
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField } from './BaseForm';
import ImageUpload from './ImageUpload';
import RichTextEditor from './RichTextEditor';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const NEWS_CATEGORIES = [
  'NOTICE',
  'ACHIEVEMENT', 
  'EVENT',
  'RESEARCH',
  'UPDATE'
];

const NewsForm = ({ newsId = null, onSuccess, onCancel }) => {
  const { data: newsData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.NEWS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    publishedAt: new Date().toISOString().split('T')[0],
    categories: '',
    mainImage: {
      url: '',
      altText: ''
    },
    status: 'draft'
  });

  useEffect(() => {
    if (newsId) {
      const existingNews = getItemById(newsId);
      if (existingNews) {
        setFormData({
          ...existingNews,
          publishedAt: existingNews.publishedAt ? 
            new Date(existingNews.publishedAt).toISOString().split('T')[0] : 
            new Date().toISOString().split('T')[0]
        });
      }
    }
  }, [newsId, getItemById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'title' && !newsId) {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({
        ...prev,
        slug
      }));
    }
  };

  const handleImageChange = (url) => {
    setFormData(prev => ({
      ...prev,
      mainImage: {
        ...prev.mainImage,
        url
      }
    }));
  };

  const handleImageAltChange = (e) => {
    setFormData(prev => ({
      ...prev,
      mainImage: {
        ...prev.mainImage,
        altText: e.target.value
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.categories) {
      newErrors.categories = 'Category is required';
    }
    
    if (!formData.publishedAt) {
      newErrors.publishedAt = 'Published date is required';
    }

    if (!newsId) {
      const slugExists = newsData.some(item => 
        item.slug === formData.slug && item.id !== newsId
      );
      if (slugExists) {
        newErrors.slug = 'Slug already exists';
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
      const newsItem = {
        ...formData,
        publishedAt: new Date(formData.publishedAt).toISOString(),
        mainImage: formData.mainImage.url ? formData.mainImage : null
      };
      
      let result;
      if (newsId) {
        result = updateItem(newsId, newsItem);
      } else {
        result = addItem(newsItem);
      }
      
      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving news:', error);
      setErrors({ submit: 'Failed to save news article' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseForm
      title={newsId ? 'Edit News Article' : 'Add News Article'}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText={newsId ? 'Update' : 'Create'}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter news title"
          required
          error={errors.title}
        />
        
        <FormField
          label="Slug"
          name="slug"
          value={formData.slug}
          onChange={handleInputChange}
          placeholder="url-friendly-title"
          required
          error={errors.slug}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Category"
          name="categories"
          value={formData.categories}
          onChange={handleInputChange}
          options={NEWS_CATEGORIES}
          required
          error={errors.categories}
        />
        
        <FormField
          label="Published Date"
          name="publishedAt"
          type="date"
          value={formData.publishedAt}
          onChange={handleInputChange}
          required
          error={errors.publishedAt}
        />
      </div>

      <TextAreaField
        label="Summary/Excerpt"
        name="slug"
        value={formData.slug}
        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
        placeholder="Brief summary of the news article"
        rows={3}
        error={errors.slug}
      />

      <RichTextEditor
        label="Content"
        value={formData.content}
        onChange={handleInputChange}
        placeholder="Write your news article content here..."
        required
        error={errors.content}
      />

      <ImageUpload
        label="Featured Image"
        value={formData.mainImage.url}
        onChange={handleImageChange}
        error={errors.mainImage}
      />

      {formData.mainImage.url && (
        <FormField
          label="Image Alt Text"
          name="imageAlt"
          value={formData.mainImage.altText}
          onChange={handleImageAltChange}
          placeholder="Describe the image for accessibility"
        />
      )}

      <SelectField
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleInputChange}
        options={[
          { value: 'draft', label: 'Draft' },
          { value: 'published', label: 'Published' }
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

export default NewsForm;