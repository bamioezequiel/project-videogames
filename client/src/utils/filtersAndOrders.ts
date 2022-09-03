export const filterGames = (arrGames: any, typeFilter: any, value: any) => {
  switch (typeFilter) {
    case "tags":
      return value === "all"
        ? arrGames
        : arrGames.filter((g: any) => g.tags.includes(value));
    case "platforms":
      return value === "all"
        ? arrGames
        : arrGames.filter((g: any) => g.platforms.includes(value));

    case "genres":
      return value === "all"
        ? arrGames
        : arrGames.filter((g: any) => g.genres.includes(value));
  }
};

export const orderings = ( arrGames: any, typeOrder: string, orderingForm: string ) => {
  let result: any = arrGames;
  switch (typeOrder) {
    case "price":
      if (orderingForm === "asc") {
        result = arrGames.sort((a: any, b: any) => b.price - a.price);
      } else {
        result = arrGames.sort((a: any, b: any) => a.price - b.price);
      }
      return result;
    case "rating":
      if (orderingForm === "asc") {
        result = arrGames.sort((a: any, b: any) => b.price - a.price);
      } else {
        result = arrGames.sort((a: any, b: any) => a.price - b.price);
      }
      return result;
    case "alpha":
      if (orderingForm === "asc") {
        result = arrGames.sort((a: any, b: any) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      } else {
        result = arrGames.sort((a: any, b: any) =>
          b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        );
      }
      return result;
  }
};

export const search = (arrGames: any, value: any) => {
  let result: any = [];
  result = arrGames.filter((g: any) =>
    g.name.toLowerCase().includes(value.toLowerCase())
  );
  return result;
};
