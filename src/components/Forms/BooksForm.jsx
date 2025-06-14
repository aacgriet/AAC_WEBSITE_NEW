// src/components/Forms/BooksForm.jsx - New Form Based on Schema
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField, ArrayField } from './BaseForm';
import ImageUpload from './ImageUpload';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const BOOK_CATEGORIES = [
  'Programming',
  'Machine Learning',
  'Web Development',
  'Mobile Development',
  'Data Science',
  'IoT',
  'Game Development',
  'Cybersecurity',
  'Software Engineering',
  'Computer Science',
  'Technology',
  'Other'
];

const BOOK_TYPES = [
  'Book',
  'Blog',
  'eBook',
  'Guide',
  'Tutorial'
];

const LANGUAGES = [
  'English',
  'Hindi',
  'Telugu',
  'Tamil',
  'Other'
];

const BooksForm = ({ bookId = null, onSuccess, onCancel }) => {
  const { data: booksData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.BOOKS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    authors: [''],
    coverImage: '',
    description: '',
    category: '',
    publishedAt: new Date().toISOString().split('T')[0],
    type: 'Book',
    isbn: '',
    downloadUrl: '',
    pages: '',
    language: 'English'
  });

  useEffect(() => {
    if (bookId) {
      const existingBook = getItemById(bookId);
      if (existingBook) {
        setFormData({
          ...existingBook,
          publishedAt: existingBook.publishedAt ? 
            new Date(existingBook.publishedAt).toISOString().split('T')[0] : 
            new Date().toISOString().split('T')[0],
          authors: existingBook.authors || [''],
          pages: existingBook.pages || ''
        });
      }
    }
  }, [bookId, getItemById]);

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
      coverImage: url
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    const validAuthors = formData.authors.filter(author => author.trim());
    if (validAuthors.length === 0) {
      newErrors.authors = 'At least one author is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.publishedAt) {
      newErrors.publishedAt = 'Publication date is required';
    }

    // Validate URLs if provided
    if (formData.downloadUrl && !formData.downloadUrl.startsWith('http')) {
      newErrors.downloadUrl = 'Download URL must start with http:// or https://';
    }

    // Validate pages is a number if provided
    if (formData.pages && isNaN(Number(formData.pages))) {
      newErrors.pages = 'Pages must be a valid number';
    }

    if (!bookId) {
      const titleExists = booksData.some(item => 
        item.title.toLowerCase() === formData.title.toLowerCase() && item.id !== bookId
      );
      if (titleExists) {
        newErrors.title = 'Book title already exists';
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
      const bookItem = {
        ...formData,
        publishedAt: new Date(formData.publishedAt).toISOString(),
        authors: formData.authors.filter(author => author.trim()),
        pages: formData.pages ? Number(formData.pages) : null
      };
      
      let result;
      if (bookId) {
        result = updateItem(bookId, bookItem);
      } else {
        result = addItem(bookItem);
      }
      
      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving book:', error);
      setErrors({ submit: 'Failed to save book' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseForm
      title={bookId ? 'Edit Book/Blog' : 'Add Book/Blog'}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText={bookId ? 'Update' : 'Create'}
      isSubmitting={isSubmitting}
    >
      <FormField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Enter book/blog title"
        required
        error={errors.title}
      />

      <ArrayField
        label="Authors (with details)"
        values={formData.authors}
        onChange={handleArrayChange('authors')}
        placeholder="Author Name - Details/Bio"
        required
        error={errors.authors}
      />

      <TextAreaField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Describe the content, target audience, and key topics covered..."
        rows={6}
        required
        error={errors.description}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          options={BOOK_CATEGORIES}
          required
          error={errors.category}
        />
        
        <SelectField
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          options={BOOK_TYPES}
          required
        />

        <SelectField
          label="Language"
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          options={LANGUAGES}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Publication Date"
          name="publishedAt"
          type="date"
          value={formData.publishedAt}
          onChange={handleInputChange}
          required
          error={errors.publishedAt}
        />

        <FormField
          label="Number of Pages"
          name="pages"
          type="number"
          value={formData.pages}
          onChange={handleInputChange}
          placeholder="Enter page count"
          min="1"
          error={errors.pages}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="ISBN (Optional)"
          name="isbn"
          value={formData.isbn}
          onChange={handleInputChange}
          placeholder="978-0-123456-78-9"
        />

        <FormField
          label="Download URL (Optional)"
          name="downloadUrl"
          type="url"
          value={formData.downloadUrl}
          onChange={handleInputChange}
          placeholder="https://..."
          error={errors.downloadUrl}
        />
      </div>

      <ImageUpload
        label="Cover Image"
        value={formData.coverImage}
        onChange={handleImageChange}
        error={errors.coverImage}
      />

      {errors.submit && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
          {errors.submit}
        </div>
      )}
    </BaseForm>
  );
};

export default BooksForm;