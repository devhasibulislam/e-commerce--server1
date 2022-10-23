const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};

exports.getBrandsService = async () => {
  const brands = await Brand.find({}).populate("suppliers");
  return brands;
};

/**
 * deep populate
 * -------------
 * https://stackoverflow.com/questions/18867628/mongoose-deep-population-populate-a-populated-field
 */
exports.getBrandByIdService = async (id) => {
  const brand = await Brand.findOne({ _id: id }).populate({
    path: "suppliers",
    select: "-_id tradeLicenseNumber location nidPhoto status",
    populate: {
      path: "user",
      select: "-_id fullName email contactNumber role status",
    },
  });
  return brand;
};

exports.updateBrandService = async (id, data) => {
  const result = await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
