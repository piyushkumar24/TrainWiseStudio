"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { requireCustomer } from "@/lib/auth";
import { ProgramType } from "@prisma/client";

export default function OnboardingPage() {
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goals: "",
    allergies: "",
    pastInjuries: "",
    likesAndDislikes: "",
    preferredProgram: "FITNESS" as ProgramType,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, preferredProgram: value as ProgramType }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/profile/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile data");
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Onboarding error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to TrainWise Studio</CardTitle>
          <CardDescription>Let's get to know you better to personalize your experience</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="goals">What are your fitness goals?</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    placeholder="e.g., Lose weight, build muscle, improve endurance..."
                    value={formData.goals}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label htmlFor="allergies">Do you have any food allergies or dietary restrictions?</Label>
                  <Textarea
                    id="allergies"
                    name="allergies"
                    placeholder="e.g., Gluten, dairy, nuts..."
                    value={formData.allergies}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="button" onClick={handleNext} className="w-full">
                  Next
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pastInjuries">Do you have any past injuries or medical conditions?</Label>
                  <Textarea
                    id="pastInjuries"
                    name="pastInjuries"
                    placeholder="e.g., Back pain, knee surgery, asthma..."
                    value={formData.pastInjuries}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="likesAndDislikes">What are your exercise preferences?</Label>
                  <Textarea
                    id="likesAndDislikes"
                    name="likesAndDislikes"
                    placeholder="e.g., I enjoy running but dislike weightlifting..."
                    value={formData.likesAndDislikes}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-base">What type of program are you most interested in?</Label>
                  <RadioGroup
                    defaultValue={formData.preferredProgram}
                    onValueChange={handleRadioChange}
                    className="mt-3 space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="FITNESS" id="fitness" />
                      <Label htmlFor="fitness" className="font-normal">
                        Fitness - Focus on exercises, strength, and conditioning
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="NUTRITION" id="nutrition" />
                      <Label htmlFor="nutrition" className="font-normal">
                        Nutrition - Focus on diet, recipes, and meal planning
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="MENTAL" id="mental" />
                      <Label htmlFor="mental" className="font-normal">
                        Mental Health - Focus on mindfulness, stress reduction, and well-being
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Complete Onboarding"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <div className="flex space-x-2">
            <div className={`h-2 w-2 rounded-full ${step === 1 ? "bg-primary" : "bg-gray-300"}`}></div>
            <div className={`h-2 w-2 rounded-full ${step === 2 ? "bg-primary" : "bg-gray-300"}`}></div>
            <div className={`h-2 w-2 rounded-full ${step === 3 ? "bg-primary" : "bg-gray-300"}`}></div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 