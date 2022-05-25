const { userService } = require("../services/index");
const jwt = require("jsonwebtoken");
const SignUp = async (req, res) => {
  try {
    data = req.body;
    if (
      (await userService.checkNameFormat(data.name)) ||
      (await userService.checkPasswordFormat(data.password)) ||
      (await userService.checkEmailFormat(data.email))
    ) {
      return res.status(400).json({
        detail: "欄位資料格式有誤",
      });
    }
    if (!(await userService.checkEmailExistsBySignUpEmail(data.email))) {
      return res.status(400).json("信箱已註冊過");
    }
    const userSingUpState = await userService.createUser(
      data.name,
      data.email,
      data.password
    );
    return res.status(200).json({
      detail: "註冊成功，將在3秒後跳轉至登入頁面",
    });
  } catch (err) {
    return res.json({
      detail: "伺服器錯誤",
    });
  }
};

const logIn = async (req, res) => {
  try {
    data = req.body;
    if (
      (await userService.checkPasswordFormat(data.password)) ||
      (await userService.checkEmailFormat(data.email))
    ) {
      return res.status(400).json({
        detail: "欄位資料格式有誤",
      });
    }
    if (
      (await userService.checkEmailExistsBySignUpEmail(data.email)) ||
      (await userService.checkPasswordCorrectBySignInEmail(
        data.email,
        data.password
      ))
    ) {
      return res.status(401).json({
        detail: "信箱或密碼輸入不正確",
      });
    }
    signInMemberInfo = await userService.getMemberInfo(data.email);
    const token = jwt.sign(
      { user_id: signInMemberInfo.id, user_mail: signInMemberInfo.email },
      process.env.SECRET_KEY
    );
    await userService.addToken(signInMemberInfo.id, token);
    return res.status(200).json({
      detail: "登入成功",
      token: token,
      name: signInMemberInfo.first_name + " " + signInMemberInfo.second_name,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      detail: "伺服器錯誤",
    });
  }
};
module.exports = {
  SignUp,
  logIn,
};
