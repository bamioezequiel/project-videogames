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

export const orderings = (
  arrGames: any,
  typeOrder: string,
  orderingForm: string
) => {
  let result: any = arrGames;

  switch (typeOrder) {
    case "price":
      if (orderingForm === "asc") {
        result.sort((a: any, b: any) => b.price - a.price);
      } else {
        result.sort((a: any, b: any) => a.price - b.price);
      }
      return result;
    case "rating":
      if (orderingForm === "asc") {
        result.sort((a: any, b: any) => b.rating - a.rating);
      } else {
        result.sort((a: any, b: any) => a.rating - b.rating);
      }
      return result;
    case "onSale":
      if (orderingForm === "asc") {
        result.sort((a: any, b: any) => b.on_sale - a.on_sale);
      } else {
        result.sort((a: any, b: any) => a.on_sale - b.on_sale);
      }
      return result;
    case "stock":
      if (orderingForm === "asc") {
        result.sort((a: any, b: any) => b.stock - a.stock);
      } else {
        result.sort((a: any, b: any) => a.stock - b.stock);
      }
      return result;
    case "date":
      if (orderingForm === "asc") {
        result.sort((a: any, b: any) => new Date(b.released).getFullYear() - new Date(a.released).getFullYear());
      } else {
        result.sort((a: any, b: any) => new Date(a.released).getFullYear() - new Date(b.released).getFullYear());
      }
      return result;
    case "alpha":
      if (orderingForm === "asc") {
        result.sort((a: any, b: any) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      } else {
        result.sort((a: any, b: any) =>
          b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        );
      }
      return result;
    case "active":
      if (orderingForm === "asc") {
        result.sort((a: any, b: any) =>
          a.active
            .toString()
            .toLowerCase()
            .localeCompare(b.active.toString().toLowerCase())
        );
      } else {
        result.sort((a: any, b: any) =>
          b.active
            .toString()
            .toLowerCase()
            .localeCompare(a.active.toString().toLowerCase())
        );
      }
      return result;
    case "isNew":
      if (orderingForm === "asc") {
        result.sort((a: any, b: any) =>
          a.is_new
            .toString()
            .toLowerCase()
            .localeCompare(b.is_new.toString().toLowerCase())
        );
      } else {
        result.sort((a: any, b: any) =>
          b.is_new
            .toString()
            .toLowerCase()
            .localeCompare(a.is_new.toString().toLowerCase())
        );
      }
      return result;
    case "featured":
      if (orderingForm === "asc") {
        result.sort((a: any, b: any) =>
          a.featured
            .toString()
            .toLowerCase()
            .localeCompare(b.featured.toString().toLowerCase())
        );
      } else {
        result.sort((a: any, b: any) =>
          b.featured
            .toString()
            .toLowerCase()
            .localeCompare(a.featured.toString().toLowerCase())
        );
      }
      return result;
      default:
        return arrGames;
  }
};

export const search = (arrGames: any, value: any) => {
  let result: any = [];
  result = arrGames.filter((g: any) =>
    g.name.toLowerCase().includes(value.toLowerCase())
  );
  return result;
};
