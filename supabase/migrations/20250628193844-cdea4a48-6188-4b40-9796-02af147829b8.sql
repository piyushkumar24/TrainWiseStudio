
-- This migration file is no longer needed as the functionality has been 
-- consolidated into the main database structure with the requests table
-- and the handle_onboarding_completion trigger function.

-- The new system:
-- 1. Uses the 'requests' table instead of 'client_requests'
-- 2. Uses the 'profiles' table instead of 'customer_details' 
-- 3. Has a trigger on 'profiles' table for onboarding completion
-- 4. Automatically creates requests when onboarding_completed changes to true
-- 5. Handles trial vs paid plan logic properly

-- This file is kept for reference but the actual migration was run directly
-- through the SQL editor to avoid conflicts with existing data.
