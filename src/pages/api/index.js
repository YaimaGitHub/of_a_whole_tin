import data from "../../data"

const handleSort = (items, sortMode) => {
  switch (sortMode) {
    case "Ascendente":
      return items.sort((a, b) => a.title.localeCompare(b.title))
    case "Descendente":
      return items.sort((a, b) => b.title.localeCompare(a.title))
    case "Precio mínimo":
      return items.sort((a, b) => a.price - b.price)
    case "Precio máximo":
      return items.sort((a, b) => b.price - a.price)
    default:
      return items
  }
}

export default async (req, res) => {
  const cat = req.query.category
  const sort = req.query.sort
  const search = req.query.search
  const subcategory = req.query.subcategory

  //use settimeout for apreciate card loaders
  setTimeout(() => {
    if (!cat || !sort) return res.json(data)

    let items

    if (cat !== "all") {
      items = data.filter((i) => i.category === cat)
    } else {
      items = data
    }

    if (typeof search === "string") {
      const searchQuery = search.toLocaleLowerCase()
      items = items.filter((i) => {
        const title = i.title.toLocaleLowerCase()
        return title.includes(searchQuery)
      })
    }

    if (subcategory && subcategory !== "all") {
      items = items.filter((product) => product.subcategory === subcategory)
    }

    const sortedtItems = handleSort(items, sort)

    return res.json(sortedtItems)
  }, 800)
}
