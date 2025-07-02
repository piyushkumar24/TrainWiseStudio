
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, FileText, Image, Film, FileCheck, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const TRIGGER_OPTIONS = [
  {
    value: 'onboarding_completed',
    label: 'Onboarding Completed',
    tooltip: 'Sent when a new client completes their onboarding process'
  },
  {
    value: 'first_program_assigned',
    label: 'First Program Assigned',
    tooltip: 'Sent when a client receives their first personalized program'
  },
  {
    value: 'subscription_ended',
    label: 'Subscription Ended (No Renewal)',
    tooltip: 'Sent when a client\'s subscription expires without renewal'
  }
];

const ALLOWED_FILE_TYPES = ['.pdf', '.docx', '.jpg', '.jpeg', '.png', '.mp4'];

// Mock data for existing files - this would come from Supabase later
const mockExistingFiles = [
  {
    id: '1',
    title: 'Welcome Package',
    fileName: 'welcome-package.pdf',
    trigger: 'onboarding_completed',
    uploadedAt: '2024-01-10',
    fileSize: '2.4 MB'
  },
  {
    id: '2',
    title: 'First Program Guide',
    fileName: 'program-guide.pdf',
    trigger: 'first_program_assigned',
    uploadedAt: '2024-01-08',
    fileSize: '1.8 MB'
  }
];

export const AutoSendFilesSection = () => {
  const [title, setTitle] = useState('');
  const [trigger, setTrigger] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [existingFiles, setExistingFiles] = useState(mockExistingFiles);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
      if (ALLOWED_FILE_TYPES.includes(fileExtension)) {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload PDF, DOCX, JPG, PNG, or MP4 files only.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !trigger || !file) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and select a file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      const newFile = {
        id: Date.now().toString(),
        title,
        fileName: file.name,
        trigger,
        uploadedAt: new Date().toISOString().split('T')[0],
        fileSize: (file.size / 1024 / 1024).toFixed(1) + ' MB'
      };
      
      setExistingFiles(prev => [...prev, newFile]);
      setIsUploading(false);
      toast({
        title: "File uploaded successfully",
        description: `${title} will be auto-sent when ${TRIGGER_OPTIONS.find(t => t.value === trigger)?.label.toLowerCase()}.`,
      });
      
      // Reset form
      setTitle('');
      setTrigger('');
      setFile(null);
    }, 2000);
  };

  const handleDeleteFile = (fileId: string) => {
    setExistingFiles(prev => prev.filter(f => f.id !== fileId));
    toast({
      title: "File deleted",
      description: "The auto-send file has been removed.",
    });
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png'].includes(extension || '')) return <Image className="h-5 w-5" />;
    if (extension === 'mp4') return <Film className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  const clearFile = () => setFile(null);

  const getTriggerLabel = (triggerValue: string) => {
    return TRIGGER_OPTIONS.find(t => t.value === triggerValue)?.label || triggerValue;
  };

  const getTriggerColor = (triggerValue: string) => {
    const colors = {
      'onboarding_completed': 'bg-green-100 text-green-800',
      'first_program_assigned': 'bg-blue-100 text-blue-800',
      'subscription_ended': 'bg-orange-100 text-orange-800'
    };
    return colors[triggerValue as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Current Files Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            👁️ Current Auto-Send Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          {existingFiles.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No auto-send files configured yet.</p>
              <p className="text-sm">Upload files below to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {existingFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  {getFileIcon(file.fileName)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium truncate">{file.title}</h4>
                      <Badge className={getTriggerColor(file.trigger)}>
                        {getTriggerLabel(file.trigger)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{file.fileName}</p>
                    <p className="text-xs text-gray-500">
                      {file.fileSize} • Uploaded {file.uploadedAt}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteFile(file.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload New File */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📁 Upload New Auto-Send File
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* File Title */}
            <div className="space-y-2">
              <Label htmlFor="file-title">File Title</Label>
              <Input
                id="file-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter file title..."
                className="w-full"
              />
            </div>

            {/* Trigger Selection */}
            <div className="space-y-2">
              <Label htmlFor="trigger-select">Select Trigger</Label>
              <Select value={trigger} onValueChange={setTrigger}>
                <SelectTrigger className="w-full min-w-0">
                  <SelectValue placeholder="Choose when to send this file" />
                </SelectTrigger>
                <SelectContent className="w-[var(--radix-select-trigger-width)] max-w-[90vw]" position="popper" sideOffset={4}>
                  {TRIGGER_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="w-full">
                      <div className="w-full">
                        <div className="font-medium text-sm leading-tight">{option.label}</div>
                        <div className="text-xs text-gray-500 mt-1 leading-tight">{option.tooltip}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Upload File</Label>
              {!file ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOCX, JPG, PNG, MP4 (max 10MB)
                  </p>
                  <input
                    type="file"
                    accept={ALLOWED_FILE_TYPES.join(',')}
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {getFileIcon(file.name)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-[#FF6B2C] hover:bg-[#e55b22]"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <FileCheck className="h-4 w-4 mr-2" />
                  Upload Auto-Send File
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
