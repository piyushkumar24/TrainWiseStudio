export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      check_ins: {
        Row: {
          check_in_type: string
          client_id: string
          created_at: string
          data: Json
          id: string
          updated_at: string
        }
        Insert: {
          check_in_type: string
          client_id: string
          created_at?: string
          data?: Json
          id?: string
          updated_at?: string
        }
        Update: {
          check_in_type?: string
          client_id?: string
          created_at?: string
          data?: Json
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      client_activities: {
        Row: {
          activity_data: Json | null
          activity_type: string
          client_id: string
          created_at: string
          id: string
        }
        Insert: {
          activity_data?: Json | null
          activity_type: string
          client_id: string
          created_at?: string
          id?: string
        }
        Update: {
          activity_data?: Json | null
          activity_type?: string
          client_id?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_client_activities_client_id"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      email_leads: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          client_id: string
          coach_id: string
          created_at: string
          feedback_type: string | null
          id: string
          message: string
          updated_at: string
        }
        Insert: {
          client_id: string
          coach_id: string
          created_at?: string
          feedback_type?: string | null
          id?: string
          message: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          coach_id?: string
          created_at?: string
          feedback_type?: string | null
          id?: string
          message?: string
          updated_at?: string
        }
        Relationships: []
      }
      fitness_exercises: {
        Row: {
          blocks: Json | null
          created_at: string
          created_by: string
          header_image: string | null
          id: string
          intro: string | null
          is_draft: boolean
          muscle_group_main: string | null
          muscle_group_sub: string[] | null
          name: string
          tags: string[] | null
          target: string | null
          updated_at: string
        }
        Insert: {
          blocks?: Json | null
          created_at?: string
          created_by: string
          header_image?: string | null
          id?: string
          intro?: string | null
          is_draft?: boolean
          muscle_group_main?: string | null
          muscle_group_sub?: string[] | null
          name: string
          tags?: string[] | null
          target?: string | null
          updated_at?: string
        }
        Update: {
          blocks?: Json | null
          created_at?: string
          created_by?: string
          header_image?: string | null
          id?: string
          intro?: string | null
          is_draft?: boolean
          muscle_group_main?: string | null
          muscle_group_sub?: string[] | null
          name?: string
          tags?: string[] | null
          target?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_fitness_exercises_created_by"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      follow_ups: {
        Row: {
          client_id: string
          coach_id: string
          created_at: string
          due_date: string
          id: string
          notes: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          client_id: string
          coach_id: string
          created_at?: string
          due_date: string
          id?: string
          notes?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          coach_id?: string
          created_at?: string
          due_date?: string
          id?: string
          notes?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      mental_health_exercises: {
        Row: {
          blocks: Json | null
          created_at: string
          created_by: string
          exercise_type: string | null
          header_image: string | null
          id: string
          is_draft: boolean
          name: string
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          blocks?: Json | null
          created_at?: string
          created_by: string
          exercise_type?: string | null
          header_image?: string | null
          id?: string
          is_draft?: boolean
          name: string
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          blocks?: Json | null
          created_at?: string
          created_by?: string
          exercise_type?: string | null
          header_image?: string | null
          id?: string
          is_draft?: boolean
          name?: string
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_mental_health_exercises_created_by"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          has_received_welcome: boolean | null
          has_used_trial: boolean | null
          id: string
          last_feedback_given_at: string | null
          last_name: string | null
          last_program_assigned_at: string | null
          onboarding_completed: boolean | null
          plan_type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          has_received_welcome?: boolean | null
          has_used_trial?: boolean | null
          id: string
          last_feedback_given_at?: string | null
          last_name?: string | null
          last_program_assigned_at?: string | null
          onboarding_completed?: boolean | null
          plan_type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          has_received_welcome?: boolean | null
          has_used_trial?: boolean | null
          id?: string
          last_feedback_given_at?: string | null
          last_name?: string | null
          last_program_assigned_at?: string | null
          onboarding_completed?: boolean | null
          plan_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      program_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string
          client_id: string
          created_at: string
          expires_at: string | null
          id: string
          program_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          assigned_at?: string
          assigned_by: string
          client_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          program_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string
          client_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          program_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_program_assignments_assigned_by"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_program_assignments_client_id"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_assignments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      program_blocks: {
        Row: {
          block_data: Json | null
          block_order: number
          block_type: string
          content_id: string | null
          created_at: string
          day_id: string
          id: string
          updated_at: string
        }
        Insert: {
          block_data?: Json | null
          block_order: number
          block_type: string
          content_id?: string | null
          created_at?: string
          day_id: string
          id?: string
          updated_at?: string
        }
        Update: {
          block_data?: Json | null
          block_order?: number
          block_type?: string
          content_id?: string | null
          created_at?: string
          day_id?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_blocks_day_id_fkey"
            columns: ["day_id"]
            isOneToOne: false
            referencedRelation: "program_days"
            referencedColumns: ["id"]
          },
        ]
      }
      program_days: {
        Row: {
          created_at: string
          day_name: string
          day_number: number
          id: string
          updated_at: string
          week_id: string
        }
        Insert: {
          created_at?: string
          day_name: string
          day_number: number
          id?: string
          updated_at?: string
          week_id: string
        }
        Update: {
          created_at?: string
          day_name?: string
          day_number?: number
          id?: string
          updated_at?: string
          week_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_days_week_id_fkey"
            columns: ["week_id"]
            isOneToOne: false
            referencedRelation: "program_weeks"
            referencedColumns: ["id"]
          },
        ]
      }
      program_weeks: {
        Row: {
          created_at: string
          id: string
          program_id: string
          title: string | null
          updated_at: string
          week_number: number
        }
        Insert: {
          created_at?: string
          id?: string
          program_id: string
          title?: string | null
          updated_at?: string
          week_number: number
        }
        Update: {
          created_at?: string
          id?: string
          program_id?: string
          title?: string | null
          updated_at?: string
          week_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "program_weeks_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          assigned_at: string | null
          avoidance_text: string | null
          category: string | null
          client_id: string | null
          coach_id: string
          created_at: string
          description: string | null
          guidance_text: string | null
          header_image: string | null
          id: string
          in_shop_at: string | null
          in_shop_price: number | null
          personal_message: string | null
          pro_tip: string | null
          state: string | null
          status: string | null
          tags: string[] | null
          title: string
          type: string | null
          updated_at: string
        }
        Insert: {
          assigned_at?: string | null
          avoidance_text?: string | null
          category?: string | null
          client_id?: string | null
          coach_id: string
          created_at?: string
          description?: string | null
          guidance_text?: string | null
          header_image?: string | null
          id?: string
          in_shop_at?: string | null
          in_shop_price?: number | null
          personal_message?: string | null
          pro_tip?: string | null
          state?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          type?: string | null
          updated_at?: string
        }
        Update: {
          assigned_at?: string | null
          avoidance_text?: string | null
          category?: string | null
          client_id?: string | null
          coach_id?: string
          created_at?: string
          description?: string | null
          guidance_text?: string | null
          header_image?: string | null
          id?: string
          in_shop_at?: string | null
          in_shop_price?: number | null
          personal_message?: string | null
          pro_tip?: string | null
          state?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_programs_coach_id"
            columns: ["coach_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      progression: {
        Row: {
          client_id: string
          coach_id: string | null
          created_at: string
          id: string
          metric_type: string
          notes: string | null
          recorded_at: string
          unit: string
          value: number
        }
        Insert: {
          client_id: string
          coach_id?: string | null
          created_at?: string
          id?: string
          metric_type: string
          notes?: string | null
          recorded_at?: string
          unit: string
          value: number
        }
        Update: {
          client_id?: string
          coach_id?: string | null
          created_at?: string
          id?: string
          metric_type?: string
          notes?: string | null
          recorded_at?: string
          unit?: string
          value?: number
        }
        Relationships: []
      }
      recipes: {
        Row: {
          allergies: string[] | null
          blocks: Json | null
          category: string | null
          created_at: string
          created_by: string
          header_image: string | null
          id: string
          is_draft: boolean
          metrics: Json | null
          name: string
          portion_count: number | null
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          allergies?: string[] | null
          blocks?: Json | null
          category?: string | null
          created_at?: string
          created_by: string
          header_image?: string | null
          id?: string
          is_draft?: boolean
          metrics?: Json | null
          name: string
          portion_count?: number | null
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          allergies?: string[] | null
          blocks?: Json | null
          category?: string | null
          created_at?: string
          created_by?: string
          header_image?: string | null
          id?: string
          is_draft?: boolean
          metrics?: Json | null
          name?: string
          portion_count?: number | null
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_recipes_created_by"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      requests: {
        Row: {
          created_at: string
          id: string
          plan_type: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          plan_type: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          plan_type?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_items: {
        Row: {
          category: string
          created_at: string
          created_by: string
          description: string | null
          id: string
          image_urls: string[] | null
          price: number
          purchase_count: number | null
          tags: string[] | null
          title: string
          type: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          category: string
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          image_urls?: string[] | null
          price?: number
          purchase_count?: number | null
          tags?: string[] | null
          title: string
          type: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          image_urls?: string[] | null
          price?: number
          purchase_count?: number | null
          tags?: string[] | null
          title?: string
          type?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"] | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_roles_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "coach" | "customer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["coach", "customer"],
    },
  },
} as const
