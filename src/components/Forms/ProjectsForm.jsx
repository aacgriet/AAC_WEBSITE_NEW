// // // src/components/Forms/ProjectsForm.jsx - Fixed RichTextEditor usage
// // import React, { useState, useEffect } from 'react';
// // import BaseForm, { FormField, TextAreaField, SelectField, ArrayField } from './BaseForm';
// // import ImageUpload from './ImageUpload';
// // import { useLocalStorage } from '@/hooks/useLocalStorage';
// // import { STORAGE_KEYS } from '@/lib/storage';

// // const PROJECT_CATEGORIES = [
// //   'Machine Learning',
// //   'Deep Learning',
// //   'Web Development',
// //   'Mobile Development',
// //   'IoT',
// //   'Robotics',
// //   'Data Science',
// //   'Cybersecurity',
// //   'Blockchain',
// //   'Cloud Computing',
// //   'AI/ML',
// //   'Healthcare',
// //   'Research',
// //   'Other'
// // ];

// // const ProjectsForm = ({ projectId = null, onSuccess, onCancel }) => {
// //   const { data: projectsData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.PROJECTS);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [errors, setErrors] = useState({});
  
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     slug: '',
// //     publishedAt: new Date().toISOString().split('T')[0],
// //     author: '',
// //     categories: '',
// //     names: [''],
// //     mainImage: {
// //       url: '',
// //       altText: ''
// //     },
// //     body: '',
// //     _rawBody: '',
// //     status: 'published'
// //   });

// //   useEffect(() => {
// //     if (projectId) {
// //       const existingProject = getItemById(projectId);
// //       if (existingProject) {
// //         setFormData({
// //           ...existingProject,
// //           publishedAt: existingProject.publishedAt ? 
// //             new Date(existingProject.publishedAt).toISOString().split('T')[0] : 
// //             new Date().toISOString().split('T')[0],
// //           names: existingProject.names || [''],
// //           mainImage: existingProject.mainImage || { url: '', altText: '' },
// //           body: existingProject.body || '',
// //           _rawBody: existingProject._rawBody || ''
// //         });
// //       }
// //     }
// //   }, [projectId, getItemById]);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
    
// //     // Auto-generate slug from title
// //     if (name === 'title' && !projectId) {
// //       const slug = value.toLowerCase()
// //         .replace(/[^a-z0-9 -]/g, '')
// //         .replace(/\s+/g, '-')
// //         .replace(/-+/g, '-')
// //         .trim();
// //       setFormData(prev => ({
// //         ...prev,
// //         slug
// //       }));
// //     }
// //   };

// //   const handleArrayChange = (field) => (values) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [field]: values
// //     }));
// //   };

// //   const handleImageChange = (url) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       mainImage: {
// //         ...prev.mainImage,
// //         url
// //       }
// //     }));
// //   };

// //   const handleImageAltChange = (e) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       mainImage: {
// //         ...prev.mainImage,
// //         altText: e.target.value
// //       }
// //     }));
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
    
// //     if (!formData.title.trim()) {
// //       newErrors.title = 'Title is required';
// //     }
    
// //     if (!formData.slug.trim()) {
// //       newErrors.slug = 'Slug is required';
// //     }
    
// //     if (!formData._rawBody.trim()) {
// //       newErrors._rawBody = 'Project description is required';
// //     }
    
// //     if (!formData.categories) {
// //       newErrors.categories = 'Category is required';
// //     }
    
// //     if (!formData.publishedAt) {
// //       newErrors.publishedAt = 'Project date is required';
// //     }

// //     if (!formData.author.trim()) {
// //       newErrors.author = 'Author/Team is required';
// //     }

// //     const validNames = formData.names.filter(name => name.trim());
// //     if (validNames.length === 0) {
// //       newErrors.names = 'At least one team member is required';
// //     }

// //     if (!projectId) {
// //       const slugExists = projectsData.some(item => 
// //         item.slug === formData.slug && item.id !== projectId
// //       );
// //       if (slugExists) {
// //         newErrors.slug = 'Slug already exists';
// //       }
// //     }
    
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     if (!validateForm()) {
// //       return;
// //     }
    
// //     setIsSubmitting(true);
    
// //     try {
// //       const projectItem = {
// //         ...formData,
// //         publishedAt: new Date(formData.publishedAt).toISOString(),
// //         names: formData.names.filter(name => name.trim()),
// //         mainImage: formData.mainImage.url ? {
// //           asset: {
// //             url: formData.mainImage.url,
// //             altText: formData.mainImage.altText
// //           }
// //         } : null
// //       };
      
// //       let result;
// //       if (projectId) {
// //         result = updateItem(projectId, projectItem);
// //       } else {
// //         result = addItem(projectItem);
// //       }
      
// //       if (result) {
// //         onSuccess?.(result);
// //       }
// //     } catch (error) {
// //       console.error('Error saving project:', error);
// //       setErrors({ submit: 'Failed to save project' });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <BaseForm
// //       title={projectId ? 'Edit Project' : 'Add Project'}
// //       onSubmit={handleSubmit}
// //       onCancel={onCancel}
// //       submitText={projectId ? 'Update' : 'Create'}
// //       isSubmitting={isSubmitting}
// //     >
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <FormField
// //           label="Project Title"
// //           name="title"
// //           value={formData.title}
// //           onChange={handleInputChange}
// //           placeholder="Enter project title"
// //           required
// //           error={errors.title}
// //         />
        
// //         <FormField
// //           label="URL Slug"
// //           name="slug"
// //           value={formData.slug}
// //           onChange={handleInputChange}
// //           placeholder="url-friendly-title"
// //           required
// //           error={errors.slug}
// //         />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         <SelectField
// //           label="Category"
// //           name="categories"
// //           value={formData.categories}
// //           onChange={handleInputChange}
// //           options={PROJECT_CATEGORIES}
// //           required
// //           error={errors.categories}
// //         />
        
// //         <FormField
// //           label="Project Date"
// //           name="publishedAt"
// //           type="date"
// //           value={formData.publishedAt}
// //           onChange={handleInputChange}
// //           required
// //           error={errors.publishedAt}
// //         />

// //         <SelectField
// //           label="Status"
// //           name="status"
// //           value={formData.status}
// //           onChange={handleInputChange}
// //           options={[
// //             { value: 'draft', label: 'Draft' },
// //             { value: 'published', label: 'Published' },
// //             { value: 'archived', label: 'Archived' }
// //           ]}
// //           required
// //         />
// //       </div>

// //       <FormField
// //         label="Team/Author"
// //         name="author"
// //         value={formData.author}
// //         onChange={handleInputChange}
// //         placeholder="Enter team or author name"
// //         required
// //         error={errors.author}
// //       />

// //       <ArrayField
// //         label="Team Member Names"
// //         values={formData.names}
// //         onChange={handleArrayChange('names')}
// //         placeholder="Enter team member name"
// //         required
// //         error={errors.names}
// //       />

// //       <ImageUpload
// //         label="Main Project Image"
// //         value={formData.mainImage.url}
// //         onChange={handleImageChange}
// //         error={errors.mainImage}
// //       />

// //       {formData.mainImage.url && (
// //         <FormField
// //           label="Image Alt Text"
// //           name="imageAlt"
// //           value={formData.mainImage.altText}
// //           onChange={handleImageAltChange}
// //           placeholder="Describe the image for accessibility"
// //         />
// //       )}

// //       <TextAreaField
// //         label="Project Description (Main Content)"
// //         name="_rawBody"
// //         value={formData._rawBody}
// //         onChange={handleInputChange}
// //         placeholder="Write detailed project information, methodology, technologies used, results, etc..."
// //         rows={8}
// //         required
// //         error={errors._rawBody}
// //       />

// //       <TextAreaField
// //         label="Additional Content (Optional)"
// //         name="body"
// //         value={formData.body}
// //         onChange={handleInputChange}
// //         placeholder="Any additional content or notes..."
// //         rows={6}
// //       />

// //       {errors.submit && (
// //         <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
// //           {errors.submit}
// //         </div>
// //       )}
// //     </BaseForm>
// //   );
// // };

// // export default ProjectsForm;
// // src/components/Forms/ProjectsForm.jsx - Updated for your exact project structure
// import React, { useState, useEffect } from 'react';
// import BaseForm, { FormField, TextAreaField, SelectField, ArrayField } from './BaseForm';
// import ImageUpload from './ImageUpload';
// // import { useLocalStorage } from '@/hooks/useLocalStorage';
// // import { STORAGE_KEYS } from '@/lib/storage';
// import { useDatabase } from '@/hooks/useDatabase';
// const PROJECT_CATEGORIES = [
//   'Machine Learning',
//   'Deep Learning',
//   'Web Development',
//   'Mobile Development',
//   'IoT',
//   'Internet of Things',
//   'Robotics',
//   'Data Science',
//   'Cybersecurity',
//   'Blockchain',
//   'Cloud Computing',
//   'AI/ML',
//   'Healthcare',
//   'Research',
//   'Computer Vision',
//   'Artificial Intelligence',
//   'Drone Technology',
//   'CV',
//   'WEB',
//   'Project',
//   'project',
//   'Other'
// ];

// const PROJECT_STATUSES = [
//   'draft',
//   'published',
//   'archived'
// ];

// const ProjectsForm = ({ projectId = null, onSuccess, onCancel }) => {
//   // const { data: projectsData, addItem, updateItem, getItemById } = useLocalStorage(STORAGE_KEYS.PROJECTS);
//   const { data: projectsData, addItem, updateItem, getItemById } = useDatabase('projects');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});
  
//   const [formData, setFormData] = useState({
//     _id: '',
//     title: '',
//     slug: {
//       current: ''
//     },
//     author: '',
//     categories: '',
//     names: [''],
//     mainImage: {
//       _type: 'image',
//       asset: {
//         _ref: '',
//         url: ''
//       }
//     },
//     body: [], // For rich content blocks
//     _rawBody: '', // Simple text content
//     publishedAt: new Date().toISOString().split('T')[0],
//     _type: 'projects',
//     status: 'published',
//     _createdAt: '',
//     _updatedAt: '',
//     _rev: ''
//   });

//   useEffect(() => {
//     if (projectId) {
//       const existingProject = getItemById(projectId);
//       if (existingProject) {
//         setFormData({
//           ...existingProject,
//           publishedAt: existingProject.publishedAt ? 
//             new Date(existingProject.publishedAt).toISOString().split('T')[0] : 
//             new Date().toISOString().split('T')[0],
//           names: existingProject.names || [''],
//           slug: existingProject.slug || { current: '' },
//           mainImage: existingProject.mainImage || {
//             _type: 'image',
//             asset: { _ref: '', url: '' }
//           },
//           _rawBody: existingProject._rawBody || '',
//           body: existingProject.body || []
//         });
//       }
//     }
//   }, [projectId, getItemById]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'slugCurrent') {
//       setFormData(prev => ({
//         ...prev,
//         slug: {
//           ...prev.slug,
//           current: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
    
//     // Auto-generate slug from title
//     if (name === 'title' && !projectId) {
//       const slugValue = value;
//       setFormData(prev => ({
//         ...prev,
//         slug: {
//           ...prev.slug,
//           current: slugValue
//         },
//         _id: projectId || `project-${Date.now()}`
//       }));
//     }
//   };

//   const handleArrayChange = (field) => (values) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: values
//     }));
//   };

//   const handleImageChange = (url) => {
//     setFormData(prev => ({
//       ...prev,
//       mainImage: {
//         ...prev.mainImage,
//         asset: {
//           ...prev.mainImage.asset,
//           url,
//           _ref: url ? `image-${Date.now()}` : ''
//         }
//       }
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.title.trim()) {
//       newErrors.title = 'Title is required';
//     }
    
//     if (!formData._rawBody.trim()) {
//       newErrors._rawBody = 'Project description is required';
//     }
    
//     if (!formData.categories) {
//       newErrors.categories = 'Category is required';
//     }
    
//     if (!formData.publishedAt) {
//       newErrors.publishedAt = 'Project date is required';
//     }

//     if (!formData.author.trim()) {
//       newErrors.author = 'Author/Team is required';
//     }

//     const validNames = formData.names.filter(name => name.trim());
//     if (validNames.length === 0) {
//       newErrors.names = 'At least one team member is required';
//     }

//     if (!projectId) {
//       const titleExists = projectsData.some(item => 
//         item.title.toLowerCase() === formData.title.toLowerCase() && item._id !== projectId
//       );
//       if (titleExists) {
//         newErrors.title = 'Project title already exists';
//       }
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       const currentTime = new Date().toISOString();
      
//       const projectItem = {
//         ...formData,
//         _id: projectId || formData._id || `project-${Date.now()}`,
//         _createdAt: projectId ? formData._createdAt : currentTime,
//         _updatedAt: currentTime,
//         _rev: `rev-${Date.now()}`,
//         publishedAt: new Date(formData.publishedAt).toISOString(),
//         names: formData.names.filter(name => name.trim()),
//         // Create body blocks from _rawBody for consistency
//         body: formData._rawBody ? [{
//           _key: `block-${Date.now()}`,
//           _type: 'block',
//           children: [{
//             _key: `span-${Date.now()}`,
//             _type: 'span',
//             marks: [],
//             text: formData._rawBody
//           }],
//           markDefs: [],
//           style: 'normal'
//         }] : []
//       };
      
//       let result;
// if (projectId) {
//   result = await updateItem(projectId, projectItem);
// } else {
//   result = await addItem(projectItem);
// }

// if (result) {
//   onSuccess?.(result);
// }
//     } catch (error) {
//       console.error('Error saving project:', error);
//       setErrors({ submit: 'Failed to save project' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <BaseForm
//       title={projectId ? 'Edit Project' : 'Add Project'}
//       onSubmit={handleSubmit}
//       onCancel={onCancel}
//       submitText={projectId ? 'Update' : 'Create'}
//       isSubmitting={isSubmitting}
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <FormField
//           label="Project Title"
//           name="title"
//           value={formData.title}
//           onChange={handleInputChange}
//           placeholder="Enter project title"
//           required
//           error={errors.title}
//         />
        
//         <FormField
//           label="Project ID"
//           name="_id"
//           value={formData._id}
//           onChange={handleInputChange}
//           placeholder="Auto-generated project ID"
//           required
//           error={errors._id}
//         />
//       </div>

//       <FormField
//         label="Slug (Description/Summary)"
//         name="slugCurrent"
//         value={formData.slug.current}
//         onChange={handleInputChange}
//         placeholder="Brief project summary or description"
//         required
//         error={errors.slug}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <SelectField
//           label="Category"
//           name="categories"
//           value={formData.categories}
//           onChange={handleInputChange}
//           options={PROJECT_CATEGORIES}
//           required
//           error={errors.categories}
//         />
        
//         <FormField
//           label="Project Date"
//           name="publishedAt"
//           type="date"
//           value={formData.publishedAt}
//           onChange={handleInputChange}
//           required
//           error={errors.publishedAt}
//         />

//         <SelectField
//           label="Status"
//           name="status"
//           value={formData.status}
//           onChange={handleInputChange}
//           options={PROJECT_STATUSES}
//           required
//         />
//       </div>

//       <FormField
//         label="Team/Author"
//         name="author"
//         value={formData.author}
//         onChange={handleInputChange}
//         placeholder="Enter team or author name (e.g., 23AAC09, Team Smart Box)"
//         required
//         error={errors.author}
//       />

//       <ArrayField
//         label="Team Member Names"
//         values={formData.names}
//         onChange={handleArrayChange('names')}
//         placeholder="Enter team member name (with roles/mentors if applicable)"
//         required
//         error={errors.names}
//       />

//       <ImageUpload
//         label="Main Project Image (Optional)"
//         value={formData.mainImage?.asset?.url || ''}
//         onChange={handleImageChange}
//         error={errors.mainImage}
//       />

//       <TextAreaField
//         label="Project Description (Main Content)"
//         name="_rawBody"
//         value={formData._rawBody}
//         onChange={handleInputChange}
//         placeholder="Write detailed project information, methodology, technologies used, results, etc. This will be the main content shown when the card expands."
//         rows={12}
//         required
//         error={errors._rawBody}
//       />

//       {errors.submit && (
//         <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
//           {errors.submit}
//         </div>
//       )}
//     </BaseForm>
//   );
// };

// export default ProjectsForm;

// src/components/Forms/ProjectsForm.jsx - Fixed date input to be fully editable
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField, ArrayField } from './BaseForm';
import ImageUpload from './ImageUpload';
import { useDatabase } from '@/hooks/useDatabase';

const PROJECT_CATEGORIES = [
  'Machine Learning',
  'App Development',
  'Deep Learning',
  'Web Development',
  'Mobile Development',
  'IoT',
  'Internet of Things',
  'Robotics',
  'Data Science',
  'Cybersecurity',
  'Blockchain',
  'Cloud Computing',
  'AI/ML',
  'Healthcare',
  'Research',
  'Computer Vision',
  'Artificial Intelligence',
  'Drone Technology',
  'CV',
  'WEB',
  'Project',
  'project',
  'Other'
];

const PROJECT_STATUSES = [
  'draft',
  'published',
  'archived'
];

const ProjectsForm = ({ projectId = null, onSuccess, onCancel }) => {
  const { data: projectsData, addItem, updateItem, getItemById } = useDatabase('projects');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [dateKey, setDateKey] = useState(0);

  
  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    slug: {
      current: ''
    },
    author: '',
    categories: '',
    names: [''],
    mainImage: {
      _type: 'image',
      asset: {
        _ref: '',
        url: ''
      }
    },
    body: [], // For rich content blocks
    _rawBody: '', // Simple text content
    publishedAt: '', // REMOVED DEFAULT DATE - Now empty by default
    _type: 'projects',
    status: 'published',
    _createdAt: '',
    _updatedAt: '',
    _rev: ''
  });

  useEffect(() => {
    if (projectId) {
      const existingProject = getItemById(projectId);
      if (existingProject) {
        setFormData({
          ...existingProject,
          // Convert publishedAt to proper date format for date input
          publishedAt: existingProject.publishedAt ? 
            new Date(existingProject.publishedAt).toISOString().split('T')[0] : 
            '', // Keep empty if no date exists
          names: existingProject.names || [''],
          slug: existingProject.slug || { current: '' },
          mainImage: existingProject.mainImage || {
            _type: 'image',
            asset: { _ref: '', url: '' }
          },
          _rawBody: existingProject._rawBody || '',
          body: existingProject.body || []
        });
        setDateKey(prev => prev + 1);
      }
    }
  }, [projectId, projectsData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'slugCurrent') {
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
    
    // Auto-generate slug from title
    if (name === 'title' && !projectId) {
      const slugValue = value;
      setFormData(prev => ({
        ...prev,
        slug: {
          ...prev.slug,
          current: slugValue
        },
        _id: projectId || `project-${Date.now()}`
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
        asset: {
          ...prev.mainImage.asset,
          url,
          _ref: url ? `image-${Date.now()}` : ''
        }
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData._rawBody.trim()) {
      newErrors._rawBody = 'Project description is required';
    }
    
    if (!formData.categories) {
      newErrors.categories = 'Category is required';
    }
    
    if (!formData.publishedAt) {
      newErrors.publishedAt = 'Project date is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author/Team is required';
    }

    const validNames = formData.names.filter(name => name.trim());
    if (validNames.length === 0) {
      newErrors.names = 'At least one team member is required';
    }

    if (!projectId) {
      const titleExists = projectsData.some(item => 
        item.title.toLowerCase() === formData.title.toLowerCase() && item._id !== projectId
      );
      if (titleExists) {
        newErrors.title = 'Project title already exists';
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
      
      const projectItem = {
        ...formData,
        _id: projectId || formData._id || `project-${Date.now()}`,
        _createdAt: projectId ? formData._createdAt : currentTime,
        _updatedAt: currentTime,
        _rev: `rev-${Date.now()}`,
        // Convert the date input to ISO string for storage
        publishedAt: new Date(formData.publishedAt).toISOString(),
        names: formData.names.filter(name => name.trim()),
        // Create body blocks from _rawBody for consistency
        body: formData._rawBody ? [{
          _key: `block-${Date.now()}`,
          _type: 'block',
          children: [{
            _key: `span-${Date.now()}`,
            _type: 'span',
            marks: [],
            text: formData._rawBody
          }],
          markDefs: [],
          style: 'normal'
        }] : []
      };
      
      let result;
      if (projectId) {
        result = await updateItem(projectId, projectItem);
      } else {
        result = await addItem(projectItem);
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
          label="Project ID"
          name="_id"
          value={formData._id}
          onChange={handleInputChange}
          placeholder="Auto-generated project ID"
          required
          error={errors._id}
        />
      </div>

      <FormField
        label="Slug (Description/Summary)"
        name="slugCurrent"
        value={formData.slug.current}
        onChange={handleInputChange}
        placeholder="Brief project summary or description"
        required
        error={errors.slug}
      />

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
        
        {/* FIXED: Fully editable date input with calendar picker */}
        <div className="space-y-2">
          <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-300">
            Project Date <span className="text-red-400">*</span>
          </label>
          <input
  type="date"
  id="publishedAt"
  name="publishedAt"
  value={formData.publishedAt || ''}
  onChange={handleInputChange}
  required
  className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
  style={{ colorScheme: 'dark' }}
  key={`publishedAt-${dateKey}-${formData.publishedAt}`}
/>
          {errors.publishedAt && <p className="text-red-400 text-sm">{errors.publishedAt}</p>}
        </div>

        <SelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          options={PROJECT_STATUSES}
          required
        />
      </div>

      <FormField
        label="Team/Author"
        name="author"
        value={formData.author}
        onChange={handleInputChange}
        placeholder="Enter team or author name (e.g., 23AAC09, Team Smart Box)"
        required
        error={errors.author}
      />

      <ArrayField
        label="Team Member Names"
        values={formData.names}
        onChange={handleArrayChange('names')}
        placeholder="Enter team member name (with roles/mentors if applicable)"
        required
        error={errors.names}
      />

      <ImageUpload
        label="Main Project Image (Optional)"
        value={formData.mainImage?.asset?.url || ''}
        onChange={handleImageChange}
        error={errors.mainImage}
      />

      <TextAreaField
        label="Project Description (Main Content)"
        name="_rawBody"
        value={formData._rawBody}
        onChange={handleInputChange}
        placeholder="Write detailed project information, methodology, technologies used, results, etc. This will be the main content shown when the card expands."
        rows={12}
        required
        error={errors._rawBody}
      />

      {errors.submit && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
          {errors.submit}
        </div>
      )}
    </BaseForm>
  );
};

export default ProjectsForm;