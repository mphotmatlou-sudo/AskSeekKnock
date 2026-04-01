
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { PrayerTemplate } from '@/lib/types';
import { askPrayerTemplates } from '@/lib/ask-templates';
import { personalPrayerTemplates } from '@/lib/data';

interface TemplateContextType {
  templates: PrayerTemplate[];
  addTemplate: (template: PrayerTemplate) => void;
  updateTemplate: (template: PrayerTemplate) => void;
  deleteTemplate: (templateId: string) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
  const [templates, setTemplates] = useState<PrayerTemplate[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedTemplates = localStorage.getItem('prayerTemplates');
        if (storedTemplates) {
          setTemplates(JSON.parse(storedTemplates));
        } else {
          // Seed with initial data if no templates are in local storage
          setTemplates([...askPrayerTemplates, ...personalPrayerTemplates]);
        }
      } catch (error) {
        console.error("Failed to parse templates from localStorage", error);
        setTemplates([...askPrayerTemplates, ...personalPrayerTemplates]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('prayerTemplates', JSON.stringify(templates));
      } catch (error) {
        console.error("Failed to save templates to localStorage", error);
      }
    }
  }, [templates]);

  const addTemplate = (template: PrayerTemplate) => {
    setTemplates(prevTemplates => [...prevTemplates, template]);
  };

  const updateTemplate = (updatedTemplate: PrayerTemplate) => {
    setTemplates(prevTemplates =>
      prevTemplates.map(template =>
        template.id === updatedTemplate.id ? updatedTemplate : template
      )
    );
  };

  const deleteTemplate = (templateId: string) => {
    setTemplates(prevTemplates =>
      prevTemplates.filter(template => template.id !== templateId)
    );
  };

  return (
    <TemplateContext.Provider value={{ templates, addTemplate, updateTemplate, deleteTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplates = () => {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplates must be used within a TemplateProvider');
  }
  return context;
};
