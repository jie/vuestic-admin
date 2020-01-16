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
      <va-button type="submit" class="my-0">{{ $t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'login',
  components: {
  },
  data () {
    return {
      email: '',
      password: '',
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
    }
  },
  computed: mapState({
    sessionid: state => state.sessionid,
    isLoading: state => state.isLoading,
    formReady () {
      return !this.emailErrors.length && !this.passwordErrors.length
    },
  }),
  created () {},

  methods: {
    async onsubmit () {
      this.emailErrors = this.email ? [] : ['Email is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
        return
      }
      // this.$router.push({ name: "dashboard" });
      this.showToast('loading...', {
        icon: 'fa-circle-o-notch',
        position: 'bottom-right',
        duration: 'infinity',
        fullWidth: false,
      })
      await this.$store.dispatch('account/login', {
        password: this.password,
        email: this.email,
      })
      setTimeout(() => {
        this.$toasted.clear()
      }, 3000)
    },
  },
}
</script>

<style>
.fa-circle-o-notch {
  animation: spin 1s linear infinite;
}
@keyframes spin {
    0% {
        transform: rotate(0deg) scale(1);
    }
    20% {
        transform: rotate(72deg) scale(1);
    }
    40% {
        transform: rotate(144deg) scale(1);
    }
    60% {
        transform: rotate(216deg) scale(1);
    }
    80% {
        transform: rotate(288deg) scale(1);
    }
    100% {
        transform: rotate(360deg) scale(1);
    }
}
</style>
