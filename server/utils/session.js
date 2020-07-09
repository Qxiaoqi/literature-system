const hasSession = (req, res, next) => {
  let username = req.session.user;
  if (!username) {
    res.json({ code: 4, msg: "session过期，请重新登录" });
  } else {
    next();
  }
};

const canUpload = (req, res, next) => {
  let role = req.session.role;
  // console.log(role);
  if (role === "tutor" || role === "admin") {
    next();
  } else {
    res.json({ code: 1, msg: "权限不足" });
  }
};

const isTutor = (req, res, next) => {
  let role = req.session.role;
  // console.log(role);
  if (role === "tutor") {
    next();
  } else {
    res.json({ code: 1, msg: "权限不足" });
  }
};

module.exports = {
  hasSession,
  canUpload,
  isTutor
};
