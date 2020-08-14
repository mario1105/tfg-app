export const findSignInButton = (wrapper) => wrapper.find('[data-test-id~="login-form-sign-in-button"]').hostNodes()

export const findEmailInput = (wrapper) => wrapper.find('[data-test-id~="login-form-email-input"]').find('input')

export const findPasswordInput = (wrapper) => wrapper.find('[data-test-id~="login-form-password-input"]').find('input')

export const findLoginError = (wrapper) => wrapper.find('[data-test-id~="login-form-error"]').hostNodes()
