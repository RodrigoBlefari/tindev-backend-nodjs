//{} esta maneira se chama desestrutucacao, pq ja importa direto poupoando mongoose.schema
const { Schema, model } = require("mongoose");

const DevSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  bio: String,
  avatar: {
    type: String,
    require: true
  }
},
{
    timestamps: true,
});
//timestamps cria datas de create e update automaticas
module.exports = model('Dev', DevSchema);