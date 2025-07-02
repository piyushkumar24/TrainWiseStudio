
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useLocation } from 'react-router-dom';
import { Bell, Globe, Lock, Shield, AlertTriangle, Save } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const Settings = () => {
  const location = useLocation();
  const isCoach = location.pathname.startsWith('/coach');
  const userRole = isCoach ? 'coach' : 'customer';

  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [motivationReminders, setMotivationReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [language, setLanguage] = useState('english');
  const [darkMode, setDarkMode] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  const [allowFeedback, setAllowFeedback] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    notifications: true,
    language: false,
    privacy: false,
    security: false,
    danger: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSaveChanges = () => {
    // Simulate save action
    setHasChanges(false);
    console.log('Settings saved');
  };

  const languageOptions = [
    { value: 'english', label: 'English 🇬🇧' },
    { value: 'norwegian', label: 'Norwegian 🇳🇴' },
    { value: 'swedish', label: 'Swedish 🇸🇪' },
    { value: 'spanish', label: 'Spanish 🇪🇸' },
  ];

  return (
    <DashboardLayout userRole={userRole}>
      <div className="max-w-4xl mx-auto space-y-6 pb-24 md:pb-6">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Control your account preferences and app behavior</p>
        </div>

        {/* Notifications Section */}
        <Card>
          <Collapsible 
            open={openSections.notifications} 
            onOpenChange={() => toggleSection('notifications')}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <Bell className="h-5 w-5 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg">Notifications</CardTitle>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${openSections.notifications ? 'rotate-180' : ''}`} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="text-sm font-medium">
                    Email Notifications
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={(checked) => {
                      setEmailNotifications(checked);
                      setHasChanges(true);
                    }}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="text-sm font-medium">
                    Push Notifications
                  </Label>
                  <Switch
                    id="push-notifications"
                    checked={pushNotifications}
                    onCheckedChange={(checked) => {
                      setPushNotifications(checked);
                      setHasChanges(true);
                    }}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="motivation-reminders" className="text-sm font-medium">
                    Motivation Card Reminders
                  </Label>
                  <Switch
                    id="motivation-reminders"
                    checked={motivationReminders}
                    onCheckedChange={(checked) => {
                      setMotivationReminders(checked);
                      setHasChanges(true);
                    }}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="weekly-reports" className="text-sm font-medium">
                    Weekly Progress Reports
                  </Label>
                  <Switch
                    id="weekly-reports"
                    checked={weeklyReports}
                    onCheckedChange={(checked) => {
                      setWeeklyReports(checked);
                      setHasChanges(true);
                    }}
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Language & Display Section */}
        <Card>
          <Collapsible 
            open={openSections.language} 
            onOpenChange={() => toggleSection('language')}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Globe className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Language & Display</CardTitle>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${openSections.language ? 'rotate-180' : ''}`} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-sm font-medium">
                    Language
                  </Label>
                  <Select value={language} onValueChange={(value) => {
                    setLanguage(value);
                    setHasChanges(true);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="text-sm font-medium">
                    Dark Mode
                  </Label>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={(checked) => {
                      setDarkMode(checked);
                      setHasChanges(true);
                    }}
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Privacy Section */}
        <Card>
          <Collapsible 
            open={openSections.privacy} 
            onOpenChange={() => toggleSection('privacy')}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">Privacy</CardTitle>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${openSections.privacy ? 'rotate-180' : ''}`} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-progress" className="text-sm font-medium">
                      Show Coach My Progress
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">Allow your coach to view your progress data</p>
                  </div>
                  <Switch
                    id="show-progress"
                    checked={showProgress}
                    onCheckedChange={(checked) => {
                      setShowProgress(checked);
                      setHasChanges(true);
                    }}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-feedback" className="text-sm font-medium">
                      Allow Program Feedback
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">Enable feedback collection on programs</p>
                  </div>
                  <Switch
                    id="allow-feedback"
                    checked={allowFeedback}
                    onCheckedChange={(checked) => {
                      setAllowFeedback(checked);
                      setHasChanges(true);
                    }}
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Security Section */}
        <Card>
          <Collapsible 
            open={openSections.security} 
            onOpenChange={() => toggleSection('security')}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Lock className="h-5 w-5 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">Security</CardTitle>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${openSections.security ? 'rotate-180' : ''}`} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Password</Label>
                    <p className="text-xs text-gray-500 mt-1">Last changed 2 months ago</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor" className="text-sm font-medium">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">Add extra security to your account</p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={twoFactorAuth}
                    onCheckedChange={(checked) => {
                      setTwoFactorAuth(checked);
                      setHasChanges(true);
                    }}
                    disabled={true}
                  />
                </div>
                <Separator />
                <div>
                  <Label className="text-sm font-medium">Login History</Label>
                  <p className="text-xs text-gray-500 mt-1">Last login: Today at 2:34 PM from Chrome</p>
                  <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-blue-600">
                    View full history
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Danger Zone Section */}
        <Card className="border-red-200">
          <Collapsible 
            open={openSections.danger} 
            onOpenChange={() => toggleSection('danger')}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-red-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <CardTitle className="text-lg text-red-600">Danger Zone</CardTitle>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${openSections.danger ? 'rotate-180' : ''}`} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                  <p className="text-sm text-red-700 mb-4">
                    This will permanently delete your account and cannot be undone. All your data, programs, and progress will be lost forever.
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Delete My Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove all your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                          Yes, delete my account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>

      {/* Sticky Save Button - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
        <Button 
          onClick={handleSaveChanges}
          disabled={!hasChanges}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Desktop Save Button */}
      <div className="hidden md:block">
        <Button 
          onClick={handleSaveChanges}
          disabled={!hasChanges}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
