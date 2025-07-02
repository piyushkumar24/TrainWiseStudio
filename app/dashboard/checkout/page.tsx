"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CartItemCard } from "@/components/checkout/CartItemCard";
import { EmptyCartState } from "@/components/checkout/EmptyCartState";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("STANDARD");
  
  // Check URL parameters for success/canceled status
  useEffect(() => {
    if (!searchParams) return;
    
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    
    if (success) {
      toast({
        title: "Payment successful!",
        description: "Thank you for your purchase. Your subscription is now active.",
        variant: "success",
      });
    }
    
    if (canceled) {
      toast({
        title: "Payment canceled",
        description: "Your payment was canceled. Please try again.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);
  
  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType: selectedPlan,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      
      // For paid plans, redirect to Stripe
      if (data.url) {
        window.location.href = data.url;
      } else {
        // For trial, show success message
        toast({
          title: "Trial activated!",
          description: "Your 14-day trial has been activated successfully.",
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process checkout",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const planDetails = {
    TRIAL: {
      title: "Free Trial",
      price: 0,
      description: "14-day access to basic features",
      features: [
        "1 program",
        "Library preview",
        "Blog access"
      ]
    },
    OTP: {
      title: "One-Time Payment",
      price: 29.99,
      description: "30-day access to a single program",
      features: [
        "1 assigned program",
        "30 days of access",
        "Basic support"
      ]
    },
    STANDARD: {
      title: "Standard Plan",
      price: 49.99,
      description: "Monthly subscription with standard features",
      features: [
        "Full library access",
        "Blog access",
        "Shop access",
        "1 program at a time"
      ]
    },
    PREMIUM: {
      title: "Premium Plan",
      price: 99.99,
      description: "Monthly subscription with all features",
      features: [
        "Full access to everything",
        "All 3 program types",
        "Progress tracking",
        "Coach feedback"
      ]
    }
  };
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select a Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedPlan} 
                onValueChange={setSelectedPlan}
                className="space-y-4"
              >
                {Object.entries(planDetails).map(([planType, plan]) => (
                  <div key={planType} className="flex items-start space-x-3">
                    <RadioGroupItem value={planType} id={planType} />
                    <div className="grid gap-1.5">
                      <Label htmlFor={planType} className="font-medium">
                        {plan.title} - ${plan.price.toFixed(2)}
                        {planType === "STANDARD" || planType === "PREMIUM" ? "/month" : ""}
                      </Label>
                      <p className="text-sm text-gray-500">{plan.description}</p>
                      <ul className="text-sm text-gray-600 list-disc pl-5 pt-2">
                        {plan.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
          
          {selectedPlan === "TRIAL" && (
            <Alert className="mb-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Trial Plan</AlertTitle>
              <AlertDescription>
                The trial plan gives you 14 days of access. You can only use the trial once.
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <div>
          <OrderSummary
            subtotal={planDetails[selectedPlan as keyof typeof planDetails].price}
            total={planDetails[selectedPlan as keyof typeof planDetails].price}
            onCheckout={handleCheckout}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
} 