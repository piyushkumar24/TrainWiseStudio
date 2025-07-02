
-- Add only missing foreign key constraints (skip existing ones)

-- Check and add foreign keys that don't exist
DO $$
BEGIN
    -- Add foreign key for client_activities if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_client_activities_client_id'
    ) THEN
        ALTER TABLE client_activities 
        ADD CONSTRAINT fk_client_activities_client_id 
        FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;

    -- Add foreign key for fitness_exercises if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_fitness_exercises_created_by'
    ) THEN
        ALTER TABLE fitness_exercises 
        ADD CONSTRAINT fk_fitness_exercises_created_by 
        FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;

    -- Add foreign key for mental_health_exercises if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_mental_health_exercises_created_by'
    ) THEN
        ALTER TABLE mental_health_exercises 
        ADD CONSTRAINT fk_mental_health_exercises_created_by 
        FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;

    -- Add foreign key for recipes if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_recipes_created_by'
    ) THEN
        ALTER TABLE recipes 
        ADD CONSTRAINT fk_recipes_created_by 
        FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;

    -- Add foreign key for programs if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_programs_coach_id'
    ) THEN
        ALTER TABLE programs 
        ADD CONSTRAINT fk_programs_coach_id 
        FOREIGN KEY (coach_id) REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;

    -- Add foreign keys for program_assignments if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_program_assignments_client_id'
    ) THEN
        ALTER TABLE program_assignments 
        ADD CONSTRAINT fk_program_assignments_client_id 
        FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_program_assignments_assigned_by'
    ) THEN
        ALTER TABLE program_assignments 
        ADD CONSTRAINT fk_program_assignments_assigned_by 
        FOREIGN KEY (assigned_by) REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;

    -- Add foreign key for user_roles if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_user_roles_user_id'
    ) THEN
        ALTER TABLE user_roles 
        ADD CONSTRAINT fk_user_roles_user_id 
        FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Create only missing RLS policies
DO $$
BEGIN
    -- Create policy for fitness_exercises if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'fitness_exercises' AND policyname = 'Users can view all published fitness exercises'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can view all published fitness exercises" ON fitness_exercises
        FOR SELECT USING (NOT is_draft OR auth.uid() = created_by)';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'fitness_exercises' AND policyname = 'Users can manage their own fitness exercises'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can manage their own fitness exercises" ON fitness_exercises
        FOR ALL USING (auth.uid() = created_by)';
    END IF;

    -- Create policy for mental_health_exercises if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'mental_health_exercises' AND policyname = 'Users can view all published mental exercises'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can view all published mental exercises" ON mental_health_exercises
        FOR SELECT USING (NOT is_draft OR auth.uid() = created_by)';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'mental_health_exercises' AND policyname = 'Users can manage their own mental exercises'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can manage their own mental exercises" ON mental_health_exercises
        FOR ALL USING (auth.uid() = created_by)';
    END IF;

    -- Create policy for recipes if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'recipes' AND policyname = 'Users can view all published recipes'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can view all published recipes" ON recipes
        FOR SELECT USING (NOT is_draft OR auth.uid() = created_by)';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'recipes' AND policyname = 'Users can manage their own recipes'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can manage their own recipes" ON recipes
        FOR ALL USING (auth.uid() = created_by)';
    END IF;

    -- Create policy for programs if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'programs' AND policyname = 'Coaches can manage their own programs'
    ) THEN
        EXECUTE 'CREATE POLICY "Coaches can manage their own programs" ON programs
        FOR ALL USING (auth.uid() = coach_id)';
    END IF;

    -- Create policy for client_activities if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'client_activities' AND policyname = 'Users can view activities for their clients'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can view activities for their clients" ON client_activities
        FOR SELECT USING (
          EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() AND role = ''coach''
          )
        )';
    END IF;

    -- Create policy for program_assignments if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'program_assignments' AND policyname = 'Coaches can manage program assignments'
    ) THEN
        EXECUTE 'CREATE POLICY "Coaches can manage program assignments" ON program_assignments
        FOR ALL USING (auth.uid() = assigned_by)';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'program_assignments' AND policyname = 'Clients can view their own assignments'
    ) THEN
        EXECUTE 'CREATE POLICY "Clients can view their own assignments" ON program_assignments
        FOR SELECT USING (auth.uid() = client_id)';
    END IF;
END $$;
