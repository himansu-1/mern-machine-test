const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')

const verifyAdmin = require('../middlewere/verifyAdmin');
const { body, validationResult } = require("express-validator");
const Employee = require('../module/Employee')

router.post("/insert", verifyAdmin, [
    body('name', "Enter a Valid Name").notEmpty(),
    body('mobile', "Enter a valid Number").isLength({min: 10, max: 13}).isNumeric()
], async (req, res)=>{

    let success = false
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(401).json({success: success, result: error.array()})
    }

    try {
        const { name, email, mobile, designation, gender, course, img } = req.body

        const copy = await Employee.findOne({email: email})
        if (copy) {
            return res.status(401).json({success: success, result: "Email of Employee already Exists"})
        }

        const employe = new Employee({
            admin: req.id,
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            img
        })    
        const save = await employe.save()
        success = true
        return res.status(201).json({success: success, employee: save})
        
    } catch (error) {
        return res.status(400).json({error: error})
    }
})

router.get("/getall", verifyAdmin, async (req, res)=>{
    // let success = false

    try {
        // const token = jwt.verify(req.header("auth-token"),process.env.JWT_SIGN)
        const employee = await Employee.find({admin: req.id})
        return res.status(200).json({employee: employee})
    } catch (error) {
        return res.status(400).json({error: error})
    }
})

router.get("/getbyID/:id", verifyAdmin, async (req, res)=>{
    // let success = false

    try {
        // const token = jwt.verify(req.header("auth-token"),process.env.JWT_SIGN)
        const employee = await Employee.find({_id: req.params.id})
        return res.status(200).json({employee: employee[0]})
    } catch (error) {
        return res.status(400).json({error: error})
    }
})

router.delete("/delete/:id", verifyAdmin, async (req, res)=>{
    let success = false
    try {
        let employe = await Employee.findById(req.params.id)
        console.log(req.params.id)
        if (!employe) {
            return res.status(401).json({success: success, result: employe})
        }

        if (employe.admin != req.id) {
            return res.status(401).json({success: success, result: "Not Allowed"})
        }
        employe = await Employee.findByIdAndDelete(req.params.id)
        success = true
        return res.status(201).json({success: success, result: "Successfully Deleted"})
    } catch (error) {
        
    }
})

router.put("/update/:id", verifyAdmin, async (req, res)=>{
    let success = false
    try {
        let employe = await Employee.findById(req.params.id)
        if (!employe) {
            return res.status(401).json({success: success, result: employe})
        }

        const { name, email, mobile, designation, gender, course, img } = req.body
        const newEmp = {}
        if (name) { newEmp.name = name}        
        if (email) { newEmp.email = email}        
        if (mobile) { newEmp.mobile = mobile}        
        if (designation) { newEmp.designation = designation}        
        if (gender) { newEmp.gender = gender}        
        if (course) { newEmp.name = name}        
        if (img) { newEmp.img = img}   

        if (employe.admin.toString() !== req.id) {
            return res.status(401).json({success: success, result: "Not Allowed"})
        }

        employe = await Employee.findByIdAndUpdate(req.params.id, {$set: newEmp}, {new: true})
        success = true

        return res.status(201).json({success: success, result: "Successfully Updated"})
    } catch (error) {
        
    }
})

module.exports = router