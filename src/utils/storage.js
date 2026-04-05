export const STORAGE_KEYS = {
  ACTIVITY: 'fitlife_workouts',
  DIET: 'fitlife_meals',
  GOALS: 'fitlife_goals',
  WATER: 'fitlife_water'
};

/**
 * Loads parsed JSON data from localStorage
 * @param {string} key - The localStorage key 
 * @param {any} defaultValue - Fallback data if key doesn't exist
 * @returns {any}
 */
export const loadData = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading data for key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Saves stringified JSON data to localStorage
 * @param {string} key - The localStorage key
 * @param {any} data - The data payload to save
 */
export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data for key "${key}":`, error);
  }
};
