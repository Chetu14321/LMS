// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true,
        trim:true
    },
    description: {type:String,
        default:""
    },
    thunbmnail_image:{type:String,
        default:"https://depositphotos.com/vectors/no-image-available.html?qview=47208689"
    },
    trainer: {type:String,
        default:""
    },
    price:{type:Number,
        default:0
    },
    course_link:{type:String,
        default:""
    },
    faq:{type:Array,
        default:[]
    },
    isActive: {type:Boolean, default:true}

  
},{
    collection:"course",
    timestamps:true
});

module.exports = mongoose.model('Course', courseSchema);
