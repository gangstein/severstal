const dataService = {
  async fetchData(isActive) {
    const res = await fetch('./data/default.json');
    const json = await res.json();

    switch (isActive) {
      case 'true':
        return json.filter(data => data.isActive);
      case 'false':
        return json.filter(data => !data.isActive);
      default:
        return json;
    }
  },
};

export { dataService };
