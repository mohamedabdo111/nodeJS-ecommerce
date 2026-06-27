const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeature = require("../utils/apiFeature");

exports.deleteOne = (model) =>
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const Model = await model.findByIdAndDelete(id);

    if (!Model) {
      return next(new ApiError(404, `no Model found for this id ${id}`));
    }

    res.status(200).json({ message: "data deleted successfully" });
  });

exports.updateOne = (model) =>
  expressAsyncHandler(async (req, res, next) => {
    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new ApiError(404, `no document found for this id ${req.params.id}`),
      );
    }

    document.save();

    res
      .status(200)
      .json({ message: "data updated successfully", data: document });
  });

exports.createOne = (model) =>
  expressAsyncHandler(async (req, res, next) => {
    const document = await model.create(req.body);
    res
      .status(201)
      .json({ message: "data created successfully", data: document });
  });

exports.getOne = (model , populateOpt) =>
  expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const query =  model.findById(id);

    if (populateOpt) {
      query.populate(populateOpt);
    }
    const document = await query;
    if (!document) {
      return next(new ApiError(404, `no document found for this id ${id}`));  
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (model, modelName) =>
  expressAsyncHandler(async (req, res) => {
    // build query
    let filter = {};

    if (req.filterObj) {
      filter = req.filterObj;
    }
    
    const totalDocuments = await model.countDocuments();
    const apiFeature = new ApiFeature(model.find(filter), req.query)

      .filter()
      .search(modelName)
      .sort()
      .limitFields()
      .pagination(totalDocuments);

    // execute query
    const { mongooseQuery, paginationInfo } = apiFeature;
    const document = await mongooseQuery;

    console.log(document);
    res.status(200).json({ data: document, pagination: paginationInfo });
  });
