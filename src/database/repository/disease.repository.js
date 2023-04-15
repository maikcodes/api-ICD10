import { Disease } from "../models/disease.js";

const create = async (disease) => {
  try {
    const newDisease = new Disease({ ...disease });
    await newDisease.save();
    return newDisease;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  const allDisease = await Disease.find();
  return allDisease;
};

const getById = async (id) => {
  const disease = await Disease.findById(id);
  return disease;
};

const update = async (id, disease) => {
  try {
    const updatedDisease = await Disease.findByIdAndUpdate(id, disease, {
      new: true,
    });
    return updatedDisease;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    const deletedDisease = await Disease.findByIdAndDelete(id);
    return deletedDisease;
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  getAll,
  getById,
  update,
  remove,
};
