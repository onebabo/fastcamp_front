import express from 'express'
import morgan from 'morgan'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { createHash } from './utils.js'
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
 * /api/users/signup:
 *   post:
 *     summary: 사용자 회원가입을 처리합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: john123
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: 회원가입이 성공적으로 처리되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: john123
 *       400:
 *         description: 잘못된 요청입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: 잘못된 요청입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
app.post('/api/users/signup', (req, res) => {
  const { userId, password } = req.body

  if (!userId || !password) {
    return res.status(400).json({ 
      status: 'Error',
      message: '잘못된 요청입니다.' 
    })
  }

  const sql = 'INSERT INTO users (id, password) values (?, ?)'
  const params = [userId, createHash(password)]

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    res.status(201).json({ 
      status: 'OK', 
      data: { userId } 
    })
  })
})

/**
 * @swagger
 * /api/users/signin:
 *   post:
 *     summary: 사용자 로그인을 처리합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: john123
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: 로그인이 성공적으로 처리되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *       400:
 *         description: 잘못된 요청입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 message:
 *                   type: string
 *                   example: 잘못된 요청입니다.
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 */
app.post('/api/users/signin', (req, res) => {
  const { userId, password } = req.body

  if (!userId || !password) {
    return res.status(400).json({ 
      status: 'Error',
      message: '잘못된 요청입니다.' 
    })
  }

  const sql = 'SELECT count(*) as userCount FROM users WHERE id = ? and password = ?'
  const params = [userId, createHash(password)]

  db.get(sql, params, function(err, row) {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    
    if (row.userCount === 1) {
      res.status(200).json({ 
        status: 'OK',
        data: { userId }
      })
    } else {
      res.status(401).json({ 
        status: 'Error'
      })
    }
  })
})

app.get('/api/users', (req, res) => {
  const sql = 'select * from users'
  db.all(sql, [], function(err, rows) {
    res.json({
      data: rows
    })
  })
})

/**
 * @swagger
 * /api/diaries:
 *   post:
 *     summary: 새로운 일기를 작성합니다.
 */
app.post('/api/diaries', (req, res) => {
  const { userId, date, article, time, isPublic } = req.body

  console.log(req.body)
  if (!userId || !date || !article || !time) {
    return res.status(400).json({ 
      status: 'Error',
      message: '잘못된 요청입니다.' 
    })
  }

  const sql = 'INSERT INTO diaries (userId, date, article, time, isPublic) VALUES (?, ?, ?, ?, ?)'
  const params = [userId, date, article, time, isPublic ? 'Y' : 'N']

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    res.status(201).json({ 
      status: 'OK', 
      data: { userId, date, article, time, isPublic } 
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
 * /api/diaries/:userId/:date:
 *   get:
 *     summary: 특정일의 일기를 반환합니다.
 */
app.get('/api/diaries/:userId/:date', (req, res) => {
  const { userId, date } = req.params
  const sql = 'SELECT * FROM diaries WHERE userId = ? and date = ?'
  const params = [userId, date]

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

app.get('/api/diaries/:userId/exist/:date', (req, res) => {
  const { userId, date } = req.params
  const sql = 'SELECT * FROM diaries WHERE userId = ? and date = ?'
  const params = [userId, date]

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
  const { userId, article, time, isPublic } = req.body

  if (!userId || !article || !time) {
    return res.status(400).json({ 
      status: 'Error',
      error: '잘못된 요청입니다.' 
    })
  }

  const sql = 'UPDATE diaries SET article = ?, time = ?, isPublic = ? WHERE userId = ? and date = ?'
  const params = [article, time, isPublic ? 'Y' : 'N', userId, req.params.date]

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
      data: { date: req.params.date, article, time, isPublic } 
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
  const { user_id }= req.headers
  const sql = 'DELETE FROM diaries WHERE userId = ? and date = ?'
  const params = [user_id, req.params.date]

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

    res.status(200).send({
      status: 'OK'
    })
  })
})

/**
 * @swagger
 * /api/search/{userId}/diaries:
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
app.get('/api/search/:userId/diaries', (req, res) => {
  const { userId } = req.params
  const { date } = req.query

  if (!date) {
    return res.status(400).json({ 
      status: 'Error',
      error: '잘못된 요청입니다.' 
    })
  }

  const sql = `SELECT * FROM diaries 
    WHERE date LIKE ? and (userId = ? or (userId <> ? and isPublic = 'Y'))
    ORDER BY date
  `
  const params = [`${date}-%`, userId, userId]

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
