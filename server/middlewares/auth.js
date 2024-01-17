const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User")


//auth
exports.auth = async (req, res, next) => {
    try {

        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer", "");

        //if token missing return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing hai boss"
            });
        };

        //verify token

        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;//baaki jagah code me use kr skte ab isse  
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token invalid hai boss"
            })
        }
        next();

    }
    catch (error) {

        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the jwt token"
        });
    }
}

//is Student

exports.isStudent = async (req, res, next) => {

    try {

        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students only"
            });

        }
        next();

    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: "Selected role doesnt match"
        })
    }



}


//isInstructor

exports.isInstructor = async (req, res, next) => {

    try {

        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for instructors only"
            });

        }
        next();

    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: "Selected role doesnt match"
        })
    }



}


//isAdmin

exports.isAdmin = async (req, res, next) => {

    try {

        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admins only"
            });

        }
        next();

    }
    catch (error) {

        return res.status(500).json({
            success: false,
            message: "Selected role doesnt match"
        })
    }



}


