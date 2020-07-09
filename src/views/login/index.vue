<template>
  <div class="login-container">
    <div class="background-block">
      <div class="background-left"></div>
      <div class="background-right"></div>
    </div>

    <div class="login-bar" id="login-bar">
      <div class="login-title">
        <h2>文献指导系统</h2>
        <span></span>
      </div>
      <div class="input">
        <Input
          v-model="username"
          prefix="ios-contact-outline"
          placeholder="学号/工号"
          style="width: 100%" 
        />
      </div>
      <div class="input">
        <Input
          v-model="password"
          type="password"
          password
          prefix="ios-lock-outline"
          placeholder="密码"
          style="width: 100%"
        />
      </div>
      <div class="input radio">
        <RadioGroup
          v-model="role"
          :style="{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          }"
        >
          <Radio :style="{ margin: '0', flexGrow: '0.3' }" label="student" border>研究生</Radio>
          <Radio :style="{ margin: '0', flexGrow: '0.3' }" label="tutor" border>导师</Radio>
          <Radio :style="{ margin: '0', flexGrow: '0.3' }" label="admin" border>管理员</Radio>
        </RadioGroup>
      </div>
      <div class="submit">
        <Button type="primary" @click="login" long>登录</Button>
      </div>
      <!-- <button class="submit-button" @click="login">确认</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      role: "student"
    }
  },
  methods: {
    login() {
      const { username, password, role } = this;
      console.log(username, password, role);
      // console.log(password);
      // console.log(role);
      this.$api.user.login({
        username,
        password,
        role
      })
        .then(res => {
          let data = res.data;
          if (data && data.code === 0) {
            // 登陆成功
            console.log(data);
            // 提交用户信息
            this.$store.dispatch("getUserInfo", data.data);
            this.$Message.success(data.msg);
            this.$router.push({
              name: "personal"
            })
          } else {
            this.$Message.error(data.msg || "登录出现错误");
          }
        })
        .catch(err => {
          console.log(err);
        })

    }
  }
}
</script>


<style lang="less" scoped>
@dark-theme: #17233d;
@border-color: #e9e9e9;

.login-container {
  box-sizing: border-box;
}

.background-block {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.background-left {
  float: left;
  width: 50%;
  height: 100%;
  background-color: @dark-theme;
}

.background-right {
  float: left;
  width: 50%;
  height: 100%;
}

.login-bar {
  position: absolute;
  left: 50%;
  top: 10%;
  height: 500px;
  width: 700px;
  margin-left: -350px;
  padding: 40px 120px;
  background-color: #ffffff;
  border: 1px solid @border-color;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.login-bar {
  text-align: center;
}

.login-title {
  text-align: center;

  h2 {
    color: rgb(168, 168, 168);
    font-size: 20px;
    font-weight: 300;
  }

  span {
    display: inline-block;
    width: 70px;
    height: 4px;
    background-color: #E9C8D5;
  }
}

.input {
  padding: 40px 0 0 0;
}

.radio {
  width: 100%;
}

.submit {
  padding-top: 50px;
}
</style>