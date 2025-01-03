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
      card_analytics: {
        Row: {
          card_id: string | null
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          card_id?: string | null
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          card_id?: string | null
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "card_analytics_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "card_deliveries"
            referencedColumns: ["id"]
          },
        ]
      }
      card_deliveries: {
        Row: {
          card_image: string
          created_at: string | null
          id: string
          message: string
          recipient_email: string
          scheduled_date: string | null
          sent_date: string | null
          status: Database["public"]["Enums"]["card_delivery_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          card_image: string
          created_at?: string | null
          id?: string
          message: string
          recipient_email: string
          scheduled_date?: string | null
          sent_date?: string | null
          status?: Database["public"]["Enums"]["card_delivery_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          card_image?: string
          created_at?: string | null
          id?: string
          message?: string
          recipient_email?: string
          scheduled_date?: string | null
          sent_date?: string | null
          status?: Database["public"]["Enums"]["card_delivery_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      card_styles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          material_properties: Json | null
          name: string
          preview_image_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          material_properties?: Json | null
          name: string
          preview_image_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          material_properties?: Json | null
          name?: string
          preview_image_url?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          birthday: string | null
          created_at: string | null
          id: string
          name: string
          preferred_categories: string[] | null
          relationship: string
          user_id: string | null
        }
        Insert: {
          birthday?: string | null
          created_at?: string | null
          id?: string
          name: string
          preferred_categories?: string[] | null
          relationship: string
          user_id?: string | null
        }
        Update: {
          birthday?: string | null
          created_at?: string | null
          id?: string
          name?: string
          preferred_categories?: string[] | null
          relationship?: string
          user_id?: string | null
        }
        Relationships: []
      }
      discount_codes: {
        Row: {
          code: string
          created_at: string | null
          expires_at: string
          id: string
          percentage: number
          used: boolean | null
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          expires_at: string
          id?: string
          percentage: number
          used?: boolean | null
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          percentage?: number
          used?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      game_plays: {
        Row: {
          created_at: string | null
          discount_won: number | null
          id: string
          played_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          discount_won?: number | null
          id?: string
          played_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          discount_won?: number | null
          id?: string
          played_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      gift_favorites: {
        Row: {
          created_at: string | null
          gift_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          gift_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          gift_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gift_favorites_gift_id_fkey"
            columns: ["gift_id"]
            isOneToOne: false
            referencedRelation: "gift_recommendations"
            referencedColumns: ["id"]
          },
        ]
      }
      gift_preferences: {
        Row: {
          created_at: string | null
          id: string
          interests: string[] | null
          max_budget: number | null
          min_budget: number | null
          style: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interests?: string[] | null
          max_budget?: number | null
          min_budget?: number | null
          style?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interests?: string[] | null
          max_budget?: number | null
          min_budget?: number | null
          style?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      gift_recommendations: {
        Row: {
          category: string
          created_at: string | null
          delivery_status: string | null
          description: string
          id: string
          image_url: string | null
          name: string
          price: number
        }
        Insert: {
          category: string
          created_at?: string | null
          delivery_status?: string | null
          description: string
          id?: string
          image_url?: string | null
          name: string
          price: number
        }
        Update: {
          category?: string
          created_at?: string | null
          delivery_status?: string | null
          description?: string
          id?: string
          image_url?: string | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      image_vault: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string
          is_ai_generated: boolean | null
          is_company_asset: boolean | null
          license_type: string | null
          tags: string[] | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url: string
          is_ai_generated?: boolean | null
          is_company_asset?: boolean | null
          license_type?: string | null
          tags?: string[] | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string
          is_ai_generated?: boolean | null
          is_company_asset?: boolean | null
          license_type?: string | null
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      user_gift_preferences: {
        Row: {
          aura_color: string
          created_at: string | null
          id: string
          preferred_categories: string[] | null
          user_id: string
        }
        Insert: {
          aura_color: string
          created_at?: string | null
          id?: string
          preferred_categories?: string[] | null
          user_id: string
        }
        Update: {
          aura_color?: string
          created_at?: string | null
          id?: string
          preferred_categories?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      wish_lists: {
        Row: {
          created_at: string | null
          id: string
          quiz_results: Json | null
          recipient_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          quiz_results?: Json | null
          recipient_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          quiz_results?: Json | null
          recipient_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wish_lists_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      card_delivery_status: "pending" | "scheduled" | "sent" | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
