class ApiFeature {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }


    filter() {
        const filters = {}
        if (this.queryString.category) {
            filters.category = this.queryString.category;
        }
        if (this.queryString.subCategory) {
            filters.subCategory = this.queryString.subCategory;
        }

        if (this.queryString.minPrice) {
            filters.price = { $gte: this.queryString.minPrice };
        }

        if (this.queryString.maxPrice) {
            filters.price = { ...filters.price, $lte: this.queryString.maxPrice };
        }


        this.mongooseQuery.find(filters);
        return this;
    }


    sort() {
        const sortBy = this.queryString.sort?.split(",").join(" ") || "-createdAt";
        this.mongooseQuery.sort(sortBy);
        return this;
    }

    limitFields() {
        const fields = this.queryString.fields?.split(",").join(" ") || "-__v";
        console.log("queryString", this.queryString);
        console.log("fields", fields);
        this.mongooseQuery.select(fields);
        return this;
    }

    search(model) {
        const keyword = this.queryString?.keyword || "";
        if (model === "product") {
            this.mongooseQuery.find({
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                ]
            });
        } else {
            this.mongooseQuery.find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } }
                ]
            })
        }
        return this;
    }

    pagination(totalDocuments) {

        const page = this.queryString?.page || 1;
        const limit = this.queryString?.limit || 10;
        const skip = (page - 1) * limit;
        const numberOfPages = Math.ceil(totalDocuments / limit);

        const pagination = {
            page,
            limit,
            numberOfPages,
            totalDocuments,
        };
        this.mongooseQuery.skip(skip).limit(limit);
        this.paginationInfo = pagination;
        return this;
    }
}

module.exports = ApiFeature;