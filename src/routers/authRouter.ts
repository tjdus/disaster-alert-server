import type { MongoDB } from "../mongodb";
import { stringToObjectId } from "../mongodb";
import { Router } from "express";
import * as U from "../utils";

import { Server } from "http";
import mongoose from "mongoose";
import { jwtMiddleware } from "../middlewares/jwtMiddleware";
import { IUser, User } from "../schemas/user";
import {
  NoRequiredFieldErrorResponse,
  ServerErrorResponse,
  UsernameNotUniqueErrorResponse,
  UserNotFoundErrorResponse,
} from "../interfaces/response";

export const authRouter = (...args: any[]) => {
  const router = Router();

  return router
    .post("/signup", async (req, res) => {
      const requestData = req.body as Partial<IUser>;

      if (!requestData.name || !requestData.username || !requestData.password) {
        return res
          .status(400)
          .json(
            NoRequiredFieldErrorResponse(["이름", "사용자 이름", "비밀번호"])
          );
      }

      try {
        const exists = await User.findOne({ username: requestData.username });
        if (exists) {
          return res.status(400).json(UsernameNotUniqueErrorResponse);
        }

        const hashed = await U.hashPasswordP(requestData.password);

        const data = {
          ...requestData,
          password: hashed,
        };

        const { id } = await User.insertOne(data);
        const jwt = await U.jwtSignP({ userId: id });

        // res.cookie('token', jwt, {
        //   httpOnly: true,
        //   maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        // })

        return res.status(200).json({ data: "회원 가입 성공" });
      } catch (e) {
        res.status(500).json(ServerErrorResponse);
      }
    })
    .post("/login", async (req, res) => {
      const requestData = req.body as Partial<IUser>;

      if (!requestData.username || !requestData.password) {
        return res
          .status(400)
          .json(NoRequiredFieldErrorResponse(["사용자 이름", "비밀번호"]));
      }

      try {
        const user = await User.findOne({ username: requestData.username });
        if (!user) {
          return res.status(404).json(UserNotFoundErrorResponse);
        }
        if (!(await U.comparePasswordP(requestData.password, user.password))) {
          return res.status(404).json(UserNotFoundErrorResponse);
        }

        const id = user._id;
        const jwt = await U.jwtSignP({ userId: id });

        // res.cookie('token', jwt, {
        //   httpOnly: true,
        //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        //   sameSite: 'strict',
        //   path: '/'
        // })

        res.status(200).json({ data: "로그인 성공" });
      } catch (e) {
        if (e instanceof Error)
          res.json({ ok: false, errorMessage: e.message });
      }
    })
    .post("/logout", jwtMiddleware, async (req, res) => {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        path: "/", // 쿠키가 설정된 경로와 동일해야 삭제 가능
      });
      res.json({ data: "로그아웃 성공" });
    });
};
