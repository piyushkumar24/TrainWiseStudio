
-- Step 1: Drop the existing has_role function first
DROP FUNCTION public.has_role(uuid, app_role);

-- Step 2: Create the new enum type
CREATE TYPE public.app_role_new AS ENUM ('coach', 'customer');

-- Step 3: Create a temporary column with the new enum type
ALTER TABLE public.user_roles ADD COLUMN role_temp app_role_new;

-- Step 4: Populate the temporary column with converted values
UPDATE public.user_roles 
SET role_temp = CASE 
  WHEN role::text = 'admin' THEN 'coach'::app_role_new
  WHEN role::text = 'customer' THEN 'customer'::app_role_new
  ELSE 'customer'::app_role_new
END;

-- Step 5: Drop the old role column
ALTER TABLE public.user_roles DROP COLUMN role;

-- Step 6: Rename the temporary column to role
ALTER TABLE public.user_roles RENAME COLUMN role_temp TO role;

-- Step 7: Drop the old enum type
DROP TYPE public.app_role;

-- Step 8: Rename the new enum type
ALTER TYPE public.app_role_new RENAME TO app_role;

-- Step 9: Recreate the has_role function with the updated enum
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;
