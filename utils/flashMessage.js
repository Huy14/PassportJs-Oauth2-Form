const flashMessages = (paramReq) => {
  const userFlash = {
    data: paramReq.flash('userFlash'),
    type: 'error',
  };
  const passwordFlash = {
    data: paramReq.flash('passwordFlash'),
    type: 'error',
  };
  const createUserFlash = {
    data: paramReq.flash('createUserFlash'),
    type: 'success',
  };
  const forgotPasswordFlash2 = {
    data: paramReq.flash('forgotPasswordFlash2'),
    type: 'success',
  };
  const resetPasswordFlash2 = {
    data: paramReq.flash('resetPasswordFlash2'),
    type: 'success',
  };

  return [
    userFlash,
    passwordFlash,
    createUserFlash,
    forgotPasswordFlash2,
    resetPasswordFlash2,
  ];
};

module.exports = flashMessages;
