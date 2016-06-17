const actions = {
  updateData(newData) {
    return {
      type: 'UPDATE_DATA',
      newData,
    };
  },
};

export default actions;
