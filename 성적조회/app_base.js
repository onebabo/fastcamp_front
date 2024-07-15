;(function (h) {
  h.registerHelper('parseDir', function (v) {
    return (v === 'USR_EVAL_ATTENDANCE' || v === 'USR_EVAL_EXAM_ATTENDANCE' || v === 'USR_EVAL_QUIZ') ? 'timetable' :
      v === 'USR_EVAL_TASK' ? 'task' :
        /^USR_EVAL_EXAM_.+$/i.test(v) ? 'exam' :
          v === 'USR_EVAL_DISCUSSION' ? 'discussion' :
            v === 'USR_EVAL_DIARY' ? 'practice/daily' :
              v === 'USR_EVAL_FIELD' ? 'practice/document' :
                v === 'USR_EVAL_ORGAN' ? 'practice/application' : 
                  v === 'USR_EVAL_JOIN' ? 'practice/episode' : ''
  })
  h.registerHelper('multiply', function (a, b) {
    return a * b
  })
  h.registerHelper('division', function (a, b) {
    return Math.ceil(a / b)
  })
  h.registerHelper('divisionFloor', function (a, b) {
    return Math.floor(a / b)
  })
  h.registerHelper('if_count', function (v, options) {
    if (/^USR_EVAL_(?:QUIZ|JOIN|EXAM_ATTENDANCE|DISCUSSION|QNA)$/i.test(v)) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  })
  h.registerHelper('namedStatus', function (v, id) {
    var practice_status = {
      '0': '<span class="orangeColor">미제출</span>',
      '1': '<span class="blueColor">제출</span>',
      '2': '검토중', '4': '검토완료',
      '3': '<span class="orangeColor">재제출요망</span>',
      '9': '<span class="blueColor">승인</span>'
    }
    var submit_status = _.extend({}, practice_status, { '9': '<span class="blueColor">채점완료</span>' })
    var exam_status = _.extend({}, submit_status, { '0': '<span class="orangeColor">미응시</span>', '1': '<span class="blueColor">응시완료</span>' })

    return /^USR_EVAL_TASK$/i.test(id) ? submit_status[v] :
      /^USR_EVAL_EXAM_.+$/i.test(id) ? exam_status[v] : practice_status[v]
  })

  h.registerHelper('parseProfessorHistory', function (v) {
    return v.replace(/<\s*br\s*>/g, '\r\n').replace(/(\r\n)+/g, '$1').replace(/(.+)/g, '<li>$1</li>')
  })

  h.registerHelper('has_shortcut', function (v, options) {
    return /^USR_EVAL_(FIELD|ORGAN|DIARY)$/i.test(v) ? options.inverse(this) : options.fn(this)
  })

  /** partials */
  h.registerPartial('classroom__summary', $('#tmpl-classroom__summary').html())
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


  
  var position_popup = function (width, height) {
    return {
      left: (screen.availWidth - width) / 2,
      top: (screen.availHeight - height) / 2,
      width: width,
      height: height
    }
  }
  var popup_win = function (url, name, options) {
    var option = _.extend({toolbar: 'no', location: 'no', status: 'no', scrollbars: 'no', resizable: 'no'}, options || {});
    var features = _.map(option, function (value, key) {
      return key + '=' + value;
    }).join(', ');

    return window.open(url, name, features);
  }
  var popup_layer = function (url, container) {
    container = container || $('body')
    var api = dw.Remote(url)
    var layer = $(document.createElement('div')).addClass('popup')
    layer.on('click', 'close', function (e) {
      if (e.isDefaultPrevented()) return
      e.preventDefault()

      layer.remove()
    })
    return function (data, placement) {
      api.get('', data).then(function(html) {
        layer.appendTo(container).html(html)
        var dimension = _.extend({ width: placement.width(), height: placement.height() }, placement.position())
        var position = {
          left: ((dimension.width - layer.width()) / 2) + dimension.left,
          top: dimension.top + dimension.height
        }
        
        if (position.top + layer.outerHeight() > container.height()) {
          position.top -= layer.outerHeight()
          layer.addClass('dw-dir__bottom')
        }
        else {
          layer.removeClass('dw-dir__bottom')
        }

        if (position.left + layer.outerWidth() > container.width()) {
          position.left = container.width() - layer.outerWidth()
          layer.addClass('dw-dir__right')
        }
        else {
          layer.removeClass('dw-dir__right')
        }
        layer.css(position).addClass('active')
      })
    }
  }
/************** 공통함수 끝 ***********************************/
  var enums = _.indexBy(['opening__fetch', 'classroom__fetch', 'classroom', 'classroom__summary', 'design__fetch', 'count__fetch', 'face_schedule'])
  templates = _.reduce(enums, function (acc, cur) {
    dw.tmpl._template(cur) && (acc[cur] = dw.tmpl.template(dw.tmpl._template(cur).innerHTML))
    return acc
  }, {}),
  contents = _.reduce(enums, function (acc, cur) {
    dw.tmpl._content(cur) && (acc[cur] = $(dw.tmpl._content(cur)))
    return acc
  }, {}),
  maps = {
    classroom: fn.byId('classroom'),
    modal: $(fn.byId('modal'))
  },
  store = { firstload: true, load_mac: false }
  var store_data = function (v) {
    _.extend(store, v)
    return v
  }
  
  var get_classid = function () {
    return maps.classroom && maps.classroom.dataset.value
  }

  var get_classroom = function (v) {
    return store.classroom || (store.classrooms && store.classrooms[v])
  }

  var get_param = (function () {
    var _params = { classid: get_classid() }
    return function (params) {
      return _.extend({}, _params, params || {})
    }
  })()


  var classrooms = remote('classroom/fetch/', {
    result: function (payload) {
      var data = []
      if (payload) {
        store_data({ classrooms: _.indexBy(payload.rows, 'classid') })
        data = _.go(
          payload.rows,
          _.groupBy('opening_id'),
          _.map(function (v) {
            var opening = v[0]
            return _.extend({ classrooms: _.map(v, function (v) { return _.extend({ is_selected: v.classid === get_classid() }, v) }) }, { 
              opening_id: opening.opening_id,
              opening_year: opening.opening_year,
              opening_semester: opening.opening_semester,
              opening_seq: opening.opening_seq,
              opened_at: opening.opened_at
            })
          })
        )
      }
      return data
    },
    render: function (payload) {
      var key = enums.classroom__fetch
      contents[key] && contents[key].html(templates[key]({ rows: payload }))
      return payload
    }
  })

  var current_classroom = remote('classroom/fetch/fetch.one.asp', {
    result: function (payload) {
      return payload.rows.length ? payload.rows[0]: null
    },
    store: function (payload) {
      return (payload && store_data({ classroom: _.extend({ is_practice: payload.course_type === '2' }, payload) })) || null
    },
    render: function (payload) {
      var key = enums.classroom
      var opening = enums.classroom__opening
      contents[key] && contents[key].html(templates[key](payload))
      contents[opening] && contents[opening].html(templates[opening](payload))
      return payload
    }
  })

  var classroom = _.pipe(
    classrooms.fetch,
    function () {
      return current_classroom.fetch({ classid: get_classid() })
    },
    function (v) {
      //메뉴설정
      var data = v.classroom
      var lnb = $(fn.byId('lnb'))
      data.course_id === '060' && lnb.find('.except-menu-060').remove()
      lnb
        .addClass(data.is_practice ? 'practice' : 'normal')
        .find('li')
        .has('a[href^="' + location.pathname + '?"]')
        .addClass('dot-lnb-selected')
      return v
    }
  )
  // 강좌 선택
  contents[enums.classroom__fetch] && contents[enums.classroom__fetch]
    .on('change', function (e) {
      this.value && (location.href = '/eduN/?' + this.value)
    })
  
/************** 강좌 공통함수 끝 ***********************************/

  var modal = function (key) {
    var template = dw.tmpl.template(dw.tmpl._template(key).innerHTML)
    var contents = $(dw.tmpl._content('modal__content'))
    return function (payload) {
      contents.html(template ? template(payload) : '')
      maps.modal.removeClass('hide')
    }
  }

  var hide_modal = function () {
    return maps.modal.addClass('hide')
  }
  var show_modal = function () {
    return maps.modal.removeClass('hide')
  }

  var design = remote('dashboard/design/', {
    render: function (payload) {
      var key = enums.design__fetch
      contents[key] && contents[key].html(templates[key]({ rows: payload && payload.rows || [] }))
      return payload
    }
  })

  var attendance = remote('attendance/fetch/', {
    result: function (payload) {
      var classid = payload && payload.classid || ''
      var absent_count = _.sum(payload.rows, function (v) { return v.absent_cnt * 1 })
      var classroom = store.classrooms[classid]
      return _.extend(classroom, { weeks: payload && payload.rows || classroom.weeks, absent_count: absent_count } )
    }
  })

  var evalued = remote('evalued/fetch/', {
    result: function (payload) {
      var classid = payload && payload.classid || ''
      var classroom = store.classrooms[classid]
      var evalued = _.map(
        payload && payload.rows || [],
        function (v) {
          var status = /USR_EVAL_(EXAM_(?:MIDTERM|FINAL)|TASK)/i.test(v.evalued_id) && v.is_show_scored === 0 && v.status === '9' ? '1' : v.status
          return _.extend(v, { status: status })
        }
      )
      return _.extend(classroom, { evalueds: payload && payload.rows || [] })
    }
  })

  var qna = remote('dashboard/qna/', {
    store: function (payload) {
      var learning_qna_cnt = 0,
        qna_cnt = 0
      if (payload && payload.result === 200) {
        learning_qna_cnt = payload.learning_qna_cnt
        qna_cnt = payload.qna_cnt
      }

      return store_data({ learning_qna_cnt: learning_qna_cnt, qna_cnt: qna_cnt })
    }
  })
  var free_classroom = remote('dashboard/free/', {
    store: function (payload) {
      var cnt = 0
      if (payload && payload.result === 200) {
        cnt = payload.cnt
      }

      return store_data({ free_classroom_cnt: cnt })
    }
  })

  var show_today_popup = function (key) {
    if (today.valid(key)) return

    $('#' + key).trigger('show.dw.popup')
  }


  
  var today = (function (resp) {
    var key = 'today'
    var store = storage(resp)(key)
    return {
      get: function () {
        return JSON.parse(store.get() || '{}')
      },
      set: function (id, period) {
        var todays = this.get()
        var current = {}
        current[id] = moment().add(period || 1, 'd')

        var value = JSON.stringify(_.extend({}, todays, current))
        //storage.setItem(key, value)
        store.set(value)
      },
      remove: store.remove,
      valid: function (id) {
        var todays = this.get()
        return todays[id] && moment().isBefore(todays[id])
      }
    }
  })(localStorage)


  var setup = (function (storage) {
    var get_data = function () {
      return JSON.parse(storage.getItem(key) || '{}')
    }
    var set_data = function(payload) {
      var value = JSON.stringify(_.extend(data, payload))
      storage.setItem(key, value)
    }
    var key = 'baeoom'
    var data = get_data()
    return {
      get: function (k) {
        return data && data[k]
      },
      set: set_data,
      remove: function () {
        storage.removeItem(key)
      }
    }
  })(localStorage)

  var view_mode = setup.get('view_mode') || '' // 'simpleView'
  $('[data-button="viewmode"]')
  .on('click', function (e) {
    if (e.isDefaultPrevented()) return
    e.preventDefault()

    var button = $(this),
      value = button.data('value')
    var simple_view_mode = 'simpleView'
    button.trigger('selected.dw.viewmode')
    button.siblings('.On').trigger('unselected.dw.viewmode')
    setup.set({ 'view_mode': value })
    $('.course')[value === simple_view_mode ? 'addClass' : 'removeClass'](simple_view_mode)
  })
  .on('selected.dw.viewmode', function (e) {
    $(this).addClass('On').append('<span class="sr-only">선택</span>')
  })
  .on('unselected.dw.viewmode', function (e) {
    $(this).removeClass('On').find('.sr-only').remove()
  })
  .filter('[data-value="' + view_mode + '"]').click()

  $('.classroom-popup')
    .on('hide.dw.popup', function (e) {
      $(this).addClass('hide')
    })
    .on('show.dw.popup', function (e) {
      $(this).removeClass('hide')
    })
    .on('click', '[data-button="close"]', function (e) {
      if (e.isDefaultPrevented()) return
      e.preventDefault()

      var popup = $(this).parents('.classroom-popup')
      popup.trigger('hide.dw.popup')
    })
    .on('click', '[data-button="today"]', function (e) {
      if (e.isDefaultPrevented()) return
      e.preventDefault()

      var popup = $(this).parents('.classroom-popup')
      today.set(popup.attr('id') || 'classroom-popup', $(this).data('value'))
      popup.trigger('hide.dw.popup')
    })

  _.each($('.classroom-popup'), function (el) {
    var id = el.id
    id !== 'classroom-guide' && show_today_popup(id)
  })


  contents[enums.classroom] && contents[enums.classroom]
    .on('click', '[data-button]', function (e) {
      if (e.isDefaultPrevented()) return
      e.preventDefault()

      var button = $(this),
        data = button.data(),
        action = data.button
      
      action === 'professor' && show_professor({ professorid: data.value, type: data.type })
    })

  maps.modal && maps.modal
    .on('click', '[data-button]', function (e) {
      if (e.isDefaultPrevented()) return
      e.preventDefault()
    
      var button = $(this),
        data = button.data(),
        action = data.button
    
      action === 'close' && hide_modal()
    })


    /** classrooms 와 classroom 함수 재정의  */
    var classrooms = remote('classroom/fetch/', {
      result: function (payload) {
        var classrooms = _.go(
          payload && payload.rows || [],
          _.map(function (v) {
            var weeks = _.go(
              _.range(15),
              _.map(function (idx) {
                return {
                  weeks: (idx + 1),
                  attend_percent: 0,
                  is_view: idx < v.weeks_cnt,
                  learnable: -1
                }
              })
            )

            return _.extend({}, v, { weeks: weeks, loaded: 0 })
          })
        )

        var rows = _.go(
          classrooms,
          _.groupBy('opening_id'),
          _.map(function (v) {
            var opening = v[0]
            return {
              opening_id: opening.opening_id,
              opened_at: opening.opened_at,
              closed_at: opening.closed_at,
              opening_year: opening.opening_year,
              opening_semester: opening.opening_semester,
              opening_seq: opening.opening_seq,
              count: v.length,
              view_mode: view_mode,
              courses: v
            }
          }),
          _.sortBy(function (v) {
            return v.opened_at
          })
        )
        return _.extend({ rows: rows }, store_data({ classrooms: _.indexBy(classrooms, 'classid'), count: payload && payload.count || 0, idx: 0 }))
      },
      render: function (payload) {
        var key = enums.classroom__fetch
        contents[key] && templates[key] && contents[key].html(templates[key](payload))
        contents[enums.opening__fetch].trigger('init.dw.picker', payload)
        return payload
      }
    })
  
  
    var fetch_classrooms = function () {
      return classrooms.fetch()
    }

    var fetch_classroom_summary = function () {
      _.go(
        store.classrooms,
        _.filter(function (v) { return !v.loaded }),
        _.take(30),
        _.each(function (v) {
          var param = { classid: v.classid }
          return attendance.fetch(param)
          .then(function (payload) {
            return evalued.fetch(param)
          })
          .then(function (payload) {
            if (!payload) return
            payload.loaded = 1
            var content = fn.byId('classroom' + payload.classid)
            content && $(content).html(templates[enums.classroom__summary](payload))
          })
        }),
        function (v) {
          _.find(store.classrooms, function (v) { return !v.loaded }) && setTimeout(fetch_classroom_summary, 700)
        }
      )
    }

  var face_schedule_fetch = function () {
    return axios.get('/eduN/api/facecourse/schedule/fetch/', { headers: { Authorization: 'Bearer ' + token.get() }, withCredentials: true })
  }
  var face_schedule_result = function (payload) {
    if (payload.result !== 200) return
    if (payload.rows.length === 0) return

    var key = enums.face_schedule
    var schedule_by_classid = _.groupBy(payload.schedules, 'classid')
    var rows = _.go(
      payload.rows,
      _.map(function (v) {
        var schedules = schedule_by_classid[v.classid] || []
        return _.extend({ schedules: schedules }, v)
      })
    )

    contents[key] && templates[key] && contents[key].html(templates[key]({ rows: rows }))
    var is_today = today.valid(key)
    toggle_face_schedule(!is_today)
  }
  var fetch_face_schedule = _.pipe(face_schedule_fetch, face_schedule_result)
  var toggle_face_schedule = function (display) {
    var content = contents[enums.face_schedule],
      button = content.find('.bl_schedule__btn'),
      container = content.find('.js_scheduleTB__wrap')
    
    if (display) {
      button.removeClass('off').addClass('on')
      container.show()
      today.set(enums.face_schedule, -1)
    }
    else {
      button.removeClass('on').addClass('off')
      container.hide()
      today.set(enums.face_schedule, 7)
    }
  }

  contents[enums.face_schedule]
    .on('click', '.bl_schedule__btn', function (e) {
      var button = $(this),
        container = contents[enums.face_schedule].find('.js_scheduleTB__wrap')
      toggle_face_schedule(!container.is(':visible'))
    })


  var mac_validate = function () {
    return axios.get('//api.hubedu.net/classrooms/auth/computer/validate/', { headers: { Authorization: 'Bearer ' + token.get() }, withCredentials: true })
  }
  var mac_result = function (payload) {
    payload.token && token.set(payload.token)
    if (payload && payload.rows.length) {
      return false
    }
    return true
  }

  var mac_install = function (flag) {
    var load_mac = store.load_mac
    mac_checked.uninstalled = function () {
      confirm('학습활동을 위해서는 필수 프로그램 설치가 필요합니다.\n확인을 누르시면 해당 페이지로 이동합니다.') &&
      (location.href = '//auth.hubedu.net/auth/guide_install.jsp?PrePage=' + encodeURIComponent(location.href))
    }
    mac_checked.installed = function () {
      load_mac && confirm('학습활동을 위해서는 수강컴퓨터 등록이 필요합니다.\n확인을 누르시면 해당 페이지로 이동합니다.') &&
      (location.href = '/mybaeoom/my_com.asp')
      store.load_mac = true
      !load_mac && check_mac()
    }
    flag && mac_checked.check()
  }
  // 필수 설치 체크 
  var check_mac = _.pipe(mac_validate, mac_result, mac_install)

  contents[enums.opening__fetch] && contents[enums.opening__fetch]
    .on('init.dw.picker', function (e, payload) {
      var key = enums.opening__fetch
      contents[key] && templates[key] && contents[key].html(templates[key](payload))
    })
    .on('change', function (e) {
      var value = this.value
      if (!!value) {
        $('.opening').hide().filter('#' + value).show()
      }
      else {
        $('.opening').show()
      }
    })

  contents[enums.design__fetch] && contents[enums.design__fetch]
    .on('click', '[data-button="design"]', function (e) {
      if (e.isDefaultPrevented()) return
      e.preventDefault()

      var button = $(this),
        data = button.data(),
        form = $('#frm-design')
      form.find(':input[name="num"]').val(data.value)
      form.find(':input[name="plantype"]').val(data.type)
      form.attr('action', button.attr('href')).submit()
    })
  _.go(
    design.fetch({ size: 4 }),
    function (payload) {
       return payload && qna.fetch()
    },
    function (payload) {
      return payload && free_classroom.fetch()
    },
    function (payload) {
      return payload && fetch_classrooms()
    },
    function (payload) {
      // count 출력
      var key = enums.count__fetch
      var classroom_cnt = _.reduce(
        store.classrooms,
        function (acc, cur) {
          cur.is_learnable ? acc.classroom_cnt++ : acc.classroom_before_cnt++
          return acc
        },
        { classroom_cnt: 0, classroom_before_cnt: 0 }
      )
      var data = _.extend({
        learning_qna_cnt: store.learning_qna_cnt + store.qna_cnt,
        qna_cnt: store.qna_cnt,
        free_classroom_cnt: store.free_classroom_cnt
      }, classroom_cnt)

      data.classroom_cnt && show_today_popup('classroom-guide')

      contents[key] && templates[key] && contents[key].html(templates[key](data))
      return payload
    },
    function (payload) {
      
      payload && payload.count && check_mac()
      return payload && fetch_classroom_summary()
    },
    fetch_face_schedule
  )

  // classroom.fetch(get_param())
})(jQuery, dw ? dw.fn : {})