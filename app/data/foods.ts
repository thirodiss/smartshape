// app/data/foods.ts
export type FoodRecord = {
  id: string;
  name: string;
  baseGrams: number; // porção base
  carbs: number;     // g de carboidrato na porção base
  protein: number;   // g de proteína na porção base
  fat: number;       // g de gordura na porção base
};

// 👉 Exemplo inicial: depois você só vai enchendo essa lista
export const FOODS: FoodRecord[] = [
  // ARROZ / MASSAS
  { id: "arroz_cozido", name: "Arroz branco cozido", baseGrams: 100, carbs: 28, protein: 2, fat: 1 },
  { id: "arroz_integral", name: "Arroz integral cozido", baseGrams: 100, carbs: 23, protein: 2, fat: 1 },
  { id: "macarrao_cozido", name: "Macarrão cozido", baseGrams: 100, carbs: 25, protein: 4, fat: 1 },

  // FEIJÕES / LEGUMINOSAS
  { id: "feijao_preto", name: "Feijão preto cozido", baseGrams: 100, carbs: 14, protein: 8, fat: 1 },
  { id: "lentilha_cozida", name: "Lentilha cozida", baseGrams: 100, carbs: 16, protein: 9, fat: 0 },

  // PÃES
  { id: "pao_frances", name: "Pão francês", baseGrams: 50, carbs: 26, protein: 4, fat: 2 },
  { id: "pao_forma_branco", name: "Pão de forma branco", baseGrams: 25, carbs: 12, protein: 2, fat: 1 },
  { id: "pao_forma_integral", name: "Pão de forma integral", baseGrams: 25, carbs: 11, protein: 3, fat: 1 },
  { id: "pao_queijo", name: "Pão de queijo", baseGrams: 40, carbs: 14, protein: 3, fat: 6 },

  // CARNES
  { id: "peito_frango_grelhado", name: "Peito de frango grelhado", baseGrams: 100, carbs: 0, protein: 31, fat: 3 },
  { id: "carne_bovina_mag", name: "Carne bovina magra grelhada", baseGrams: 100, carbs: 0, protein: 26, fat: 8 },
  { id: "file_peixe_branco", name: "Filé de peixe branco grelhado", baseGrams: 100, carbs: 0, protein: 24, fat: 3 },
  { id: "ovo_cozido", name: "Ovo cozido", baseGrams: 50, carbs: 1, protein: 6, fat: 5 },

  // SALADAS / VEGETAIS
  { id: "salada_alface_tomate", name: "Salada (alface, tomate)", baseGrams: 80, carbs: 4, protein: 1, fat: 0 },
  { id: "brocolis_cozido", name: "Brócolis cozido", baseGrams: 100, carbs: 7, protein: 3, fat: 0 },

  // FRUTAS
  { id: "maca", name: "Maçã", baseGrams: 100, carbs: 14, protein: 0, fat: 0 },
  { id: "banana", name: "Banana prata", baseGrams: 80, carbs: 20, protein: 1, fat: 0 },

  // REFRIGERANTES
  { id: "refri_normal", name: "Refrigerante normal", baseGrams: 200, carbs: 22, protein: 0, fat: 0 },
  { id: "refri_zero", name: "Refrigerante zero", baseGrams: 200, carbs: 0, protein: 0, fat: 0 },

  // DOCES / SNACKS / CHICLETE
  { id: "chocolate_ao_leite", name: "Chocolate ao leite", baseGrams: 25, carbs: 14, protein: 2, fat: 8 },
  { id: "batata_frita", name: "Batata frita", baseGrams: 100, carbs: 35, protein: 4, fat: 15 },
  { id: "chiclete", name: "Chiclete (1 unidade)", baseGrams: 3, carbs: 2, protein: 0, fat: 0 },
];
