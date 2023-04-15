import diseaseRepository from "../database/repository/disease.repository.js";

const create = async (disease) => {
  try {
    const newDisease = await diseaseRepository.create(disease);
    return newDisease;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const allDiseases = await diseaseRepository.getAll();
    return allDiseases;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const disease = await diseaseRepository.getById(id);
    return disease;
  } catch (error) {
    throw error;
  }
};

const getByFourthDigitsCode = async () => {};

const getByThreeDigitsCode = async () => {};

const update = async (id, disease) => {
  try {
    const editedDisease = await diseaseRepository.update(id, disease);
    return editedDisease;
  } catch (error) {
    throw error;
  }
};

const remove = async (id) => {
  try {
    const deletedDisease = await diseaseRepository.remove(id);
    return deletedDisease;
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  getAll,
  getById,
  getByFourthDigitsCode,
  getByThreeDigitsCode,
  update,
  remove,
};
