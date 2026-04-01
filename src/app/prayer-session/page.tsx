'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prayerTemplates } from '@/lib/data';
import type { PrayerTemplate } from '@/lib/types';
import { Timer } from '@/components/timer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle } from 'lucide-react';
import { SessionConfigDialog } from '@/components/session-config-dialog';

export default function PrayerSessionPage() {
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<string[]>([]);
  const [sessionTemplates, setSessionTemplates] = useState<PrayerTemplate[]>([]);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateIds(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleOpenConfigDialog = () => {
    setIsConfigDialogOpen(true);
  };

  const handleStartSession = (configuredTemplates: PrayerTemplate[]) => {
    setSessionTemplates(configuredTemplates);
    setCurrentTemplateIndex(0);
    setCurrentPointIndex(0);
    setIsConfigDialogOpen(false);
  };

  const handleNextClick = () => {
    const currentTemplate = sessionTemplates[currentTemplateIndex];
    if (currentPointIndex < currentTemplate.points.length - 1) {
      setCurrentPointIndex(prev => prev + 1);
    } else if (currentTemplateIndex < sessionTemplates.length - 1) {
      setCurrentTemplateIndex(prev => prev + 1);
      setCurrentPointIndex(0);
    } else {
      // Last point of last template finished
      setSessionTemplates([]);
    }
  }
  
  const handleTimerComplete = () => {
    const currentTemplate = sessionTemplates[currentTemplateIndex];
    if (currentPointIndex < currentTemplate.points.length - 1) {
      setCurrentPointIndex(prev => prev + 1);
    } else if (currentTemplateIndex < sessionTemplates.length - 1) {
      setCurrentTemplateIndex(prev => prev + 1);
      setCurrentPointIndex(0);
    } else {
      // Last point of last template finished
      setSessionTemplates([]);
    }
  }

  const currentTemplate = sessionTemplates[currentTemplateIndex];
  const currentPoint = currentTemplate?.points[currentPointIndex];

  if (sessionTemplates.length > 0 && currentTemplate && currentPoint) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <currentTemplate.icon className="h-6 w-6"/>
                    {currentTemplate.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Current Focus:</h3>
                    <blockquote className="p-4 bg-primary/10 border-l-4 border-primary">
                      <p className="text-2xl font-bold text-primary">{currentPoint.title}</p>
                      {currentPoint.text && <p className="text-muted-foreground mt-2">{currentPoint.text}</p>}
                    </blockquote>
                </div>

                <div className="flex items-center gap-4">
                  <Timer 
                      initialMinutes={currentPoint.duration} 
                      onComplete={handleTimerComplete}
                      timerKey={`${currentTemplate.id}-${currentPointIndex}`}
                  />
                  <Button onClick={handleNextClick} variant="outline">Next</Button>
                </div>

                
                <div>
                    <h3 className="text-lg font-semibold mb-2">Up Next in this Section:</h3>
                    <ul className="space-y-2">
                        {currentTemplate.points.map((point, index) => (
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

                {sessionTemplates.length > 1 && 
                  <div>
                      <h3 className="text-lg font-semibold mb-2">Next Session:</h3>
                      <p className="text-muted-foreground">
                        {sessionTemplates[currentTemplateIndex + 1] ? sessionTemplates[currentTemplateIndex + 1].title : 'End of session'}
                      </p>
                  </div>
                }
            </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            Prayer Session
          </h2>
          <p className="text-muted-foreground">
            Choose one or more templates to structure your prayer time.
          </p>
        </div>
        <Button onClick={handleOpenConfigDialog} disabled={selectedTemplateIds.length === 0}>
          Start Session
        </Button>
      </div>

      <Card>
          <CardHeader>
              <CardTitle>Prayer Templates</CardTitle>
              <CardDescription>Select the guides for your session.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
              {prayerTemplates.map((template) => (
              <div
                  key={template.id}
                  className={cn(
                    "w-full justify-start h-auto py-2 px-4 rounded-md flex items-center gap-4",
                    selectedTemplateIds.includes(template.id) ? 'bg-primary/10' : 'bg-secondary text-secondary-foreground'
                  )}
                  onClick={() => handleSelectTemplate(template.id)}
              >
                  <Checkbox 
                    checked={selectedTemplateIds.includes(template.id)} 
                    onCheckedChange={() => handleSelectTemplate(template.id)}
                  />
                  <template.icon className="mr-2 h-4 w-4" />
                  <div className="text-left">
                      <p className="font-semibold">{template.title}</p>
                      <p className="text-xs font-normal">{template.description}</p>
                  </div>
              </div>
              ))}
          </CardContent>
      </Card>
      <SessionConfigDialog 
        open={isConfigDialogOpen}
        onOpenChange={setIsConfigDialogOpen}
        templates={prayerTemplates.filter(t => selectedTemplateIds.includes(t.id))}
        onStartSession={handleStartSession}
      />
    </div>
  );
}
