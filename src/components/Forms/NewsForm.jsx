// src/components/Forms/NewsForm.jsx - Enhanced version following the JSON structure
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField } from './BaseForm';
import ImageUpload from './ImageUpload';
import RichTextEditor from './RichTextEditor';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const NEWS_CATEGORIES = [
  'news',
  'Event', 
  'Talks',
  'Book',
  'Achievement',
  'Notice'
];

const NewsForm = ({ newsId = null, onSuccess, onCancel }) => {
  const { data: newsData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.NEWS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    slug: {
      current: ''
    },
    body: [],
    _rawBody: '',
    publishedAt: new Date().toISOString(),
    categories: 'news',
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '',
        _type: 'reference',
        url: '',
        altText: ''
      }
    },
    _type: 'News',
    _createdAt: '',
    _updatedAt: '',
    _rev: ''
  });

  useEffect(() => {
    if (newsId) {
      const existingNews = getItemById(newsId);
      if (existingNews) {
        setFormData({
          ...existingNews,
          publishedAt: existingNews.publishedAt ? 
            new Date(existingNews.publishedAt).toISOString() : 
            new Date().toISOString()
        });
      }
    }
  }, [newsId, getItemById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'slug') {
      setFormData(prev => ({
        ...prev,
        slug: {
          ...prev.slug,
          current: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Auto-generate slug from title if creating new news
    if (name === 'title' && !newsId) {
      const slugValue = value.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      setFormData(prev => ({
        ...prev,
        slug: {
          ...prev.slug,
          current: slugValue
        }
      }));
    }
  };

  const handleBodyChange = (e) => {
    const { value } = e.target;
    
    // Convert the raw body text into the structured format
    const bodyBlocks = value.split('\n\n').map((paragraph, index) => {
      if (!paragraph.trim()) return null;
      
      return {
        _key: `block-${Date.now()}-${index}`,
        _type: 'block',
        children: [{
          _key: `span-${Date.now()}-${index}`,
          _type: 'span',
          marks: [],
          text: paragraph.trim()
        }],
        markDefs: [],
        style: 'normal'
      };
    }).filter(Boolean);
    
    setFormData(prev => ({
      ...prev,
      body: bodyBlocks,
      _rawBody: value
    }));
  };

  const handleImageChange = (url) => {
    setFormData(prev => ({
      ...prev,
      mainImage: {
        ...prev.mainImage,
        asset: {
          ...prev.mainImage.asset,
          url: url,
          _ref: url ? `image-${Date.now()}` : ''
        }
      }
    }));
  };

  const handleImageAltChange = (e) => {
    setFormData(prev => ({
      ...prev,
      mainImage: {
        ...prev.mainImage,
        asset: {
          ...prev.mainImage.asset,
          altText: e.target.value
        }
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.slug.current.trim()) {
      newErrors.slug = 'Slug is required';
    }
    
    if (!formData._rawBody.trim()) {
      newErrors._rawBody = 'Content is required';
    }
    
    if (!formData.categories) {
      newErrors.categories = 'Category is required';
    }
    
    if (!formData.publishedAt) {
      newErrors.publishedAt = 'Published date is required';
    }

    if (!newsId) {
      const slugExists = newsData.some(item => 
        item.slug?.current === formData.slug.current && item._id !== newsId
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
      const currentTime = new Date().toISOString();
      const newsItem = {
        ...formData,
        _id: newsId || `news-${Date.now()}`,
        _createdAt: newsId ? formData._createdAt : currentTime,
        _updatedAt: currentTime,
        _rev: `rev-${Date.now()}`,
        publishedAt: new Date(formData.publishedAt).toISOString(),
        // Clean up mainImage if no URL provided
        mainImage: formData.mainImage.asset.url ? formData.mainImage : null
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
          value={formData.slug.current}
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
          label="Published Date & Time"
          name="publishedAt"
          type="datetime-local"
          value={formData.publishedAt.slice(0, 16)}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            publishedAt: new Date(e.target.value).toISOString() 
          }))}
          required
          error={errors.publishedAt}
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-300">
          Content (Body) <span className="text-red-400">*</span>
        </label>
        <textarea
          value={formData._rawBody}
          onChange={handleBodyChange}
          placeholder="Write your news article content here. Use double line breaks to separate paragraphs."
          rows={12}
          required
          className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-vertical"
        />
        {errors._rawBody && <p className="text-red-400 text-sm">{errors._rawBody}</p>}
        <p className="text-gray-400 text-xs">
          Tip: Use double line breaks (press Enter twice) to create separate paragraphs.
        </p>
      </div>

      <ImageUpload
        label="Featured Image"
        value={formData.mainImage?.asset?.url || ''}
        onChange={handleImageChange}
        error={errors.mainImage}
      />

      {formData.mainImage?.asset?.url && (
        <FormField
          label="Image Alt Text"
          name="imageAlt"
          value={formData.mainImage?.asset?.altText || ''}
          onChange={handleImageAltChange}
          placeholder="Describe the image for accessibility"
        />
      )}

      {/* Debug Information (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-white font-medium mb-2">Debug - Structured Body Preview:</h4>
          <pre className="text-xs text-gray-300 overflow-auto max-h-32">
            {JSON.stringify(formData.body, null, 2)}
          </pre>
        </div>
      )}

      {errors.submit && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
          {errors.submit}
        </div>
      )}
    </BaseForm>
  );
};

export default NewsForm;