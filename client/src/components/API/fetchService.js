import useApi from "./useApi.js";

const getBodyData = (config = null) => {
  const QUERY = "/bodyData";

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useApi(QUERY, config);
};

const getBodyDataByDay = date => {
  const QUERY = "/bodyData/getByDate";
  const config = {
    method: "POST",
    data: {
      date: date
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useApi(QUERY, config);
};

const postNewBodyData = (
  identifier,
  value,
  measure,
  date,
  withDelete = true
) => {
  let QUERY = "";
  if (withDelete) QUERY = "/bodyData/deleteAndAdd";
  else QUERY = "/bodyData";

  const config = {
    method: "POST",
    data: {
      identifier: identifier,
      value: value,
      measure: measure,
      date: date
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useApi(QUERY, config);
};

const postManyData = entries => {
  const QUERY = "/bodyData/many";

  const config = {
    method: "POST",
    data: {
      entries: entries
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useApi(QUERY, config);
};

const deleteBodyData = id => {
  const QUERY = "/bodyData";

  const config = {
    method: "DELETE",
    data: {
      _id: id
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useApi(QUERY, config);
};

const deleteAll = () => {
  const QUERY = "/bodyData/all";

  const config = {
    method: "DELETE"
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useApi(QUERY, config);
};

const fetchService = {
  getBodyData,
  deleteBodyData,
  deleteAll,
  postNewBodyData,
  getBodyDataByDay,
  postManyData
};

export default fetchService;
