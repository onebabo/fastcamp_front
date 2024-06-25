import express from 'express'
import morgan from 'morgan'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import db from './db.js'

const servicePort = process.env.PORT || 8080
const app = express()

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: '나의 일기장 API 문서',
      version: '1.0.0',
      description: '나의 일기장 앱을 위한 자동 생성된 API 문서입니다.',
    },
    servers: [
      {
        url: `http://localhost:${servicePort}`,
      },
    ],
  },
  apis: ['./server/*.js']
}

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(morgan('dev'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(express.static('dist'))
app.use(express.json())

/**
 * @swagger
 * /api/diaries:
 *   post:
 *     summary: 새로운 일기를 작성합니다.
 */
app.post('/api/diaries', (req, res) => {
  const { date, article, time } = req.body

  if (!date || !article || !time) {
    return res.status(400).json({ 
      status: 'Error',
      message: '잘못된 요청입니다.' 
    })
  }

  const sql = 'INSERT INTO diaries (date, article, time) VALUES (?, ?, ?)'
  const params = [date, article, time]

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.status(201).json({ 
      status: 'OK', 
      data: { date, article, time } 
    })
  })
})

/**
 * @swagger
 * /api/diaries:
 *   get:
 *     summary: 모든 일기 반환
 *     responses:
 *       200:
 *         description: 데이타베이스에 저장된 모든 일기를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: 2024-05-01
 *                       article:
 *                         type: string
 *                         example: sample
 *                       time:
 *                         type: string
 *                         example: 12:00
 */
app.get('/api/diaries', (req, res) => {
  const sql = 'SELECT * FROM diaries'

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ 
        status: 'Error',
        error: err.message
      })
    }

    res.json({ 
      status: 'OK',
      data: rows 
    })
  })
})

/**
 * @swagger
 * /api/diaries/:date:
 *   get:
 *     summary: 특정일의 일기를 반환합니다.
 */
app.get('/api/diaries/:date', (req, res) => {
  const sql = 'SELECT * FROM diaries WHERE date = ?'
  const params = [req.params.date]

  db.get(sql, params, (err, row) => {
    if (err) {
      return res.status(500).json({ 
        status: 'Error',
        error: err.message 
      })
    }

    if (row) {
      res.json({ 
        status: 'OK',
        data: row 
      })
    } else {
      res.status(404).json({ 
        status: 'Error',
        message: '요청한 날짜의 일기가 없습니다.' 
      })
    }
  })
})

app.get('/api/diaries/exist/:date', (req, res) => {
  const sql = 'SELECT * FROM diaries WHERE date = ?'
  const params = [req.params.date]

  db.get(sql, params, (err, row) => {
    if (err) {
      return res.status(500).json({ 
        status: 'Error',
        error: err.message 
      })
    }

    res.json({ 
      status: 'OK',
      data: !!row
    })
  })
})

/**
 * @swagger
 * /api/diaries/:date:
 *   put:
 *     summary: 특정일의 일기를 수정합니다.
 */
app.put('/api/diaries/:date', (req, res) => {
  const { article, time } = req.body

  if (!article || !time) {
    return res.status(400).json({ 
      status: 'Error',
      error: '잘못된 요청입니다.' 
    })
  }

  const sql = 'UPDATE diaries SET article = ?, time = ? WHERE date = ?'
  const params = [article, time, req.params.date]

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ 
        status: 'Error',
        message: err.message 
      })
    }

    if (this.changes === 0) {
      return res.status(404).json({ 
        status: 'Error',
        error: '요청한 일기를 찾을 수 없습니다.' 
      })
    }
    res.json({ 
      status: 'OK',
      data: { date: req.params.date, article, time } 
    })
  })
})

/**
 * @swagger
 * /api/diaries/:date:
 *   delete:
 *     summary: 특정일의 일기를 삭제합니다.
 */
app.delete('/api/diaries/:date', (req, res) => {
  const sql = 'DELETE FROM diaries WHERE date = ?'
  const params = [req.params.date]

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ 
        status: 'Error',
        error: err.message 
      })
    }
    if (this.changes === 0) {
      return res.status(404).json({ 
        status: 'Error',
        error: '요청한 일기를 찾을 수 없습니다.' 
      })
    }

    res.status(204).send({
      status: 'OK'
    })
  })
})

/**
 * @swagger
 * /api/search/diaries:
 *   get:
 *     summary: 요청한 월의 모든 일기를 반환합니다.
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           example: 2024-05
 *         required: true
 *         description: YYYY-MM 형식의 연월 문자열
 *     responses:
 *       200:
 *         description: 요청한 월의 모든 일기를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: 2024-05-01
 *                       article:
 *                         type: string
 *                         example: sample
 *                       time:
 *                         type: string
 *                         example: 12:00
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 잘못된 요청입니다.
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
 */
app.get('/api/search/diaries', (req, res) => {
  const { date } = req.query

  if (!date) {
    return res.status(400).json({ 
      status: 'Error',
      error: '잘못된 요청입니다.' 
    })
  }

  const sql = 'SELECT * FROM diaries WHERE date LIKE ?'
  const params = [`${date}-%`]

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ 
        status: 'Error',
        error: err.message 
      })
    }

    res.json({ 
      status: 'OK',
      data: rows 
    })
  })
})

app.listen(servicePort, () => {
  console.log(`ready to ${servicePort}`)
  console.log(`API 문서의 경로는 다음과 같습니다: http://localhost:${servicePort}/api-docs`);
})
