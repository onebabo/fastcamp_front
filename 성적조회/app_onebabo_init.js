;(function (h) {

  /** partials */
  //h.registerPartial('classroom__summary', $('#tmpl-classroom__summary').html())

})(Handlebars)



;(function ($, fn) {
  var log = fn.log,
  api = dw.Remote('/eduN/api/')
  var login_in = function () {
    alert('로그인이 필요합니다.\n\n로그인 페이지로 이동합니다.')
    var form = $('<form action="//auth.hubedu.net/loginCareer/login_id.jsp"></form>')
    var page = $('<input type="hidden" name="PrePage" value="' + [location.origin, location.pathname].join('') + '">')
    var query = $('<input type="hidden" name="Qstring" value="' + location.search + '">')
    form.append([page, query])
    form.appendTo($('body')).submit()
  }

  var storage = function (repo) {
    return function (key) {
      return {
        get: function () {
          return repo.getItem(key) || ''
        },
        set: function (value) {
          repo.setItem(key, value)
        },
        remove: function () {
          repo.removeItem(key)
        }
      }
    }
  }

  var token = storage(localStorage)('authorize')
  
  var api_defaults = function (url, fail) {
    fail = fail || function (xhr) {
      xhr.status === 401 && login_in()
    }
    return {
      fetch: function (params) {
        return api.get(url, params).catch(fail)
      },
      submit: function (payload) {
        return api.post(url, payload).catch(fail)
      },
      result: function (payload) {
        return payload
      },
      store: function (payload) {
        return payload
      },
      render: function (payload) {
        return payload
      }
    }
  }
  var remote = function (url, options) {
    var _data = null
    options = _.extend({ }, api_defaults(url, options && options.fail), options || {})
    var callback = _.pipe(options.result, options.store, options.render)
    return {
      fetch: _.pipe(options.fetch, callback),
      submit: _.pipe(options.submit, callback)
    }
  }


})(jQuery, dw ? dw.fn : {})