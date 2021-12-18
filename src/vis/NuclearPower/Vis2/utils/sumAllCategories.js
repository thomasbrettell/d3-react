//this is probably an unefficient solution. its still pretty quick tho
const sumAllCategories = (data) => {
  const res = [];

  data.forEach((dp) => {
    for (const cat in dp) {
      if (cat === 'Year') continue;
      const index = res.findIndex((el) => el.cat === cat);
      if (index >= 0) {
        const currentAmount = res[index].value;
        res[index].value = currentAmount + dp[cat];
      } else {
        res.push({
          cat: cat,
          value: dp[cat],
        });
      }
    }
  });

  return res;
};

export default sumAllCategories;
