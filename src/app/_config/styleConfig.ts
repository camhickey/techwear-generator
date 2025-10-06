import { ComponentType } from "react";
import { ClothingStyle } from "@/lib/supabase/types";
import {
  UrbanModel,
  CyberpunkModel,
  OutdoorsModel,
  GraymanModel,
  ModelProps,
} from "@/app/_config/models";
import {
  UrbanEffect,
  CyberpunkEffect,
  OutdoorsEffect,
  GraymanEffect,
} from "@/app/_config/effects";

type StyleConfig = {
  Model: ComponentType<ModelProps>;
  CardEffect: ComponentType<{ isHovered: boolean }>;
  titleStyle: {
    textShadow: string;
    color: string;
  };
  description: string;
  cardImage: string;
  modal: {
    title: string;
    description: string;
    images: string[];
  };
};

export const styleConfigs: Record<ClothingStyle, StyleConfig> = {
  urban: {
    Model: UrbanModel,
    CardEffect: UrbanEffect,
    titleStyle: {
      textShadow:
        "0 0 20px rgba(36,148,36,0.8), 0 0 40px rgba(36,148,0,0.6), 2px 2px 8px rgba(0,0,0,0.8)",
      color: "#249424",
    },
    description: "The city is the place to be.",
    cardImage: "/urban/card.webp",
    modal: {
      title: "Urban",
      description:
        "The urban substyle is likely the most recognizable substyle, mainly because it is the most direct descendent of original techwear fashion. Urban techwear contextualizes the aesthetics of other clothing for an urban environment. If this sounds vague, that's because it is; typically, if techwear does not obviously fit into another category, it's a safe bet it could belong to this substyle.",
      images: ["/urban/1.webp", "/urban/2.webp", "/urban/3.webp"],
    },
  },
  cyberpunk: {
    Model: CyberpunkModel,
    CardEffect: CyberpunkEffect,
    titleStyle: {
      textShadow:
        "0 0 20px rgba(0,255,255,0.8), 0 0 40px rgba(255,0,255,0.6), 2px 2px 8px rgba(0,0,0,0.8)",
      color: "#f72585",
    },
    description: "Form over function. Style over subtlety.",
    cardImage: "/cyberpunk/card.webp",
    modal: {
      title: "Cyberpunk",
      description:
        "The cyberpunk substyle is a maximalist style that combines futuristic elements with punk, goth, and industrial aesthetics. It tends to abandon functionality for more outrageous and stylish elements. It is the foil to the grayman substyle.",
      images: ["/cyberpunk/1.webp", "/cyberpunk/2.webp", "/cyberpunk/3.webp"],
    },
  },
  outdoors: {
    Model: OutdoorsModel,
    CardEffect: OutdoorsEffect,
    titleStyle: {
      textShadow:
        "0 0 20px rgba(227,23,10,0.8), 0 0 40px rgba(227,23,0,0.6), 2px 2px 8px rgba(0,0,0,0.8)",
      color: "#e3170a",
    },
    description: "Who says you can't flex on nature?",
    cardImage: "/outdoors/card.webp",
    modal: {
      title: "Outdoors",
      description:
        "The outdoors substyle is one that typically emphasizes functonality, particularly when exposed to the elements, over expressions in style. It could be most similarly compared to the fashion trends borne from outdoor activities like hiking and adventuring.",
      images: ["/outdoors/1.webp", "/outdoors/2.webp", "/outdoors/3.webp"],
    },
  },
  grayman: {
    Model: GraymanModel,
    CardEffect: GraymanEffect,
    titleStyle: {
      textShadow:
        "0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6), 2px 2px 8px rgba(0,0,0,0.8)",
      color: "#707370",
    },
    description: "Less is more.",
    cardImage: "/grayman/card.webp",
    modal: {
      title: "Grayman",
      description:
        'As the name implies, the grayman substyle is a minimalistic style that emphasizes simplicity, clean lines, and a sense of modernity. The name "grayman" references the idea of a person who blends into their surroundings and peers, which is why the style may seem not as outwardly expressive.',
      images: ["/grayman/1.webp", "/grayman/2.webp", "/grayman/3.webp"],
    },
  },
} as const;
