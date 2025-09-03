import { Request, Response } from 'express'
import * as api from './webRouteController'
import pgClient from '../db/postgres/pgClient'

// GET '/:bin_id/show'
export const getRecords = async (req: Request, res: Response) => {
  req.cookies.session_id = 'test'
  await api.getRecords(req, res)
}

export const getBins = async (req: Request, res: Response) => {
  console.log("GET BINS TESTING")
  const query = 'SELECT * FROM bins WHERE session_id = $1'
  const values = ['test']
  const bins = await pgClient.query(query, values)
  res.json(bins.rows)
}

export const createBin = async (req: Request, res: Response) => {
  req.cookies.session_id = 'test'
  await api.createBin(req, res)
}

export const createRecord = async (req: Request, res: Response) => {
  req.cookies.session_id = 'test'
  await api.createRecord(req, res)
}

// GET '/hello_world'
export const helloWorld = async (req: Request, res: Response) => {
  console.log("COOKIES:", req.cookies)
  console.log("HEADERS:", req.headers)
  if (req?.cookies?.hello) {
    res.send('hello cookie value: ' + req.cookies.hello)
  } else {
    res.cookie('hello', 'World')
    res.send('No hello cookie in request')
  }
}

