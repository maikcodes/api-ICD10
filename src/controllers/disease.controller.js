import diseaseServices from "../services/disease.services.js";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../helpers/response.helpers.js";
import { ResourceNotFoundError } from "../errors/resourceNotFoundError.js";
import { parseDiseaseRequestBody } from "../helpers/disease.request.helpers.js";

const create = async (req, res) => {
  try {
    const disease = parseDiseaseRequestBody(req);
    const newDisease = await diseaseServices.create(disease);
    await sendSuccessResponse(res, newDisease);
  } catch (error) {
    console.log("controller ==== ", error);
    await sendErrorResponse(res, error);
  }
};

const getAll = async ({ res }) => {
  try {
    const allDiseases = await diseaseServices.getAll();
    await sendSuccessResponse(res, allDiseases);
  } catch (error) {
    await sendErrorResponse(res, error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const disease = await diseaseServices.getById(id);

    if (!disease) {
      throw new ResourceNotFoundError("Disease not found");
    }

    await sendSuccessResponse(res, disease);
  } catch (error) {
    await sendErrorResponse(res, error);
  }
};

const getByFourthDigitsCode = async (req, res) => {};

const getByThreeDigitsCode = async (req, res) => {};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const disease = parseDiseaseRequestBody(req);
    const editedDisease = await diseaseServices.update(id, disease);

    if (!editedDisease) {
      throw new ResourceNotFoundError("Disease not found");
    }

    await sendSuccessResponse(res, editedDisease);
  } catch (error) {
    await sendErrorResponse(res, error);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDisease = await diseaseServices.remove(id);
    await sendSuccessResponse(res, deletedDisease);
  } catch (error) {
    await sendErrorResponse(res, error);
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
