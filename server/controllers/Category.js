const Category = require("../models/Category");
const User = require("../models/User");

//create a Category handler function

exports.createCategory = async (req, res) => {
    try {
        //fetch data
        const { name, description  } = req.body;

        //validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required",
            })
        }; 

        

        //create entry in db

        const CategoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(CategoryDetails);

        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};


//getAllCategorys hndlerfuncion

exports.showAllCategories = async (req, res) => {
    try {
        const allCategory = await Category.find({}, { name: true, description: true });//koi searching criteia nhi but make sure it contains name and description

        return res.json({
            success: true,
            message: "All Category returned successfully",
            allCategory
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}

//category pageDetails

exports.categoryPageDetails = async (req, res) => {
    try {

        //get category id
        const { categoryId } = req.body;
        //fetch all courses of the category
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();

        //validation 
        if (!selectedCategory) {

            return res.status(404).json({
                success: false,
                message: "Course not found ",
            });
        }

        //get course for different categories
        const differentCategories = await Category.find(
            {
                _id: { $ne: categoryId },
            }
        ).populate("courses").exec();
        //get topselling courses
        //ye Hw hai

        //return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories
            }
        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}