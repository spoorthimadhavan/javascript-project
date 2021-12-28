export const STOREUSERDEATILS = "STOREUSERDEATILS";

export const storeUserDetails = (payload) => {
  return {
    type: STOREUSERDEATILS,
    payload,
  };
};
