// src/components/Forms/ProjectsForm.jsx
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField, ArrayField } from './BaseForm';
import ImageUpload from './ImageUpload';
import RichTextEditor from './RichTextEditor';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const PROJECT_CATEGORIES = [
  'Machine Learning',
  'Web Development',
  'Mobile Development',
  'IoT',
  'Robotics',
  'Data Science',
  'Cybersecurity',
  'Blockchain',
  'Cloud Computing',
  'AI/ML',
  'Research',
  'Other'
];

const ProjectsForm = ({ projectId = null, onSuccess, onCancel }) => {
  const { data: projectsData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.PROJECTS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    publishedAt: new Date().toISOString().split('T')[0],
    author: '',
    teamMembers: [''],
    categories: '',
    mainImage: {
      url: '',
      altText: ''
    },
    status: 'draft',
    duration: '',
    technologies: [''],
    githubUrl: '',
    liveUrl: '',
    description: ''
  });

  useEffect(() => {
    if (projectId) {
      const existingProject = getItemById(projectId);
      if (existingProject) {
        setFormData({
          ...existingProject,
          publishedAt: existingProject.publishedAt ? 
            new Date(existingProject.publishedAt).toISOString().split('T')[0] : 
            new Date().toISOString().split('T')[0],
          teamMembers: existingProject.names || existingProject.teamMembers || [''],
          technologies: existingProject.technologies || ['']
        });
      }
    }
  }, [projectId, getItemById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'title' && !projectId) {
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
      newErrors.publishedAt = 'Project date is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author/Lead is required';
    }

    const validTeamMembers = formData.teamMembers.filter(member => member.trim());
    if (validTeamMembers.length === 0) {
      newErrors.teamMembers = 'At least one team member is required';
    }

    if (!projectId) {
      const slugExists = projectsData.some(item => 
        item.slug === formData.slug && item.id !== projectId
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
      const projectItem = {
        ...formData,
        publishedAt: new Date(formData.publishedAt).toISOString(),
        mainImage: formData.mainImage.url ? formData.mainImage : null,
        names: formData.teamMembers.filter(member => member.trim()),
        teamMembers: formData.teamMembers.filter(member => member.trim()),
        technologies: formData.technologies.filter(tech => tech.trim())
      };
      
      let result;
      if (projectId) {
        result = updateItem(projectId, projectItem);
      } else {
        result = addItem(projectItem);
      }
      
      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setErrors({ submit: 'Failed to save project' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseForm
      title={projectId ? 'Edit Project' : 'Add Project'}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText={projectId ? 'Update' : 'Create'}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Project Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter project title"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectField
          label="Category"
          name="categories"
          value={formData.categories}
          onChange={handleInputChange}
          options={PROJECT_CATEGORIES}
          required
          error={errors.categories}
        />
        
        <FormField
          label="Project Date"
          name="publishedAt"
          type="date"
          value={formData.publishedAt}
          onChange={handleInputChange}
          required
          error={errors.publishedAt}
        />

        <FormField
          label="Duration"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          placeholder="e.g., 3 months"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Project Lead/Author"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          placeholder="Enter lead developer name"
          required
          error={errors.author}
        />

        <SelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          options={[
            { value: 'draft', label: 'Draft' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'completed', label: 'Completed' },
            { value: 'published', label: 'Published' }
          ]}
          required
        />
      </div>

      <TextAreaField
        label="Project Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Brief description of the project"
        rows={3}
      />

      <ArrayField
        label="Team Members"
        values={formData.teamMembers}
        onChange={handleArrayChange('teamMembers')}
        placeholder="Enter team member name"
        required
        error={errors.teamMembers}
      />

      <ArrayField
        label="Technologies Used"
        values={formData.technologies}
        onChange={handleArrayChange('technologies')}
        placeholder="Enter technology/framework"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="GitHub URL"
          name="githubUrl"
          type="url"
          value={formData.githubUrl}
          onChange={handleInputChange}
          placeholder="https://github.com/..."
        />

        <FormField
          label="Live Demo URL"
          name="liveUrl"
          type="url"
          value={formData.liveUrl}
          onChange={handleInputChange}
          placeholder="https://..."
        />
      </div>

      <RichTextEditor
        label="Detailed Content"
        value={formData.content}
        onChange={handleInputChange}
        placeholder="Write detailed project information, methodology, results, etc..."
        required
        error={errors.content}
      />

      <ImageUpload
        label="Project Image"
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

      {errors.submit && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
          {errors.submit}
        </div>
      )}
    </BaseForm>
  );
};

export default ProjectsForm;