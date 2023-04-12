import icd10 from "../infrastructure/database/connection.js";

const diseases = icd10.db.collection("diseases");

const getAll = async () => {
  try {
    const all = await diseases.find({"four-digits-code": "a01"}).toArray({});
    return all;
  } catch (error) {
    console.log({ error });
  }
};

export default {
  getAll,
};
