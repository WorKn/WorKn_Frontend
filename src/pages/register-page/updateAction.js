export default function updateAction(state, payload) {
  return {
    ...state,
    userInformation: {
      ...state.userInformation,
      ...payload,
    },
  };
}
