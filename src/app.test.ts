import {describe, expect, test} from '@jest/globals';
import request from 'supertest';
import { Request,Response } from 'express';
import app from './app';

describe ("POST /users",()=>{
    describe("give a username and password ",()=>{
        //should save the username and password to database
        // should return statusCodes.OK
        test("should return a json object with 200 status code",async()=>{
            const response = await request(app).post('/users').send({
                username: "username",
                password: "password"
            })
            expect(response.status).toBe(200);
        })
    })
})