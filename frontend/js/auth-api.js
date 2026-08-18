(function (global) {
  var API_BASE_URL = "https://api.tracpremium.com/api";

  function getErrorMessage(data, fallback) {
    return (
      (data && data.errors && data.errors[0] && data.errors[0].msg) ||
      (data && data.message) ||
      fallback ||
      "Ocurrió un error. Intentá nuevamente."
    );
  }

  function postJson(path, body) {
    return fetch(API_BASE_URL + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .catch(function () {
        var networkError = new Error(
          "No pudimos conectarnos con el servidor. Verificá tu conexión e intentá nuevamente."
        );
        networkError.isNetworkError = true;
        throw networkError;
      })
      .then(function (response) {
        return response.text().then(function (text) {
          var data = {};
          try {
            data = text ? JSON.parse(text) : {};
          } catch (parseError) {
            data = {};
          }

          if (!response.ok) {
            var error = new Error(getErrorMessage(data));
            error.status = response.status;
            error.data = data;
            throw error;
          }

          return data;
        });
      });
  }

  global.TracPremiumAuthAPI = {
    registerNave: function (payload) {
      return postJson("/auth/register-nave", payload);
    },
    registerClient: function (payload) {
      return postJson("/auth/register", payload);
    },
    registerTransportista: function (payload) {
      return postJson("/auth/register-transportista", payload);
    },
    verifyEmail: function (email, code) {
      return postJson("/auth/verify-email", { email: email, code: code });
    },
    resendCode: function (email) {
      return postJson("/auth/resend-code", { email: email });
    },
    getErrorMessage: getErrorMessage,
  };
})(window);
