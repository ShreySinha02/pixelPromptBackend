import mongoose, { Schema } from "mongoose";
import { Employee } from "./employee.model"; // Assuming this is your Employee model

const attendanceSchema = new Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Reference to the Employee model
        required: true,
    },
    date: {
        type: Date,
        required: true,
        unique: true, // Ensures only one attendance record per day per employee
    },
    punchIn: {
        type: Date, // Store the actual punch-in time
    },
    punchOut: {
        type: Date, // Store the actual punch-out time
    },
    regularized: {
        type: Boolean,
        default: false, // Initially false, set to true when regularized
    },
    regularizedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Who regularized the attendance
    },
    regularizedAt: {
        type: Date, // Date when regularization was done
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Leave', 'Half-Day'], // Define status
        default: 'Absent', // Default status can be 'Absent'
    },
    workHours: {
        type: Number, // Store the worked hours, calculated from punch-in and punch-out times
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Pre-save hook to calculate work hours and determine status based on punch-in and punch-out times
attendanceSchema.pre('save', function (next) {
    if (this.punchIn && this.punchOut) {
        // Calculate work hours based on punch-in and punch-out times
        const punchInTime = new Date(this.punchIn);
        const punchOutTime = new Date(this.punchOut);
        const workDuration = (punchOutTime - punchInTime) / 1000 / 60 / 60; // Duration in hours
        this.workHours = workDuration;

        // Set status based on punch-in and punch-out times
        if (workDuration >= 8) {
            this.status = 'Present';
        } else if (workDuration > 0) {
            this.status = 'Half-Day';
        } else {
            this.status = 'Absent';
        }
    }
    next();
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export { Attendance };
