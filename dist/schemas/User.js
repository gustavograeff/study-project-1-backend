"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: String,
    firstName: String,
    lastName: String,
}, {
    timestamps: true,
});
UserSchema.methods.fullName = function () {
    return this.firstName + ' ' + this.lastName;
};
exports.default = mongoose_1.model('User', UserSchema);
