// src/components/Forms/BooksForm.jsx - Updated for your exact data structure
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField, ArrayField } from './BaseForm';
import ImageUpload from './ImageUpload';
// import { useLocalStorage } from '@/hooks/useLocalStorage';
// import { STORAGE_KEYS } from '@/lib/storage';
import { useDatabase } from '@/hooks/useDatabase';

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
  'Java Programming',
  'Other'
];

const BOOK_COLORS = [
  { value: 'blue', label: 'Blue' },
  { value: 'indigo', label: 'Indigo' },
  { value: 'purple', label: 'Purple' },
  { value: 'green', label: 'Green' },
  { value: 'orange', label: 'Orange' }
];

const BooksForm = ({ bookId = null, onSuccess, onCancel }) => {
  // const { data: booksData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.BOOKS);
  const { data: booksData, addItem, updateItem, getItemById } = useDatabase('books');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    authors: [''],
    cover: '',
    description: '',
    category: '',
    year: new Date().getFullYear(),
    color: 'blue'
  });

  useEffect(() => {
    if (bookId) {
      const existingBook = getItemById(bookId);
      if (existingBook) {
        setFormData({
          ...existingBook,
          authors: Array.isArray(existingBook.authors) ? existingBook.authors : ['']
        });
      }
    }
  }, [bookId, booksData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value
    }));
    
    // Auto-generate ID from title if creating new book
    if (name === 'title' && !bookId) {
      const id = value.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({
        ...prev,
        id
      }));
    }
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
      cover: url
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
    
    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 10) {
      newErrors.year = 'Please enter a valid year';
    }

    if (!formData.cover.trim()) {
      newErrors.cover = 'Cover image is required';
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
        authors: formData.authors.filter(author => author.trim()),
        id: bookId || formData.id,
        createdAt: bookId ? undefined : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      let result;
if (bookId) {
  result = await updateItem(bookId, bookItem);
} else {
  result = await addItem(bookItem);
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
        label="Book/Blog Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Enter book or blog title"
        required
        error={errors.title}
      />

      <FormField
        label="ID (URL Slug)"
        name="id"
        value={formData.id}
        onChange={handleInputChange}
        placeholder="Auto-generated from title"
        required
        error={errors.id}
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

      <ArrayField
        label="Authors (with details)"
        values={formData.authors}
        onChange={handleArrayChange('authors')}
        placeholder="Author Name: Author bio/details (e.g., John Doe: Computer Science student specializing in AI)"
        required
        error={errors.authors}
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

        <SelectField
          label="Color Theme"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          options={BOOK_COLORS}
          required
        />
      </div>

      <ImageUpload
        label="Cover Image"
        value={formData.cover}
        onChange={handleImageChange}
        required
        error={errors.cover}
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