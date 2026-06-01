const asyncHandler = require("express-async-handler");
const BrandModel = require("./brands.model");
const slugify = require("slugify");
const ApiError = require("../../utils/apiError");
const ApiFeature = require("../../utils/apiFeature")


exports.createBrand = asyncHandler(async (req, res) => {
    const { name } = req.body;


    const brand = await BrandModel.create({ name, slug: slugify(name) })

    res.status(201).json({ data: brand })
})


exports.getAllBrands = asyncHandler(async (req, res) => {

    // build query
    const totalBrands = await BrandModel.countDocuments();
    const apiFeature = new ApiFeature(BrandModel.find(), req.query).search().limitFields().pagination(totalBrands)

    // execute query
    const { mongooseQuery, paginationInfo } = apiFeature

    const brands = await mongooseQuery

    res.status(200).json({ data: brands, pagination: paginationInfo })
})

exports.getSingleBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const brand = await BrandModel.findById(id)
    if (!brand) {
        return next(new ApiError(404, `no brand found for this id ${id}`))
    }
    res.status(200).json({ data: brand })
})


exports.updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { name } = req.body;


    const brand = await BrandModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
    if (!brand) {
        return next(new ApiError(404, `no brand found for this id ${id}`))
    }

    res.status(201).json({ data: brand })
})


exports.deleteBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await BrandModel.findByIdAndDelete(id);

    if (!brand) {
        return next(new ApiError(404, `no brand found for this id ${id}`))
    }

    res.status(200).json({ message: "brand deleted successfully" })
})