export const MEAL_PLANS = [
  {
    id: 'weight-loss',
    title: 'Weight Loss',
    desc: 'Calorie deficit focus',
    icon: '🔥',
    veg: [
      { id: 'vl1', name: 'Oats & Berries', cals: 250, prot: 8, carbs: 40, fat: 6, img: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=300', badges: ['Low Calorie'] },
      { id: 'vl2', name: 'Quinoa Salad', cals: 320, prot: 12, carbs: 45, fat: 10, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300', badges: ['High Fiber'] },
      { id: 'vl3', name: 'Tofu Stir Fry', cals: 280, prot: 18, carbs: 15, fat: 12, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300', badges: ['High Protein', 'Low Calorie'] }
    ],
    nonVeg: [
      { id: 'nvl1', name: 'Grilled Chicken Salad', cals: 350, prot: 45, carbs: 10, fat: 12, img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=300', badges: ['High Protein', 'Low Calorie'] },
      { id: 'nvl2', name: 'Baked Salmon & Greens', cals: 410, prot: 38, carbs: 5, fat: 22, img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=300', badges: ['Keto Friendly', 'High Protein'] }
    ]
  },
  {
    id: 'weight-gain',
    title: 'Weight Gain',
    desc: 'Clean calorie surplus',
    icon: '⚖️',
    veg: [
      { id: 'vg1', name: 'Peanut Butter Banana Smoothie', cals: 650, prot: 20, carbs: 75, fat: 28, img: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=300', badges: ['High Calorie'] },
      { id: 'vg2', name: 'Paneer Makhani & Brown Rice', cals: 720, prot: 28, carbs: 80, fat: 35, img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=300', badges: ['High Protein', 'High Calorie'] }
    ],
    nonVeg: [
      { id: 'nvg1', name: 'Beef Steak & Sweet Potatoes', cals: 850, prot: 65, carbs: 55, fat: 35, img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=300', badges: ['High Protein', 'Bulking'] },
      { id: 'nvg2', name: 'Chicken Pasta Alfredo', cals: 780, prot: 55, carbs: 85, fat: 25, img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=300', badges: ['High Carbs'] }
    ]
  },
  {
    id: 'fat-loss',
    title: 'Fat Loss',
    desc: 'Macros optimized to burn fat',
    icon: '⚡',
    veg: [
      { id: 'fl1', name: 'Zucchini Noodles & Pesto', cals: 210, prot: 6, carbs: 12, fat: 16, img: 'https://images.unsplash.com/photo-1598514982205-f36b96d1ea8d?auto=format&fit=crop&q=80&w=300', badges: ['Low Carb', 'Low Calorie'] },
      { id: 'fl2', name: 'Greek Yogurt Bowl', cals: 190, prot: 18, carbs: 14, fat: 4, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=300', badges: ['High Protein'] }
    ],
    nonVeg: [
      { id: 'nvf1', name: 'Egg White Omelette', cals: 150, prot: 28, carbs: 2, fat: 2, img: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&q=80&w=300', badges: ['High Protein', 'Low Calorie'] },
      { id: 'nvf2', name: 'Tuna Salad Wrap', cals: 280, prot: 32, carbs: 20, fat: 8, img: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&q=80&w=300', badges: ['High Protein'] }
    ]
  },
  {
    id: 'muscle-gain',
    title: 'Muscle Gain',
    desc: 'High protein for hypertrophy',
    icon: '💪',
    veg: [
      { id: 'mg1', name: 'Lentil & Chickpea Curry', cals: 550, prot: 35, carbs: 80, fat: 12, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=300', badges: ['High Protein', 'High Carbs'] },
      { id: 'mg2', name: 'High Protein Pancakes', cals: 480, prot: 42, carbs: 60, fat: 10, img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=300', badges: ['High Protein'] }
    ],
    nonVeg: [
      { id: 'nmg1', name: 'Chicken & Brown Rice Bowls', cals: 620, prot: 65, carbs: 70, fat: 8, img: 'https://images.unsplash.com/photo-1598515322627-9b98abfce5ba?auto=format&fit=crop&q=80&w=300', badges: ['High Protein', 'Balanced'] },
      { id: 'nmg2', name: 'Turkey Meatballs & Quinoa', cals: 580, prot: 58, carbs: 55, fat: 14, img: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=300', badges: ['High Protein'] }
    ]
  },
  {
    id: 'fat-gain',
    title: 'Fat Gain',
    desc: 'Dense energy for hormonal reset',
    icon: '🧈',
    veg: [
      { id: 'fg1', name: 'Avocado & Olive Oil Toast', cals: 450, prot: 8, carbs: 35, fat: 32, img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80&w=300', badges: ['Healthy Fats'] },
      { id: 'fg2', name: 'Handful of Mixed Nuts', cals: 600, prot: 15, carbs: 18, fat: 55, img: 'https://images.unsplash.com/photo-1536585141-94d30c5e3d79?auto=format&fit=crop&q=80&w=300', badges: ['High Calorie', 'High Fat'] }
    ],
    nonVeg: [
      { id: 'nfg1', name: 'Full Fat Ribeye Steak', cals: 950, prot: 50, carbs: 0, fat: 75, img: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=300', badges: ['High Fat', 'Keto'] },
      { id: 'nfg2', name: 'Bacon & Eggs Skillet', cals: 720, prot: 30, carbs: 5, fat: 65, img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=300', badges: ['High Fat'] }
    ]
  }
];
