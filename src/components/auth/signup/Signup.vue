<template>
<form @submit.prevent="onsubmit()">
  <va-input
    v-model="email"
    type="email"
    :label="$t('auth.email')"
    :error="!!emailErrors.length"
    :error-messages="emailErrors"
  />

  <va-input
    v-model="name"
    type="name"
    :label="$t('auth.name')"
  />
  <va-input
    v-model="password"
    type="password"
    :label="$t('auth.password')"
    :error="!!passwordErrors.length"
    :error-messages="passwordErrors"
  />

  <div class="auth-layout__options d-flex align--center justify--space-between">
    <va-checkbox
      v-model="agreedToTerms"
      class="mb-0"
      :error="!!agreedToTermsErrors.length"
      :errorMessages="agreedToTermsErrors"
    >
      <template slot="label">
        {{ $t('auth.agree') }}
        <span class="link">{{ $t('auth.termsOfUse') }}</span>
      </template>
    </va-checkbox>
    <router-link class="ml-1 link" :to="{name: 'recover-password'}">
      {{$t('auth.recover_password')}}
    </router-link>
  </div>

  <div class="d-flex justify--center mt-3">
    <va-button type="submit" class="my-0" :disabled="submitDisabled">{{ $t('auth.sign_up') }}</va-button>
  </div>
</form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'signup',
  data () {
    return {
      email: '',
      name: '',
      password: '',
      agreedToTerms: false,
      emailErrors: [],
      passwordErrors: [],
      agreedToTermsErrors: [],
      submitDisabled: false,
    }
  },
  computed: mapState({
    isLoading: state => state.account.isLoading,
    errMsg: state => state.account.errMsg,
    formReady () {
      return !this.emailErrors.length && !this.passwordErrors.length
    },
  }),

  methods: {
    async onsubmit () {
      this.emailErrors = this.email ? [] : ['Email is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      this.agreedToTermsErrors = this.agreedToTerms ? [] : ['You must agree to the terms of use to continue']
      if (!this.formReady) {
        return
      }

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
      let result = await this.$store.dispatch('account/regist', {
        password: this.password,
        email: this.email,
        name: this.name,
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
        this.showToast(this.$t('auth.regist_email_send'), {
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

<style lang="scss">
</style>
