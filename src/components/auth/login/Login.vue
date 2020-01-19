<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="email"
      type="email"
      :label="$t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="$t('auth.keep_logged_in')" />
      <router-link
        class="ml-1 link"
        :to="{name: 'recover-password'}"
      >{{$t('auth.recover_password')}}</router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0" :disabled="submitDisabled">{{ $t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'login',
  components: {},
  data () {
    return {
      email: '',
      password: '',
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
      submitDisabled: false,
    }
  },
  computed: mapState({
    sessionid: state => state.account.sessionid,
    isLoading: state => state.account.isLoading,
    errMsg: state => state.account.errMsg,
    formReady () {
      return !this.emailErrors.length && !this.passwordErrors.length
    },
  }),
  created () {},

  methods: {
    async onsubmit () {
      this.submitDisabled = true
      this.emailErrors = this.email ? [] : ['Email is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
        this.submitDisabled = false
        return
      }
      // this.$router.push({ name: "dashboard" });
      this.showToast('loading...', {
        icon: 'fa-circle-o-notch',
        position: 'bottom-right',
        duration: 20000,
        fullWidth: false,
      })
      let result = await this.$store.dispatch('account/login', {
        password: this.password,
        email: this.email,
      })
      if (this.errMsg) {
        this.$toasted.clear()
        this.showToast(this.errMsg, {
          icon: 'fa-warning',
          position: 'bottom-right',
          duration: 3000,
          fullWidth: false,
        })
      } else {
        this.$toasted.clear()
        this.showToast('login success', {
          icon: 'lightbulb-o',
          position: 'bottom-right',
          duration: 3000,
          fullWidth: false,
        })
      }
      setTimeout(() => {
        this.submitDisabled = false
      }, 2000)
    },
  },
}
</script>

<style>
.fa-circle-o-notch {
  animation: loadingSpin 1s linear infinite;
}

</style>
