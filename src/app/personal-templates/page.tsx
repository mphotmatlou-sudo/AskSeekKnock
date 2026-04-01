
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PrayerTemplate } from '@/lib/types';
import { Timer } from '@/components/timer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CheckCircle, UserSquare, PlusCircle, Edit, Trash } from 'lucide-react';
import { useTemplates } from '@/context/TemplateContext';
import { TemplateEditor } from '@/components/template-editor';

export default function PersonalTemplatesPage() {
  const { templates, deleteTemplate } = useTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState<PrayerTemplate | null>(null);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<PrayerTemplate | null>(null);

  const handleSelectTemplate = (template: PrayerTemplate) => {
    setSelectedTemplate(template);
    setCurrentPointIndex(0);
  };

  const handleTimerComplete = () => {
    if (selectedTemplate && currentPointIndex < selectedTemplate.points.length - 1) {
      setCurrentPointIndex(prev => prev + 1);
    } else {
       // Last point finished
    }
  }

  const handleCreate = () => {
    setEditingTemplate(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (e: React.MouseEvent, template: PrayerTemplate) => {
    e.stopPropagation();
    setEditingTemplate(template);
    setIsEditorOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, templateId: string) => {
    e.stopPropagation();
    deleteTemplate(templateId);
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(null);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            Personal Templates
          </h2>
          <p className="text-muted-foreground">
            Your saved prayer guides.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Your Prayer Templates</CardTitle>
                    <CardDescription>Select a guide for your session.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    {templates.map((template) => (
                    <Button
                        key={template.id}
                        variant={selectedTemplate?.id === template.id ? 'default' : 'secondary'}
                        className="w-full justify-between h-auto py-2"
                        onClick={() => handleSelectTemplate(template)}
                    >
                        <div className="flex items-center">
                            <template.icon className="mr-2 h-4 w-4" />
                            <div className="text-left">
                                <p className="font-semibold">{template.title}</p>
                                <p className="text-xs font-normal">{template.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={(e) => handleEdit(e, template)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={(e) => handleDelete(e, template.id)}>
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    </Button>
                    ))}
                </CardContent>
            </Card>
            <Card className="flex flex-col items-center justify-center p-6 text-center">
                <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <CardTitle className="mb-2">Create New Template</CardTitle>
                <CardDescription className="mb-4">Start designing a new prayer guide from scratch.</CardDescription>
                <Button onClick={handleCreate}>
                    Create New
                </Button>
            </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
            {selectedTemplate ? (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <selectedTemplate.icon className="h-6 w-6"/>
                        {selectedTemplate.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Current Focus:</h3>
                        <p className="text-2xl font-bold text-primary">{selectedTemplate.points[currentPointIndex].title}</p>
                    </div>

                    <Timer 
                        initialMinutes={selectedTemplate.points[currentPointIndex].duration} 
                        onComplete={handleTimerComplete}
                        timerKey={`${selectedTemplate.id}-${currentPointIndex}`}
                    />
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Up Next:</h3>
                        <ul className="space-y-2">
                            {selectedTemplate.points.map((point, index) => (
                                <li key={point.title} className={cn("flex items-center gap-2 text-muted-foreground", {
                                    'text-foreground font-semibold': index === currentPointIndex,
                                    'line-through': index < currentPointIndex
                                })}>
                                   {index < currentPointIndex ? <CheckCircle className="h-4 w-4 text-green-500" /> : <div className="h-4 w-4" /> }
                                    <span>{point.title} ({point.duration} min)</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
            ) : (
                <Card className="flex items-center justify-center h-96">
                    <CardContent className="flex flex-col items-center text-center">
                        <UserSquare className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Select one of your personal templates to begin.</p>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
      <TemplateEditor
        open={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        template={editingTemplate}
      />
    </div>
  );
}
