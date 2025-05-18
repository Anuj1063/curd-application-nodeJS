const UserModel = require("../models/user.model");
const UserDetailsModel = require("../models/user_details.model");

class StudentController {
  async create(req, res) {
    res.render("add");
  }

  async insert(req, res) {
    let isEmailExists = await UserModel.find({
      email: req.body.email,
      isDeleted: false,
    });

    if (isEmailExists.length > 0) {
      req.flash("error", "Email is already exists");
      return res.redirect("/");
    }

    let userObj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };

    let saveData = await UserModel.create(userObj);

    if (saveData) {
      let userDetailsObj = {
        userId: saveData._id,
        address: req.body.address,
        bloodGroup: req.body.bloodGroup,
      };

      let userDetailsSave = await UserDetailsModel.create(userDetailsObj);

      if (userDetailsSave) {
        req.flash("success", "Data save successfully!");
        return res.redirect("/list");
      }
    }
  }

  async list(req, res) {
    let allData = await UserDetailsModel.aggregate([
      {
        $match: { isDeleted: false },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind:"$userDetails"
      },
     {
        $project:{
            "firstName":"$userDetails.firstName",
            "lastName":"$userDetails.lastName",
            "email":"$userDetails.email",
            "address":"$address",
            "bloodGroup":"$bloodGroup"
        }
     }
    ]);

    res.render("list", {
      allData,
    });
  }

  async edit(req, res) {
    let userData = await UserModel.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    let userData2 = await UserDetailsModel.find({
      userId: req.params.id,
    });
    console.log(userData2);
    res.render("edit", {
      userData,
      userData2,
    });
  }

  async update(req, res) {
    let isEmailExists = await UserModel.find({
      email: req.body.email,
      isDeleted: false,
      _id: { $ne: req.body.id },
    });
    if (isEmailExists.length > 0) {
      req.flash("error", "Email is already exists");
      return res.redirect(`/edit/${req.body.id}`);
    }
    let updateData = await UserModel.updateOne(
      {
        _id: req.body.id,
      },
      req.body
    );

    if (updateData) {
      req.flash("success", "Data updated successfully!");
      return res.redirect(`/list`);
    }

    console.log("Data updated successfully!", updateData);
  }

  async softDelete(req, res) {
    let deleteData = await UserModel.updateOne(
      {
        _id: req.params.id,
      },
      {
        isDeleted: true,
      }
    );
    if (deleteData) {
      res.redirect("/list");
    }
    console.log("Data deleted successfully!", deleteData);
  }

  //Home Task-> Hard delete
}

module.exports = new StudentController();
