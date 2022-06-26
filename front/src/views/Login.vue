<script lang="ts">
import { defineComponent, onMounted, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import DxButton from 'devextreme-vue/button'

export default defineComponent({
  name: 'Login',
  components: {},
  props: {
    iconColor: { type: String, default: 'default' },
  },
  setup(context) {
    // const socket:any = inject("socket");
    const router = useRouter()
    const testSocket = () => {
      // socket.emit("event", new Date().getTime());
    }
    const goHome = async () => router.push({ name: 'Home' })
    return {
      testSocket,
      goHome,
    }
  },
})
</script>

<template>
  <body class="bg-gray">
    <header class="login-header">
      <a href="#">
        <img src="@/assets/images/logo-ski.png" alt="" />
      </a>
    </header>
    <div class="login">
      <div class="login__inner">
        <h1 class="login__title">Member Login</h1>
        <form class="login-form" action="#">
          <fieldset>
            <legend class="hidden">로그인</legend>
            <input
              class="login-form__input"
              type="text"
              placeholder="아이디"
              title="아이디를 입력하세요."
              required
            />
            <input
              class="login-form__input"
              type="password"
              placeholder="비밀번호"
              title="비밀번호를 입력하세요."
              required
            />
            <div class="login-form__check">
              <input type="checkbox" name="lca-save-id" id="lca-save-id" />
              <label for="lca-save-id">아이디 저장</label>
            </div>
            <p class="login-form__txt">
              아이디와 패스워드를 정확히 입력하시고, 로그인 버튼을 클릭해 주세요.<br />
              패스워드를 모르거나 아이디가 없을 경우 관리자에게 문의하시기 바랍니다.
            </p>

            <!-- (dev) 아이디 및 비밀번호 입력되면 disabled 속성 삭제 -->
            <button class="login-form__btn" disabled>로그인</button>
          </fieldset>
        </form>
      </div>
    </div>
  </body>
</template>
<style lang="scss"></style>
