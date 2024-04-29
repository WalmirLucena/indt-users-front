const StorageService = {
  saveData: (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  },

  getData: (key: string): JSON | null => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
  },

  removeData: (key: string) => {
    localStorage.removeItem(key);
  },
};

export default StorageService;
