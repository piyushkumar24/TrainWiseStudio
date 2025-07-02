
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { UserIcon, Save, LogOut, X } from 'lucide-react';
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

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  birthday: string;
  mainGoal: string;
  trainingStyle: string;
  nutritionPreference: string;
  allergies: string[];
  dislikes: string;
  pastInjuries: string;
  healthConditions: string;
  physicalLimitations: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newAllergy, setNewAllergy] = useState('');
  const { toast } = useToast();
  const location = useLocation();

  const isCoach = location.pathname.startsWith('/coach');
  const layoutUserRole = isCoach ? 'coach' : 'customer';

  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    birthday: '',
    mainGoal: '',
    trainingStyle: '',
    nutritionPreference: '',
    allergies: [],
    dislikes: '',
    pastInjuries: '',
    healthConditions: '',
    physicalLimitations: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          
          // Load existing profile data (this would come from Supabase in real implementation)
          setProfileData({
            fullName: session.user.user_metadata?.full_name || '',
            email: session.user.email || '',
            phone: '',
            country: '',
            birthday: '',
            mainGoal: '',
            trainingStyle: '',
            nutritionPreference: '',
            allergies: ['Nuts', 'Dairy'], // Example data
            dislikes: '',
            pastInjuries: '',
            healthConditions: '',
            physicalLimitations: ''
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim() && !profileData.allergies.includes(newAllergy.trim())) {
      setProfileData(prev => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()]
      }));
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    setProfileData(prev => ({
      ...prev,
      allergies: prev.allergies.filter(a => a !== allergy)
    }));
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      // Here you would save to Supabase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <DashboardLayout userRole={layoutUserRole}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole={layoutUserRole}>
      <div className="max-w-4xl mx-auto space-y-6 pb-24 md:pb-6">
        {/* Header */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600">Manage your personal information and preferences</p>
            </div>
          </div>
        </div>

        {/* Profile Picture Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-orange-100 text-orange-600 text-xl">
                  {user?.email ? getInitials(user.email) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
                <p className="text-sm text-gray-600 mb-2">Update your profile photo</p>
                <Button variant="outline" size="sm">Change Photo</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Select value={profileData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sweden">Sweden</SelectItem>
                    <SelectItem value="norway">Norway</SelectItem>
                    <SelectItem value="denmark">Denmark</SelectItem>
                    <SelectItem value="finland">Finland</SelectItem>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="birthday">Birthday (Optional)</Label>
                <Input
                  id="birthday"
                  type="date"
                  value={profileData.birthday}
                  onChange={(e) => handleInputChange('birthday', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals & Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Goals & Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mainGoal">Main Goal</Label>
                <Select value={profileData.mainGoal} onValueChange={(value) => handleInputChange('mainGoal', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your main goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fat-loss">Fat Loss</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="stay-active">Stay Active</SelectItem>
                    <SelectItem value="improve-health">Improve Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="trainingStyle">Preferred Training Style</Label>
                <Select value={profileData.trainingStyle} onValueChange={(value) => handleInputChange('trainingStyle', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select training style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="gym">Gym</SelectItem>
                    <SelectItem value="outdoors">Outdoors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="nutritionPreference">Nutrition Preference</Label>
                <Select value={profileData.nutritionPreference} onValueChange={(value) => handleInputChange('nutritionPreference', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select nutrition preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Allergies</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profileData.allergies.map((allergy, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {allergy}
                    <button
                      onClick={() => handleRemoveAllergy(allergy)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  placeholder="Add allergy"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddAllergy()}
                />
                <Button type="button" variant="outline" onClick={handleAddAllergy}>
                  Add
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="dislikes">Food Dislikes</Label>
              <Textarea
                id="dislikes"
                value={profileData.dislikes}
                onChange={(e) => handleInputChange('dislikes', e.target.value)}
                placeholder="List any foods you dislike or prefer to avoid"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Medical & Limitations */}
        <Card>
          <CardHeader>
            <CardTitle>Medical & Limitations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pastInjuries">Past Injuries</Label>
              <Textarea
                id="pastInjuries"
                value={profileData.pastInjuries}
                onChange={(e) => handleInputChange('pastInjuries', e.target.value)}
                placeholder="Describe any past injuries that might affect your training"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="healthConditions">Health Conditions</Label>
              <Textarea
                id="healthConditions"
                value={profileData.healthConditions}
                onChange={(e) => handleInputChange('healthConditions', e.target.value)}
                placeholder="List any health conditions we should be aware of"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="physicalLimitations">Physical Limitations</Label>
              <Textarea
                id="physicalLimitations"
                value={profileData.physicalLimitations}
                onChange={(e) => handleInputChange('physicalLimitations', e.target.value)}
                placeholder="Describe any physical limitations or restrictions"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Password</Label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value="••••••••"
                  readOnly
                  className="bg-gray-50"
                />
                <Button variant="outline">Change Password</Button>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full md:w-auto">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be signed out of your account and redirected to the login page.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
        <Button 
          onClick={handleSaveChanges}
          disabled={saving}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Desktop Save Button */}
      <div className="hidden md:block">
        <Button 
          onClick={handleSaveChanges}
          disabled={saving}
          className="bg-orange-500 hover:bg-orange-600"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
