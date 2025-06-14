// src/components/Forms/EventsForm.jsx
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField } from './BaseForm';
import { MultiImageUpload } from './ImageUpload';
import RichTextEditor from './RichTextEditor';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const EVENT_STATUSES = [
  'upcoming',
  'ongoing',
  'completed',
  'cancelled'
];

const EventsForm = ({ eventId = null, onSuccess, onCancel }) => {
  const { data: eventsData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.EVENTS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    date: '',
    endDate: '',
    location: '',
    organizer: 'Advanced Academic Center',
    images: [],
    status: 'upcoming',
    registrationRequired: false,
    registrationUrl: '',
    maxParticipants: '',
    contactEmail: '',
    venue: '',
    tags: ['']
  });

  useEffect(() => {
    if (eventId) {
      const existingEvent = getItemById(eventId);
      if (existingEvent) {
        setFormData({
          ...existingEvent,
          date: existingEvent.date ? 
            new Date(existingEvent.date).toISOString().split('T')[0] : '',
          endDate: existingEvent.endDate ? 
            new Date(existingEvent.endDate).toISOString().split('T')[0] : '',
          tags: existingEvent.tags || ['']
        });
      }
    }
  }, [eventId, getItemById]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (name === 'title' && !eventId) {
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

  const handleArrayChange = (field) => (values) => {
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleImagesChange = (images) => {
    setFormData(prev => ({
      ...prev,
      images
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
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Event date is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (formData.endDate && formData.date && new Date(formData.endDate) < new Date(formData.date)) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (formData.registrationRequired && !formData.registrationUrl.trim()) {
      newErrors.registrationUrl = 'Registration URL is required when registration is required';
    }

    if (!eventId) {
      const slugExists = eventsData.some(item => 
        item.slug === formData.slug && item.id !== eventId
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
      const eventItem = {
        ...formData,
        date: new Date(formData.date).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
        tags: formData.tags.filter(tag => tag.trim()),
        images: formData.images.filter(img => img.trim())
      };
      
      let result;
      if (eventId) {
        result = updateItem(eventId, eventItem);
      } else {
        result = addItem(eventItem);
      }
      
      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving event:', error);
      setErrors({ submit: 'Failed to save event' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseForm
      title={eventId ? 'Edit Event' : 'Add Event'}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText={eventId ? 'Update' : 'Create'}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Event Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter event title"
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

      <TextAreaField
        label="Short Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Brief description of the event"
        rows={3}
        required
        error={errors.description}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Start Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleInputChange}
          required
          error={errors.date}
        />

        <FormField
          label="End Date"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleInputChange}
          error={errors.endDate}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Event location"
          required
          error={errors.location}
        />

        <FormField
          label="Venue"
          name="venue"
          value={formData.venue}
          onChange={handleInputChange}
          placeholder="Specific venue details"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Organizer"
          name="organizer"
          value={formData.organizer}
          onChange={handleInputChange}
          placeholder="Event organizer"
        />

        <SelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          options={EVENT_STATUSES}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Contact Email"
          name="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={handleInputChange}
          placeholder="contact@example.com"
        />

        <FormField
          label="Max Participants"
          name="maxParticipants"
          type="number"
          value={formData.maxParticipants}
          onChange={handleInputChange}
          placeholder="Leave empty for unlimited"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="registrationRequired"
            name="registrationRequired"
            checked={formData.registrationRequired}
            onChange={handleInputChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="registrationRequired" className="text-sm font-medium text-gray-300">
            Registration Required
          </label>
        </div>

        {formData.registrationRequired && (
          <FormField
            label="Registration URL"
            name="registrationUrl"
            type="url"
            value={formData.registrationUrl}
            onChange={handleInputChange}
            placeholder="https://..."
            error={errors.registrationUrl}
          />
        )}
      </div>

      <RichTextEditor
        label="Detailed Content"
        value={formData.content}
        onChange={handleInputChange}
        placeholder="Write detailed event information, agenda, speakers, etc..."
      />

      <MultiImageUpload
        label="Event Images"
        values={formData.images}
        onChange={handleImagesChange}
        maxImages={10}
      />

      {errors.submit && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
          {errors.submit}
        </div>
      )}
    </BaseForm>
  );
};

export default EventsForm;