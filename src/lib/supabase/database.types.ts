export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      clothing: {
        Row: {
          article: Database["public"]["Enums"]["clothing_article"]
          clothing_id: number
          color: Database["public"]["Enums"]["clothing_color"]
          image: string
          link: string
          name: string
          price: number
          style: Database["public"]["Enums"]["clothing_style"]
        }
        Insert: {
          article: Database["public"]["Enums"]["clothing_article"]
          clothing_id?: number
          color: Database["public"]["Enums"]["clothing_color"]
          image: string
          link: string
          name: string
          price: number
          style: Database["public"]["Enums"]["clothing_style"]
        }
        Update: {
          article?: Database["public"]["Enums"]["clothing_article"]
          clothing_id?: number
          color?: Database["public"]["Enums"]["clothing_color"]
          image?: string
          link?: string
          name?: string
          price?: number
          style?: Database["public"]["Enums"]["clothing_style"]
        }
        Relationships: []
      }
      user_outfits: {
        Row: {
          footwear_id: number | null
          headwear_id: number | null
          outfit_id: number
          outfit_name: string | null
          pants_id: number | null
          top_id: number | null
          user_id: string
        }
        Insert: {
          footwear_id?: number | null
          headwear_id?: number | null
          outfit_id?: number
          outfit_name?: string | null
          pants_id?: number | null
          top_id?: number | null
          user_id?: string
        }
        Update: {
          footwear_id?: number | null
          headwear_id?: number | null
          outfit_id?: number
          outfit_name?: string | null
          pants_id?: number | null
          top_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_outfits_footwear_id_fkey"
            columns: ["footwear_id"]
            isOneToOne: false
            referencedRelation: "clothing"
            referencedColumns: ["clothing_id"]
          },
          {
            foreignKeyName: "user_outfits_footwear_id_fkey"
            columns: ["footwear_id"]
            isOneToOne: false
            referencedRelation: "clothing_picker_view"
            referencedColumns: ["clothing_id"]
          },
          {
            foreignKeyName: "user_outfits_headwear_id_fkey"
            columns: ["headwear_id"]
            isOneToOne: false
            referencedRelation: "clothing"
            referencedColumns: ["clothing_id"]
          },
          {
            foreignKeyName: "user_outfits_headwear_id_fkey"
            columns: ["headwear_id"]
            isOneToOne: false
            referencedRelation: "clothing_picker_view"
            referencedColumns: ["clothing_id"]
          },
          {
            foreignKeyName: "user_outfits_pants_id_fkey"
            columns: ["pants_id"]
            isOneToOne: false
            referencedRelation: "clothing"
            referencedColumns: ["clothing_id"]
          },
          {
            foreignKeyName: "user_outfits_pants_id_fkey"
            columns: ["pants_id"]
            isOneToOne: false
            referencedRelation: "clothing_picker_view"
            referencedColumns: ["clothing_id"]
          },
          {
            foreignKeyName: "user_outfits_top_id_fkey"
            columns: ["top_id"]
            isOneToOne: false
            referencedRelation: "clothing"
            referencedColumns: ["clothing_id"]
          },
          {
            foreignKeyName: "user_outfits_top_id_fkey"
            columns: ["top_id"]
            isOneToOne: false
            referencedRelation: "clothing_picker_view"
            referencedColumns: ["clothing_id"]
          },
        ]
      }
    }
    Views: {
      clothing_picker_view: {
        Row: {
          article: Database["public"]["Enums"]["clothing_article"] | null
          clothing_id: number | null
          color: Database["public"]["Enums"]["clothing_color"] | null
          image: string | null
          link: string | null
          name: string | null
          price: number | null
          style: Database["public"]["Enums"]["clothing_style"] | null
        }
        Insert: {
          article?: Database["public"]["Enums"]["clothing_article"] | null
          clothing_id?: number | null
          color?: Database["public"]["Enums"]["clothing_color"] | null
          image?: string | null
          link?: string | null
          name?: string | null
          price?: number | null
          style?: Database["public"]["Enums"]["clothing_style"] | null
        }
        Update: {
          article?: Database["public"]["Enums"]["clothing_article"] | null
          clothing_id?: number | null
          color?: Database["public"]["Enums"]["clothing_color"] | null
          image?: string | null
          link?: string | null
          name?: string | null
          price?: number | null
          style?: Database["public"]["Enums"]["clothing_style"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_outfit_details_by_id: {
        Args: { bleh: number }
        Returns: {
          footwear_image: string
          footwear_link: string
          footwear_name: string
          footwear_price: number
          headwear_image: string
          headwear_link: string
          headwear_name: string
          headwear_price: number
          outfit_name: string
          pants_image: string
          pants_link: string
          pants_name: string
          pants_price: number
          top_image: string
          top_link: string
          top_name: string
          top_price: number
        }[]
      }
      get_random_clothing: {
        Args: {
          selected_article: Database["public"]["Enums"]["clothing_article"]
          selected_color: Database["public"]["Enums"]["clothing_color"]
          selected_style: Database["public"]["Enums"]["clothing_style"]
        }
        Returns: {
          article: Database["public"]["Enums"]["clothing_article"]
          clothing_id: number
          color: Database["public"]["Enums"]["clothing_color"]
          image: string
          link: string
          name: string
          price: number
          style: Database["public"]["Enums"]["clothing_style"]
        }[]
      }
    }
    Enums: {
      clothing_article: "headwear" | "top" | "pants" | "footwear"
      clothing_color: "black" | "gray" | "white" | "brown" | "blue" | "green"
      clothing_style: "urban" | "grayman" | "cyberpunk" | "outdoors"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      clothing_article: ["headwear", "top", "pants", "footwear"],
      clothing_color: ["black", "gray", "white", "brown", "blue", "green"],
      clothing_style: ["urban", "grayman", "cyberpunk", "outdoors"],
    },
  },
} as const
