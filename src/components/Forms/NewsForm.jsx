// src/components/Forms/NewsForm.jsx - COMPLETE FINAL VERSION
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField } from './BaseForm';
import ImageUpload from './ImageUpload';
import { useDatabase } from '@/hooks/useDatabase';

const NEWS_CATEGORIES = [
  'news',
  'Event', 
  'Talks',
  'Book',
  'Achievement',
  'Notice'
];

const NewsForm = ({ newsId = null, onSuccess, onCancel }) => {
  const { data: newsData, addItem, updateItem } = useDatabase('news');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [dateKey, setDateKey] = useState(0); // For forcing re-render
  
  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    slug: {
      current: ''
    },
    _rawBody: '',
    publishedAt: '',
    categories: 'news',
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '',
        _type: 'reference',
        url: ''
      }
    },
    links: [],
    _type: 'News'
  });

  const [linkInputs, setLinkInputs] = useState([{ text: '', url: '' }]);

  useEffect(() => {
    if (newsId && newsData && newsData.length > 0) {
      const existingNews = newsData.find(item => item._id === newsId || item.id === newsId);
      if (existingNews) {
        const publishedDate = existingNews.publishedAt ? 
          new Date(existingNews.publishedAt).toISOString().split('T')[0] : 
          '';
        
        console.log('Loading existing news:', existingNews);
        console.log('Converted date:', publishedDate);
        
        setFormData({
          ...existingNews,
          publishedAt: publishedDate,
        });
        
        // Force date input to re-render
        setDateKey(prev => prev + 1);
        
        if (existingNews.links && existingNews.links.length > 0) {
          setLinkInputs(existingNews.links);
        }
      }
    }
  }, [newsId, newsData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('--- INPUT CHANGE DETECTED ---');
    console.log('Field:', name);
    console.log('Value:', value);
    console.log('Current formData.publishedAt:', formData.publishedAt);
    
    setFormData(prev => {
      if (name === 'slug') {
        return {
          ...prev,
          slug: {
            ...prev.slug,
            current: value
          }
        };
      }
      
      const newState = {
        ...prev,
        [name]: value
      };
      
      console.log('New state will be:', newState);
      return newState;
    });
    
    // Auto-generate slug from title if creating new news
    if (name === 'title' && !newsId) {
      setFormData(prev => ({
        ...prev,
        slug: {
          ...prev.slug,
          current: value
        }
      }));
    }
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

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...linkInputs];
    newLinks[index][field] = value;
    setLinkInputs(newLinks);
  };

  const addLink = () => {
    setLinkInputs([...linkInputs, { text: '', url: '' }]);
  };

  const removeLink = (index) => {
    const newLinks = linkInputs.filter((_, i) => i !== index);
    setLinkInputs(newLinks);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
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
      const titleExists = newsData.some(item => 
        item.title.toLowerCase() === formData.title.toLowerCase() && item._id !== newsId
      );
      if (titleExists) {
        newErrors.title = 'News title already exists';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Submitting with publishedAt:', formData.publishedAt);
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const currentTime = new Date().toISOString();
      const validLinks = linkInputs.filter(link => link.text.trim() && link.url.trim());
      
      const newsItem = {
        ...formData,
        _id: newsId || `news-${Date.now()}`,
        _createdAt: newsId ? formData._createdAt : currentTime,
        _updatedAt: currentTime,
        _rev: `rev-${Date.now()}`,
        publishedAt: new Date(formData.publishedAt).toISOString(),
        links: validLinks,
        mainImage: formData.mainImage.asset.url ? formData.mainImage : null
      };
      
      let result;
      if (newsId) {
        result = await updateItem(newsId, newsItem);
      } else {
        result = await addItem(newsItem);
      }
      
      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving news:', error);
      setErrors({ submit: 'Failed to save news article: ' + error.message });
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
      <FormField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Enter news title"
        required
        error={errors.title}
      />

      <TextAreaField
        label="Short Description (Slug)"
        name="slug"
        value={formData.slug.current}
        onChange={handleInputChange}
        placeholder="Brief description that appears in news cards"
        rows={3}
        required
        error={errors.slug}
      />

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
        
        <div className="space-y-2">
          <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-300">
            Published Date <span className="text-red-400">*</span>
          </label>
          {/* Debug display */}
          {/* <div className="text-xs text-yellow-400">
            Current value: {formData.publishedAt || 'No date set'}
          </div> */}
          <input
            type="date"
            id="publishedAt"
            name="publishedAt"
            value={formData.publishedAt || ''}
            onChange={(e) => {
              console.log('Date input changing from:', formData.publishedAt, 'to:', e.target.value);
              handleInputChange(e);
            }}
            required
            className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            style={{ colorScheme: 'dark' }}
            key={`publishedAt-${dateKey}-${formData.publishedAt}`}
          />
          {errors.publishedAt && <p className="text-red-400 text-sm">{errors.publishedAt}</p>}
        </div>
      </div>

      <TextAreaField
        label="Content (Main Article Body)"
        name="_rawBody"
        value={formData._rawBody}
        onChange={handleInputChange}
        placeholder="Write your news article content here. Use **text** for bold, __text__ for underline."
        rows={12}
        required
        error={errors._rawBody}
      />

      <ImageUpload
        label="Featured Image"
        value={formData.mainImage?.asset?.url || ''}
        onChange={handleImageChange}
        error={errors.mainImage}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Related Links (Optional)</h3>
        {linkInputs.map((link, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#0e1421] rounded-lg border border-gray-600">
            <FormField
              label="Link Text"
              name={`link-text-${index}`}
              value={link.text}
              onChange={(e) => handleLinkChange(index, 'text', e.target.value)}
              placeholder="e.g., Check Results, Visit Website"
            />
            <FormField
              label="Link URL"
              name={`link-url-${index}`}
              type="url"
              value={link.url}
              onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
              placeholder="https://example.com"
            />
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={() => removeLink(index)}
                className="px-3 py-2 bg-red-900 text-red-300 rounded-lg hover:bg-red-800 transition-colors border border-red-700"
              >
                Remove Link
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addLink}
          className="px-4 py-2 bg-green-900 text-green-300 rounded-lg hover:bg-green-800 transition-colors border border-green-700"
        >
          Add Link
        </button>
      </div>

      {errors.submit && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
          {errors.submit}
        </div>
      )}
    </BaseForm>
  );
};

export default NewsForm;