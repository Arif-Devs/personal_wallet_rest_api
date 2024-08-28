import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

// preset middleware

const middleware = [cors(), morgan('dev'), express.json(), express.urlencoded({ extended: false })]

export default middleware;