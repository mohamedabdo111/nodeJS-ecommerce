class ApiFeature {
  constructor(mongoQuery, queryString, filters = {}) {
    this.mongoQuery = mongoQuery;
    this.queryString = queryString;
    this.filters = filters;
  }

  filter() {
    const queryFilters = { ...this.queryString };
    const excludeFields = ["page", "limit", "sort", "fields"];
    excludeFields.forEach((field) => delete queryFilters[field]);
    if (queryFilters.minPrice) {
      this.filters.price = {
        $gte: Number(queryFilters.minPrice),
        ...this.filters.price,
      };
    }
    if (queryFilters.maxPrice) {
      this.filters.price = {
        $lte: Number(queryFilters.maxPrice),
        ...this.filters.price,
      };
    }

    if (queryFilters.category) {
      this.filters.category = queryFilters.category;
    }
    if (this.queryString.subCategory) {
      this.filters.subCategories = queryFilters.subCategory;
    }

    this.mongoQuery = this.mongoQuery.find(this.filters);

    return this;
  }

  search() {
    if (this.queryString.keyword) {
      this.filters.$or = [
        { title: { $regex: this.queryString.keyword, $options: "i" } },
        { description: { $regex: this.queryString.keyword, $options: "i" } },
      ];
    }
    this.mongoQuery = this.mongoQuery.find(this.filters);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ") || "-createdAt";
      this.mongoQuery = this.mongoQuery.sort(sortBy);
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongoQuery = this.mongoQuery.select(fields);
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page || 1;
    const limit = this.queryString.limit || 10;
    const skip = (page - 1) * limit;
    this.mongoQuery = this.mongoQuery.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeature;
