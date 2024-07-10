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

})(jQuery, dw ? dw.fn : {})