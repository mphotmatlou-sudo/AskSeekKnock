'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrayerSchedulePage from '../prayer-schedule/PrayerSchedulePage'; // Import the existing PrayerSchedulePage
import PrayerSessionPage from '../prayer-session/page'; // Import the existing PrayerSessionPage
import FastingSchedulerContent from './FastingSchedulerContent';
import PrayerJournalPage from '../prayer-journal/page';

export default function UnifiedPrayerPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6 bg-background/50">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-blocksy-heading">
            Prayer Hub
          </h2>
          <p className="text-muted-foreground mt-1">
            Plan, schedule, and experience your spiritual journey.
          </p>
        </div>
      </div>
      <Tabs defaultValue="fasting" className="space-y-6">
        <TabsList className="bg-white/50 backdrop-blur-sm border border-border/50 shadow-sm p-1 rounded-blocksy-lg h-12 w-full md:w-auto justify-start overflow-x-auto no-scrollbar">
          <TabsTrigger value="schedule" className="rounded-blocksy-md px-6 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none transition-all duration-blocksy">
            Schedule
          </TabsTrigger>
          <TabsTrigger value="session" className="rounded-blocksy-md px-6 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none transition-all duration-blocksy">
            Start Session
          </TabsTrigger>
          <TabsTrigger value="fasting" className="rounded-blocksy-md px-6 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none transition-all duration-blocksy">
            Fasting
          </TabsTrigger>
          <TabsTrigger value="journal" className="rounded-blocksy-md px-6 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none transition-all duration-blocksy">
            Prayer Journal
          </TabsTrigger>
        </TabsList>
        <div className="animate-scale-in delay-100">
          <TabsContent value="schedule" className="space-y-4 focus-visible:outline-none">
            <PrayerSchedulePage />
          </TabsContent>
          <TabsContent value="session" className="space-y-4 focus-visible:outline-none">
            <PrayerSessionPage />
          </TabsContent>
          <TabsContent value="fasting" className="space-y-4 focus-visible:outline-none">
            <FastingSchedulerContent />
          </TabsContent>
          <TabsContent value="journal" className="space-y-4 focus-visible:outline-none">
            <PrayerJournalPage />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}